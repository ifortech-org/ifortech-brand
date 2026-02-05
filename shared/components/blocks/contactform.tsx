// contactform component file

"use client";

import { urlFor } from "@/shared/sanity/lib/image";
import { Image } from "sanity"; // Import the Image type from Sanity
import PortableTextRenderer from "@/shared/components/portable-text-renderer";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { toast } from "sonner";

import { ContactFormBlock, ContactFormSettingsQueryResult } from "@/shared/sanity/queries/query-types";
import { useRouter } from "next/navigation";

type ContactFormProps = ContactFormBlock & {
  settings: ContactFormSettingsQueryResult;
  lang?: string;
};

function ContactForm({
  title,
  description,
  button_text,
  side_image,
  settings,
  lang,
}: ContactFormProps) {
  const router = useRouter();
  let imageUrl = side_image && side_image.asset?._id ? urlFor(side_image).url() : "";
  let captchaRef = useRef<HCaptcha>(null);

  let [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);
  let [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
    business_name: "",
    request: "",
    description: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!hCaptchaToken) {
      toast("Verifica hCaptcha fallita, Per favore, completa l'hCaptcha.");
      return;
    }

    console.log('Submitting form with hCaptcha token:', {
      hasToken: !!hCaptchaToken,
      tokenLength: hCaptchaToken?.length,
      tokenPreview: hCaptchaToken ? `${hCaptchaToken.substring(0, 20)}...` : 'none'
    });

    try {
      // Determina la lingua: prop lang > router > "it"
      let locale = lang;
      if (!locale && typeof window !== "undefined") {
        // Next.js router: /[locale]/...
        const match = window.location.pathname.match(/^\/([a-zA-Z-]+)\//);
        locale = match ? match[1] : "it";
      }
      if (!locale) locale = "it";

      const response = await fetch("/api/contactform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          surname: formData.surname,
          business_name: formData.business_name,
          request: formData.request,
          description: formData.description,
          "h-captcha-response": hCaptchaToken,
          lang: locale,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Form submission error:', {
          status: response.status,
          statusText: response.statusText,
          data
        });
        
        // Se il problema è hCaptcha, resetta e forza una nuova verifica
        if (data.error && (data.error.includes('hCaptcha') || data.error.includes('captcha'))) {
          console.log('Captcha error detected, resetting captcha');
          captchaRef.current?.resetCaptcha();
          setHCaptchaToken(null);
        }
        
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      toast(
        "Richiesta di contatto registrata con successo, a breve verrà contattato da uno dei nostri operatori"
      );
      
      setFormData({
        email: "",
        name: "",
        surname: "",
        business_name: "",
        request: "",
        description: "",
      });
      captchaRef.current?.resetCaptcha();
      setHCaptchaToken(null);
      
    } catch (error: any) {
      console.error('Form submission failed:', error);
      toast(`Errore: ${error.message || 'Si è verificato un errore durante l\'invio della richiesta di contatto. Per favore, riprova più tardi.'}`);
    }
  }

  function handleCaptchaSubmission(token: string | null) {
    console.log('New hCaptcha token received:', {
      hasToken: !!token,
      tokenLength: token?.length,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'none'
    });

    // Validazione robusta del token hCAPTCHA
    if (token && typeof token === 'string' && token.length > 20) {
      setHCaptchaToken(token);
      console.log('hCaptcha token saved, ready for submission');
    } else {
      setHCaptchaToken(null);
      console.log('Invalid or missing hCaptcha token');
    }
  }

  return (
    <Dialog>
      <div className="grid lg:grid-cols-2 bg-muted">
        <div
          className="bg-no-repeat bg-cover hidden lg:block"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: "-15% 30%",
          }}></div>
        <div className="flex flex-col px-8 py-16 gap-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="lg:w-1/2">
            {description && <PortableTextRenderer value={description} />}
          </div>
          <DialogTrigger asChild className="lg:w-1/3">
            <Button>{button_text}</Button>
          </DialogTrigger>

          <DialogContent 
            className="sm:max-w-md"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => {
              // Permetti click su elementi hCaptcha esterni
              const target = e.target as Element;
              if (target.closest(".h-captcha") ||
                  target.closest('iframe[src*="hcaptcha"]') ||
                  target.closest('[data-hcaptcha]') ||
                  target.closest('[style*="z-index: 2000000000"]')) {
                e.preventDefault();
                return;
              }
            }}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              // Permetti interazioni con hCaptcha
              const target = e.target as Element;
              if (target.closest(".h-captcha") ||
                  target.closest('iframe[src*="hcaptcha"]') ||
                  target.closest('[style*="z-index: 2000000000"]')) {
                e.preventDefault();
                return;
              }
            }}
          >
            <DialogHeader>
              <DialogTitle>{settings.title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <div>
                <Label htmlFor="email">{settings.labelEmail}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="name">{settings.labelName}</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="surname">{settings.labelSurname}</Label>
                <Input
                  id="surname"
                  type="text"
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="business_name">{settings.labelBusinessName}</Label>
                <Input
                  id="business_name"
                  type="text"
                  value={formData.business_name}
                  onChange={(e) =>
                    setFormData({ ...formData, business_name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="request">{settings.labelRequest}</Label>
                <Input
                  id="request"
                  type="text"
                  value={formData.request}
                  onChange={(e) =>
                    setFormData({ ...formData, request: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">{settings.labelDescription}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div data-hcaptcha className="h-captcha">
                <HCaptcha
                  ref={captchaRef}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                  onVerify={handleCaptchaSubmission}
                  onExpire={() => setHCaptchaToken(null)}
                  onError={() => setHCaptchaToken(null)}
                />
                <p className="text-xs my-2">
                  {settings.privacyText}
                </p>
              </div>

              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={handleSubmit}>
                {settings.submitText}
              </Button>
            </div>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  {settings.closeText}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
}
export default ContactForm;
