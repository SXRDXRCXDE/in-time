import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, HeadphonesIcon } from "lucide-react";

const stackKeys = ["stack1", "stack2", "stack3", "stack4"];
const integrateTags = ["REST API", "Webhooky", "OAuth / JWT", "Platební brány", "E-mail / notifikace", "Export do Excel/CSV"];

export default function WebAppDevelopmentPage() {
  const { t } = useTranslation();
  const p = (key: string) => t(`pages.vyvojAplikaci.${key}`);

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <HeroBackgroundAnimation />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light mb-6">{p("h1")}</h1>
          <p className="text-xl text-muted-foreground mb-12">{p("intro")}</p>

          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6">{p("stackTitle")}</h2>
            <p className="text-muted-foreground mb-6">{p("stackP")}</p>
            <ul className="space-y-2 text-muted-foreground">
              {stackKeys.map((key) => (
                <li key={key}>• {p(key)}</li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6">{p("integrateTitle")}</h2>
            <p className="text-muted-foreground mb-6">{p("integrateP")}</p>
            <div className="flex flex-wrap gap-3">
              {integrateTags.map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-xl bg-muted/50 text-sm border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6">{p("securityTitle")}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-border bg-card/30">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-medium mb-2">{p("securityBlockTitle")}</h3>
                <p className="text-muted-foreground text-sm">{p("securityBlockP")}</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card/30">
                <HeadphonesIcon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-medium mb-2">{p("supportBlockTitle")}</h3>
                <p className="text-muted-foreground text-sm">{p("supportBlockP")}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-card/40 border border-border p-8 md:p-12 text-center">
            <h2 className="text-2xl font-medium mb-4">{p("ctaTitle")}</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{p("ctaP")}</p>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">{p("ctaBtn")}</Link>
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
