import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { marked } from "marked";

// Escape base per HTML (evita injection nelle variabili utente)
function escapeHtml(str: string) {
  return str.replace(/[&<>'"/]/g, function (s) {
    const entity: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
      '/': '&#x2F;',
    };
    return entity[s] || s;
  });
}

// Funzione di compilazione template: sostituisce {{var}} con i valori in data (senza escape, il markdown è sicuro)
function compileTemplate(template: string, data: Record<string, string>) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => data[key] ?? "");
}

// Recupera il template email da Sanity, gestendo language come reference
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../../../shared/sanity/env";

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

// Funzione per verificare hCaptcha
async function verifyHCaptcha(token: string): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  
  if (!secret) {
    console.error('HCAPTCHA_SECRET_KEY not configured');
    return false;
  }

  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `response=${token}&secret=${secret}`,
    });

    const data = await response.json();
    
    console.log('hCaptcha verification result:', {
      success: data.success,
      challenge_ts: data.challenge_ts,
      hostname: data.hostname,
      error_codes: data['error-codes']
    });

    return data.success === true;
  } catch (error) {
    console.error('hCaptcha verification error:', error);
    return false;
  }
}

async function getEmailTemplate(lang: string) {
  // Query GROQ: cerca il template con la lingua richiesta
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
  // Fallback su italiano
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
  // Fallback statico se non trova nulla
  return {
    subject: "Riepilogo richiesta di contatto - iFortech",
    body: `<div><h1>iFortech</h1><div><p>Gentile {{name}} {{surname}}, <br>Grazie per averci contattato. Di seguito il riepilogo della tua richiesta: <br><br><strong>Oggetto:</strong> {{subject}} <br><strong>Messaggio:</strong> {{description}} <br><br>Ti contatteremo al più presto. <br><br>Cordiali saluti, <br><br>Il Team di iFortech</p></div></div>`,
    description: "Variabili disponibili: {{name}}, {{surname}}, {{subject}}, {{description}}. Usare le doppie parentesi graffe per inserire i dati dinamici.",
  };
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

    // Verifica campi obbligatori
    if (!email || !name || !surname || !business_name || !subject || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verifica hCaptcha token
    if (!hCaptchaToken) {
      console.error('hCaptcha token missing');
      return NextResponse.json(
        { success: false, error: "hCaptcha verification required" },
        { status: 400 }
      );
    }

    const isValidCaptcha = await verifyHCaptcha(hCaptchaToken);
    
    if (!isValidCaptcha) {
      console.error('hCaptcha verification failed');
      return NextResponse.json(
        { success: false, error: "hCaptcha verification failed. Please try again." },
        { status: 400 }
      );
    }

    console.log('hCaptcha verification successful, processing form submission');

    if (!mailSenderAccount.user || !mailSenderAccount.pass || !mailSenderAccount.email) {
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

    const mailData = {
      from: mailSenderAccount.email,
      to: mailSenderAccount.email,
      subject: `IFORTECH - Richiesta di contatto`,
      html: `
        <div>
          <h1>Nuova richiesta di contatto</h1>
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


    // Recupera il template localizzato dal DB (o fallback IT)
    const template = await getEmailTemplate(lang);
    // Compila il template con i dati
    const subjectUser = compileTemplate(template.subject, { name, surname, subject, description });
    const bodyUserMarkdown = compileTemplate(template.body, { name, surname, subject, description });
    // Converte il markdown in HTML sicuro (await per garantire stringa)
    const bodyUser = await marked.parse(bodyUserMarkdown);

    const mailDataUser = {
      from: mailSenderAccount.email,
      to: email,
      subject: subjectUser,
      html: bodyUser,
    };
    await transporter.sendMail(mailDataUser);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in contact form API:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace"
    });
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
