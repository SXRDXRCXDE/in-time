import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useTheme } from "@/components/theme-provider";

import itParkLogo from "@/assets/IT_park_logo.png";
import itParkLogoLight from "@/assets/IT_park_logo_light.png";

export const ITParkSection = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Determine which logo to use based on theme
    const isDark = theme === "dark" ||
        (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const logoSrc = isDark ? itParkLogo : itParkLogoLight;

    return (
        <section className="section-padding overflow-hidden" ref={ref}>
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-foreground/30" />
                            <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                                {t('itpark.tag')}
                            </p>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
                            {t('itpark.title')}
                        </h2>

                        <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl">
                            {t('itpark.desc')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-sm font-medium">{t('itpark.status')}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Award className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-sm font-medium">{t('itpark.quality')}</span>
                            </div>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="lg" className="rounded-full group">
                                    {t('itpark.button')}
                                    <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
                                <img
                                    src="/it-park-certificate.png"
                                    alt="IT Park Certificate"
                                    className="w-full h-auto rounded-lg shadow-2xl"
                                />
                            </DialogContent>
                        </Dialog>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent rounded-[2.5rem] blur-2xl -z-10" />

                        <div className="relative group rounded-3xl overflow-hidden border border-border shadow-2xl bg-card/40 backdrop-blur-md p-8 md:p-12 flex flex-col items-center text-center">
                            <motion.div
                                className={`w-32 h-32 ${isDark ? "bg-black" : "bg-white"}  md:w-40 md:h-40 rounded-2xl p-6 shadow-sm mb-8 flex items-center justify-center border border-border/50`}
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img src={logoSrc} alt="IT Park Logo" className="w-full h-auto" />
                            </motion.div>

                            <h3 className="text-2xl font-medium mb-4">{t('itpark.title')}</h3>
                            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
                                {t('itpark.websiteDesc')}
                            </p>

                            <div className="flex flex-col gap-4 w-full max-w-xs">
                                <Button asChild className="rounded-full h-12 text-base font-medium">
                                    <a href="https://outsource.gov.uz/en" target="_blank" rel="noopener noreferrer">
                                        {t('itpark.visitWebsite')}
                                        <ExternalLink className="ml-2 w-4 h-4" />
                                    </a>
                                </Button>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="rounded-full h-12 text-base font-medium">
                                            {t('itpark.button')}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
                                        <img
                                            src="/it-park-certificate.png"
                                            alt="IT Park Certificate"
                                            className="w-full h-auto rounded-lg shadow-2xl"
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        {/* Float badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 md:top-10 md:-right-10 bg-card/40 backdrop-blur-md border border-border p-4 rounded-2xl shadow-xl z-30 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{t('itpark.verified')}</p>
                                <p className="text-sm font-bold">{t('itpark.residentYear')}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
