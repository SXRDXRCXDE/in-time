import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const CONSENT_STORAGE_KEY = "cookie_consent_choice";

const deniedConsent = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

const grantedConsent = {
  ad_storage: "granted",
  analytics_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
};

type ConsentChoice = "granted" | "denied";

const updateConsent = (choice: ConsentChoice) => {
  if (typeof window === "undefined" || !(window as any).gtag) {
    return;
  }

  (window as any).gtag("consent", "update", choice === "granted" ? grantedConsent : deniedConsent);
};

export const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (storedConsent === "granted" || storedConsent === "denied") {
        updateConsent(storedConsent);
        setIsVisible(false);
        return;
      }
    } catch (e) {
    }

    setIsVisible(true);
  }, []);

  const setConsentChoice = (choice: ConsentChoice) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch (e) {
    }

    updateConsent(choice);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100]">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card/95 backdrop-blur-md p-4 md:p-5 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Мы используем cookie для аналитики и рекламы, чтобы улучшать сайт и измерять эффективность кампаний.
            Нажмите «Принять», чтобы разрешить обработку cookie, или «Отклонить», чтобы оставить только технически
            необходимые данные.
          </p>

          <div className="flex gap-3 md:shrink-0">
            <Button type="button" variant="outline" onClick={() => setConsentChoice("denied")}>
              Отклонить
            </Button>
            <Button type="button" onClick={() => setConsentChoice("granted")}>
              Принять
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
