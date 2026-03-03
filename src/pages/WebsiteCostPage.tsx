import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Calculator } from "lucide-react";

const pkgKeys = [
  { name: "pkg1Name", price: "pkg1Price", desc: "pkg1Desc", features: ["feat1", "feat2", "feat3", "feat4"] },
  { name: "pkg2Name", price: "pkg2Price", desc: "pkg2Desc", features: ["feat5", "feat6", "feat7", "feat8"] },
  { name: "pkg3Name", price: "pkg3Price", desc: "pkg3Desc", features: ["feat9", "feat10", "feat11", "feat12"] },
];
const includedKeys = ["included1", "included2", "included3", "included4", "included5"];
const extraKeys = [
  { name: "extra1Name", from: "extra1From" },
  { name: "extra2Name", from: "extra2From" },
  { name: "extra3Name", from: "extra3From" },
  { name: "extra4Name", from: "extra4From" },
];

export default function WebsiteCostPage() {
  const { t } = useTranslation();
  const p = (key: string) => t(`pages.cenaWebu.${key}`);

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <HeroBackgroundAnimation />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-light mb-4">{p("h1")}</h1>
          <p className="text-xl text-muted-foreground mb-12">{p("intro")}</p>

          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6">{p("packagesTitle")}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-2xl overflow-hidden border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4 font-medium">{p("tablePackage")}</th>
                    <th className="text-left p-4 font-medium">{p("tablePrice")}</th>
                    <th className="text-left p-4 font-medium hidden sm:table-cell">{p("tableIncluded")}</th>
                  </tr>
                </thead>
                <tbody>
                  {pkgKeys.map((pkg) => (
                    <tr key={pkg.name} className="border-t border-border hover:bg-muted/20">
                      <td className="p-4">
                        <span className="font-medium">{p(pkg.name)}</span>
                        <p className="text-sm text-muted-foreground mt-1">{p(pkg.desc)}</p>
                      </td>
                      <td className="p-4 font-medium whitespace-nowrap">{p(pkg.price)}</td>
                      <td className="p-4 hidden sm:table-cell">
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {pkg.features.map((f) => (
                            <li key={f} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary shrink-0" />
                              {p(f)}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6">{p("includedTitle")}</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground">
              {includedKeys.map((key) => (
                <li key={key} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  {p(key)}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6">{p("extraTitle")}</h2>
            <div className="rounded-2xl border border-border overflow-hidden">
              {extraKeys.map((opt, i) => (
                <div
                  key={opt.name}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 ${i !== extraKeys.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="text-foreground">{p(opt.name)}</span>
                  <span className="text-muted-foreground text-sm sm:text-base">{p(opt.from)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-card/40 border border-border p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Calculator className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-medium">{p("calcTitle")}</h2>
                <p className="text-muted-foreground text-sm">{p("calcP")}</p>
              </div>
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/#calculator">
                {p("calcBtn")}
                <Calculator className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>

          <p className="text-muted-foreground text-sm mt-8 text-center">{p("keywords")}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
