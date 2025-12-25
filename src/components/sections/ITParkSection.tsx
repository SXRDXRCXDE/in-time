import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import itParkLogo from "@/assets/IT_park_logo.png";

export const ITParkSection = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

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

                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="relative cursor-pointer group rounded-2xl overflow-hidden border border-border shadow-2xl">
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-10" />
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <img
                                            src="/it-park-certificate.png"
                                            alt="IT Park Certificate Preview"
                                            className="w-full h-auto object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                                        />
                                    </motion.div>
                                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                        <p className="text-white text-sm font-medium text-center">{t('itpark.clickToEnlarge')}</p>
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
                                <img
                                    src="/it-park-certificate.png"
                                    alt="IT Park Certificate"
                                    className="w-full h-auto rounded-lg shadow-2xl"
                                />
                            </DialogContent>
                        </Dialog>

                        {/* Float badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 md:top-10 md:-right-10 bg-card border border-border p-4 rounded-2xl shadow-xl z-30"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <img src={itParkLogo} alt="IT Park Logo" className="w-8 h-auto" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{t('itpark.verified')}</p>
                                    <p className="text-sm font-bold">{t('itpark.residentYear')}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
