import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { marked } from "marked";
import { createClient } from "@sanity/client";
import { legacySiteSettingsFallback } from "@/shared/fallbacks/site-config";
import { apiVersion, dataset, projectId } from "../../../shared/sanity/env";

function escapeHtml(str: string) {
  return str.replace(/[&<>'"/]/g, function (s) {
    const entity: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
      "/": "&#x2F;",
    };
    return entity[s] || s;
  });
}

function compileTemplate(template: string, data: Record<string, string>) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => data[key] ?? "");
}

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function verifyHCaptcha(token: string): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET_KEY;

  if (!secret) {
    console.error("HCAPTCHA_SECRET_KEY not configured");
    return false;
  }

  try {
    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `response=${token}&secret=${secret}`,
    });

    const data = await response.json();

    console.log("hCaptcha verification result:", {
      success: data.success,
      challenge_ts: data.challenge_ts,
      hostname: data.hostname,
      error_codes: data["error-codes"],
    });

    return data.success === true;
  } catch (error) {
    console.error("hCaptcha verification error:", error);
    return false;
  }
}

async function getEmailTemplate(lang: string) {
  const query = `*[_type == "emailTemplate" && language->code == $lang][0]{
    subject_template,
    body_template,
    description
  }`;
  const template = await sanityClient.fetch(query, { lang });
  if (template) {
    return {
      subject: template.subject_template,
      body: template.body_template,
      description: template.description,
    };
  }

  const fallbackQuery = `*[_type == "emailTemplate" && language->code == "it"][0]{
    subject_template,
    body_template,
    description
  }`;
  const fallback = await sanityClient.fetch(fallbackQuery);
  if (fallback) {
    return {
      subject: fallback.subject_template,
      body: fallback.body_template,
      description: fallback.description,
    };
  }

  return {
    subject: `Riepilogo richiesta di contatto - ${legacySiteSettingsFallback.email.brandName}`,
    body: `# {{brandName}}

Gentile {{name}} {{surname}},

Grazie per averci contattato. Di seguito il riepilogo della tua richiesta:

- **Oggetto:** {{subject}}
- **Messaggio:** {{description}}

Ti contatteremo al più presto.

Cordiali saluti,

{{teamName}}`,
    description:
      "Variabili disponibili: {{name}}, {{surname}}, {{subject}}, {{description}}, {{brandName}}, {{teamName}}.",
  };
}

async function getSiteMailBranding() {
  const siteSettingsQuery = `*[_type == "siteSettings"][0]{
    siteName,
    legalCompanyName,
    email{
      brandName,
      adminSubjectPrefix,
      adminTitle,
      teamName,
      replyTo,
      logoMode,
      customLogo{
        asset->{
          url
        }
      }
    }
  }`;

  const siteLogoQuery = `*[_type == "siteLogo"][0]{
    alt,
    logo{
      asset->{
        url
      }
    }
  }`;

  const [siteSettings, siteLogo] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery),
    sanityClient.fetch(siteLogoQuery),
  ]);

  const email = {
    ...legacySiteSettingsFallback.email,
    ...(siteSettings?.email ?? {}),
  };

  let logoUrl = "";
  if (email.logoMode === "custom") {
    logoUrl = siteSettings?.email?.customLogo?.asset?.url ?? "";
  } else if (email.logoMode === "siteLogo") {
    logoUrl = siteLogo?.logo?.asset?.url ?? "";
  }

  return {
    siteName: siteSettings?.siteName || legacySiteSettingsFallback.siteName,
    legalCompanyName:
      siteSettings?.legalCompanyName ||
      legacySiteSettingsFallback.legalCompanyName,
    email,
    logoUrl,
    logoAlt:
      siteLogo?.alt ||
      siteSettings?.siteName ||
      legacySiteSettingsFallback.siteName,
  };
}

function buildEmailBrandBlock(logoUrl: string, logoAlt: string, brandName: string) {
  if (logoUrl) {
    return `<div style="margin-bottom:24px;"><img src="${logoUrl}" alt="${escapeHtml(
      logoAlt
    )}" style="max-width:180px;max-height:72px;width:auto;height:auto;" /></div>`;
  }

  return `<h1>${escapeHtml(brandName)}</h1>`;
}

const mailSenderAccount = {
  user: process.env.MAIL_SENDER_ACCOUNT_USERNAME ?? null,
  pass: process.env.MAIL_SENDER_ACCOUNT_PASSWORD ?? null,
  email: process.env.MAIL_SENDER_ACCOUNT_EMAIL ?? null,
};

export async function POST(request: Request) {
  try {
    const {
      email,
      name,
      surname,
      business_name,
      request: subject,
      description,
      lang = "it",
      "h-captcha-response": hCaptchaToken,
    } = await request.json();

    if (
      !email ||
      !name ||
      !surname ||
      !business_name ||
      !subject ||
      !description
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!hCaptchaToken) {
      console.error("hCaptcha token missing");
      return NextResponse.json(
        { success: false, error: "hCaptcha verification required" },
        { status: 400 }
      );
    }

    const isValidCaptcha = await verifyHCaptcha(hCaptchaToken);

    if (!isValidCaptcha) {
      console.error("hCaptcha verification failed");
      return NextResponse.json(
        {
          success: false,
          error: "hCaptcha verification failed. Please try again.",
        },
        { status: 400 }
      );
    }

    if (
      !mailSenderAccount.user ||
      !mailSenderAccount.pass ||
      !mailSenderAccount.email
    ) {
      console.error("Email configuration missing:", {
        hasUser: !!mailSenderAccount.user,
        hasPass: !!mailSenderAccount.pass,
        hasEmail: !!mailSenderAccount.email,
      });
      return NextResponse.json(
        { success: false, error: "Email configuration missing" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: mailSenderAccount.user,
        pass: mailSenderAccount.pass,
      },
    });

    const branding = await getSiteMailBranding();
    const replyTo = branding.email.replyTo || mailSenderAccount.email;
    const brandName = branding.email.brandName || branding.siteName;
    const brandBlock = buildEmailBrandBlock(
      branding.logoUrl,
      branding.logoAlt,
      brandName
    );

    const mailData = {
      from: mailSenderAccount.email,
      to: mailSenderAccount.email,
      replyTo,
      subject: `${branding.email.adminSubjectPrefix} - Richiesta di contatto`,
      html: `
        <div>
          ${brandBlock}
          <h1>${escapeHtml(branding.email.adminTitle)}</h1>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>Cognome:</strong> ${escapeHtml(surname)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Azienda:</strong> ${escapeHtml(business_name)}</p>
          <p><strong>Oggetto della richiesta:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Descrizione:</strong></p>
          <p>${escapeHtml(description)}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailData);

    const template = await getEmailTemplate(lang);
    const templateData = {
      name,
      surname,
      subject,
      description,
      brandName,
      teamName: branding.email.teamName,
    };
    const subjectUser = compileTemplate(template.subject, templateData);
    const bodyUserMarkdown = compileTemplate(template.body, templateData);
    const bodyUser = await marked.parse(bodyUserMarkdown);

    const mailDataUser = {
      from: `"${branding.email.brandName}" <${mailSenderAccount.email}>`,
      to: email,
      replyTo,
      subject: subjectUser,
      html: `${brandBlock}${bodyUser}`,
    };
    await transporter.sendMail(mailDataUser);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in contact form API:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
    });
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
