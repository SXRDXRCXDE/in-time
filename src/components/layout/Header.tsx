import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import lightLogo from "@/assets/light_logo.png";

import { useTheme } from "@/components/theme-provider";

const navLinks = [
  { label: "nav.services", href: "/#services" },
  { label: "nav.cases", href: "/#cases" },
  { label: "nav.process", href: "/#process" },
  { label: "nav.reviews", href: "/#reviews" },
];

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLang, setIsLang] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "ru", label: "Ru" },
    { code: "cs", label: "Cz" },
    { code: "en", label: "En" },
    { code: "he", label: "He" },
  ];

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLang(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      if (pathname === '/') {
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass py-4" : "bg-transparent py-6"
          }`}
      >
        <div className="container-custom flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link
              to="/"
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-3"
            >
              <img src={theme === "light" ? lightLogo : logo} alt="In Time" className="h-10 w-auto" />
              <span className="text-xl font-bold tracking-tight text-foreground font-extended">
                In Time
              </span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              pathname === '/' && link.href.startsWith('/#') ? (
                <a
                  key={link.href}
                  href={link.href.replace('/', '')}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
                >
                  {t(link.label)}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
                >
                  {t(link.label)}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center px-1 w-10 h-6 rounded-full bg-foreground/10 cursor-pointer border border-border"
            >
              <div className={` ${theme === "dark" ? "translate-x-4" : "translate-x-0"} transition-all duration-300 flex items-center justify-center text-foreground`}>
                {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
              </div>
            </div>

            <div className="h-8 relative flex items-center text-foreground">
              <div
                onClick={() => setIsLang(!isLang)}
                className="cursor-pointer select-none flex items-center gap-2"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xl font-light">{currentLanguage.label}</span>
              </div>

              <AnimatePresence>
                {isLang && (
                  <motion.div
                    ref={langRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    className="absolute top-10 right-0 py-2 px-2 flex flex-col gap-1 items-start w-24 border border-border rounded-lg bg-popover shadow-xl z-[60]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setIsLang(false);
                        }}
                        className={`flex w-full items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent duration-300 text-left text-sm ${i18n.language === lang.code ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                          }`}
                      >
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button onClick={() => {
              if (pathname === '/') {
                window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' });
              } else {
                window.location.href = '/#contact';
              }
            }} variant="hero" size="lg" className="hidden md:inline-flex">
              {t('nav.contact')}
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-24"
          >
            <nav className="container-custom flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="text-2xl font-light text-muted-foreground hover:text-foreground transition-colors py-3 border-b border-border block"
                  >
                    {t(link.label)}
                  </Link>
                </motion.div>
              ))}
              <Button onClick={() => {
                setIsMobileMenuOpen(false);
                if (pathname === '/') {
                  window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' });
                } else {
                  window.location.href = '/#contact';
                }
              }} variant="hero" size="xl" className="mt-6">
                {t('nav.contact')}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};