import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Globe, Layout, ShoppingCart, FileText } from "lucide-react";

const processKeys = ["process1", "process2", "process3", "process4", "process5", "process6"] as const;
const typeKeys = [
  { key: "type1Title" as const, desc: "type1Desc" as const, icon: Globe },
  { key: "type2Title" as const, desc: "type2Desc" as const, icon: Layout },
  { key: "type3Title" as const, desc: "type3Desc" as const, icon: FileText },
  { key: "type4Title" as const, desc: "type4Desc" as const, icon: ShoppingCart },
];
const faqItems = [
  { q: "faq1q" as const, a: "faq1a" as const },
  { q: "faq2q" as const, a: "faq2a" as const },
  { q: "faq3q" as const, a: "faq3a" as const },
  { q: "faq4q" as const, a: "faq4a" as const },
];

export default function WebDevelopmentPage() {
  const { t } = useTranslation();
  const p = (key: string) => t(`pages.tvorbaWebovychStranek.${key}`);

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <HeroBackgroundAnimation />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">{p("h1")}</h1>
          <p className="text-xl text-muted-foreground mb-16">{p("intro")}</p>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-medium mb-6">{p("whyTitle")}</h2>
            <p className="text-muted-foreground mb-6">{p("whyP1")}</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{p("why1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{p("why2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{p("why3")}</span>
              </li>
            </ul>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-medium mb-6">{p("processTitle")}</h2>
            <p className="text-muted-foreground mb-8">{p("processP")}</p>
            <ol className="space-y-6 list-none">
              {processKeys.map((key, i) => (
                <li key={key} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{p(key)}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-medium mb-6">{p("typesTitle")}</h2>
            <p className="text-muted-foreground mb-8">{p("typesP")}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {typeKeys.map(({ key, desc, icon: Icon }) => (
                <div key={key} className="p-6 rounded-2xl border border-border bg-card/30">
                  <Icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-lg font-medium mb-2">{p(key)}</h3>
                  <p className="text-muted-foreground text-sm">{p(desc)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-medium mb-6">{p("pricesTitle")}</h2>
            <p className="text-muted-foreground mb-6">{p("pricesP")}</p>
            <Button asChild variant="hero" size="lg">
              <Link to="/website-cost">
                {p("pricesCta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-medium mb-6">{p("casesTitle")}</h2>
            <p className="text-muted-foreground mb-6">{p("casesP")}</p>
            <Button asChild variant="outline" size="lg">
              <Link to="/cases">{p("casesCta")}</Link>
            </Button>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-medium mb-6">{p("faqTitle")}</h2>
            <dl className="space-y-6">
              {faqItems.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-medium mb-2">{p(q)}</dt>
                  <dd className="text-muted-foreground pl-0">{p(a)}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-[2rem] bg-card/40 border border-border p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">{p("ctaTitle")}</h2>
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
