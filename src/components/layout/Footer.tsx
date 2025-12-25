import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";
import lightLogo from "@/assets/light_logo.png";
import { useTheme } from "@/components/theme-provider";

export const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const servicesLinks = [
    { label: t('footer.services'), href: "#services" },
    { label: t('nav.services'), href: "#services" },
    { label: t('nav.cases'), href: "#cases" },
    { label: t('nav.process'), href: "#process" },
  ];

  const companyLinks = [
    { label: t('nav.about'), href: "#about" },
    { label: t('nav.cases'), href: "#cases" },
    { label: t('nav.process'), href: "#process" },
    { label: t('nav.contact'), href: "#contact" },
  ];

  const socialLinks = [
    { label: "Telegram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Behance", href: "#" },
    { label: "GitHub", href: "#" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-4">
              <img src={theme === "light" ? lightLogo : logo} alt="In Time" className="h-10 w-auto" />
              <span className="text-xl font-bold tracking-tight text-foreground font-extended">
                In Time
              </span>
            </a>
            <p className="text-muted-foreground leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
              {t('footer.services')}
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
              {t('footer.social')}
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-foreground/70 hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            {t('footer.copy')}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};