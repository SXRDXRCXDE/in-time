import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, BarChart3, Workflow, Shield } from "lucide-react";

const cards = [
  { icon: Users, title: "card1Title", desc: "card1Desc" },
  { icon: BarChart3, title: "card2Title", desc: "card2Desc" },
  { icon: Workflow, title: "card3Title", desc: "card3Desc" },
  { icon: Shield, title: "card4Title", desc: "card4Desc" },
];

export default function CrmPage() {
  const { t } = useTranslation();
  const p = (key: string) => t(`pages.crm.${key}`);

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <HeroBackgroundAnimation />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light mb-6">{p("h1")}</h1>
          <p className="text-xl text-muted-foreground mb-12">{p("intro")}</p>

          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6">{p("whyTitle")}</h2>
            <p className="text-muted-foreground mb-6">{p("whyP")}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {cards.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-5 rounded-2xl border border-border bg-card/30">
                  <Icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-medium mb-2">{p(title)}</h3>
                  <p className="text-muted-foreground text-sm">{p(desc)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6">{p("offerTitle")}</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>• {p("offer1")}</li>
              <li>• {p("offer2")}</li>
              <li>• {p("offer3")}</li>
              <li>• {p("offer4")}</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6">{p("caseTitle")}</h2>
            <div className="rounded-2xl border border-border bg-card/30 p-6 md:p-8">
              <p className="text-muted-foreground mb-4">{p("caseP1")}</p>
              <p className="text-sm text-muted-foreground">{p("caseP2")}</p>
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
