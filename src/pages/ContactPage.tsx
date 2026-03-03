import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";
import { Button } from "@/components/ui/button";
import { Send, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const CONTACT_PHONE = "+420 123 456 789";

const contactPointSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  telephone: CONTACT_PHONE,
  contactType: "customer service",
  availableLanguage: ["Czech", "English", "Russian"],
  areaServed: "CZ",
};

export default function ContactPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectUrl: "",
    budget: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/cta/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "contact",
          language: document.documentElement.lang,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit");
      toast({
        title: t("pages.kontakt.toastSuccess"),
        description: t("pages.kontakt.toastSuccessDesc"),
      });
      setFormData({ name: "", email: "", phone: "", projectUrl: "", budget: "", description: "" });
    } catch {
      toast({
        title: t("pages.kontakt.toastError"),
        description: t("pages.kontakt.toastErrorDesc"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointSchema) }}
      />
      <Header />
      <HeroBackgroundAnimation />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-light mb-2">{t("pages.kontakt.title")}</h1>
          <p className="text-muted-foreground mb-10">
            {t("pages.kontakt.intro")}
          </p>

          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="flex items-center gap-3 text-foreground hover:text-primary transition-colors mb-10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Phone className="h-6 w-6 text-primary" />
            </span>
            <span className="text-xl font-medium">{CONTACT_PHONE}</span>
          </a>

          <form
            onSubmit={handleSubmit}
            className="bg-card/40 backdrop-blur-md rounded-[2rem] p-8 md:p-10 border border-border space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                {t("pages.kontakt.labelName")}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={t("pages.kontakt.placeholderName")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                {t("pages.kontakt.labelEmail")}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={t("pages.kontakt.placeholderEmail")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                {t("pages.kontakt.labelPhone")}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={t("pages.kontakt.placeholderPhone")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                {t("pages.kontakt.labelProjectUrl")}
              </label>
              <input
                type="url"
                value={formData.projectUrl}
                onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="https://…"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                {t("pages.kontakt.labelBudget")}
              </label>
              <input
                type="text"
                required
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={t("pages.kontakt.placeholderBudget")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                {t("pages.kontakt.labelDescription")}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder={t("pages.kontakt.placeholderDescription")}
              />
            </div>
            <Button type="submit" variant="hero" size="xl" className="w-full rounded-xl">
              {t("pages.kontakt.submit")}
              <Send className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
