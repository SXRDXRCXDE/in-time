import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Globe } from "lucide-react";

const teamKeys = [
  { name: "member1Name", role: "member1Role", bio: "member1Bio", initial: "BR" },
  { name: "member2Name", role: "member2Role", bio: "member2Bio", initial: "IT" },
];

export default function AboutPage() {
  const { t } = useTranslation();
  const p = (key: string) => t(`pages.oNas.${key}`);

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <HeroBackgroundAnimation />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light mb-6">{p("h1")}</h1>
          <p className="text-xl text-muted-foreground mb-16">{p("intro")}</p>

          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6">{p("whyTitle")}</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{p("why1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{p("why2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/20 text-primary text-xs font-medium">✓</span>
                <span>{p("why3")}</span>
              </li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-8">{p("teamTitle")}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {teamKeys.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-border bg-card/30 p-6 md:p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary text-xl font-medium">
                      {member.initial}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{p(member.name)}</h3>
                      <p className="text-sm text-muted-foreground">{p(member.role)}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p(member.bio)}</p>
                </div>
              ))}
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
