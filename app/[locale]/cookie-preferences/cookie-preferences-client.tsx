"use client";

import { CookieSettings } from "@/shared/components/ui/cookie-settings";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useCookieConsentSafe } from "@/shared/lib/use-cookie-consent";
import { useEffect, useState } from "react";

interface CookiePreferencesClientProps {
  cookieSettings: any;
}

export function CookiePreferencesClient({ cookieSettings }: CookiePreferencesClientProps) {
  const context = useCookieConsentSafe();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const texts = cookieSettings || {};

  if (!isClient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{texts.loadingText || "Caricamento..."}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {texts.loadingDescriptionText || "Caricamento delle preferenze cookie..."}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!context) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{texts.preferencesTitle || "Preferenze Cookie"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {texts.notAvailableText || "Il sistema di gestione cookie non è disponibile al momento. Riprova tra qualche istante."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return <CookieSettings cookieSettings={cookieSettings} />;
}
