import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, Layout, Zap, Shield, Target, X } from "lucide-react";
import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";
import { useState } from "react";

const CaseDetailsPage = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const cases = t('cases.items', { returnObjects: true }) as any[];

    const caseItem = cases.find(c => c.id === id);

    /* State for Image Preview */
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!caseItem) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">{t('caseDetails.notFound')}</h1>
                    <Button asChild variant="outline">
                        <Link to="/cases">{t('caseDetails.backToCases')}</Link>
                    </Button>
                </div>
            </div>
        );
    }

    // Helper to generate image paths based on ID and common structure
    const getImages = (projectId: string) => {
        const counts: Record<string, number> = {
            'e-agent': 3,
            'fabrico': 4,
            'kurochki_telegram_bot': 4,
            'prihlaseni': 4
        };
        const count = counts[projectId] || 0;
        return Array.from({ length: count }, (_, i) => `/src/assets/${projectId}/${i + 1}.jpg`);
    };

    const images = getImages(caseItem.id);
    const heroImage = images[0] || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop";

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-foreground/10">
            <Header />
            <HeroBackgroundAnimation />

            {/* Image Preview Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-7xl max-h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Preview"
                                className="w-full h-auto max-h-[90vh] rounded-2xl shadow-2xl object-contain border border-foreground/10"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute -top-4 -right-4 rounded-full bg-background/50 backdrop-blur-md border-foreground/20 hover:bg-background"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative pt-32 pb-24">
                <div className="container-custom">
                    {/* Breadcrumbs / Back button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <Button asChild variant="ghost" className="group p-0 hover:bg-transparent text-muted-foreground hover:text-foreground mb-8">
                            <Link to="/cases" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                {t('common.back')}
                            </Link>
                        </Button>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full bg-foreground/5 border border-foreground/10">
                                        {caseItem.cat}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-foreground/30" />
                                    <span className="text-muted-foreground text-sm">{caseItem.res}</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8">
                                    {caseItem.title}
                                </h1>
                            </div>

                            <div className="hidden lg:block pb-4">
                                <Button size="lg" className="rounded-full px-8 py-6 h-auto text-lg group" onClick={() => {
                                    document.getElementById('challenges')?.scrollIntoView({ behavior: 'smooth' });
                                }}>
                                    {t('caseDetails.analysis')}
                                    <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Banner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative rounded-[2.5rem] overflow-hidden aspect-[21/9] mb-32 border border-foreground/10 group shadow-2xl cursor-zoom-in"
                        onClick={() => setSelectedImage(heroImage)}
                    >
                        <img
                            src={heroImage}
                            alt={caseItem.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                    </motion.div>

                    {/* Intro Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
                        <div className="lg:col-span-8">
                            <h2 className="text-3xl font-medium mb-10">{t('caseDetails.concept')}</h2>
                            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed font-light">
                                {caseItem.fullDescription?.split('\n\n').map((para: string, i: number) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-4 lg:pl-12">
                            <div className="p-8 rounded-3xl bg-foreground/5 border border-foreground/10 sticky top-32">
                                <h3 className="text-lg font-medium mb-8">{t('caseDetails.specs')}</h3>
                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">{t('caseDetails.category')}</p>
                                            <p className="font-medium">{caseItem.cat}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">{t('caseDetails.result')}</p>
                                            <p className="font-medium">{caseItem.res}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">{t('caseDetails.security')}</p>
                                            <p className="font-medium">Enterprise Grade</p>
                                        </div>
                                    </li>
                                </ul>

                                <hr className="my-8 border-foreground/10" />

                                <h3 className="text-sm font-medium mb-4 uppercase tracking-wider text-muted-foreground">{t('caseDetails.tools')}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'Node.js', 'PostgreSQL', '1C Integration', 'Telegram API'].map(tech => (
                                        <span key={tech} className="px-3 py-1 rounded-lg bg-background border border-foreground/10 text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Problem - Solution Section */}
                    <section id="challenges" className="mb-40">
                        <div className="mb-20 text-center max-w-2xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-light mb-6">{t('caseDetails.challengesTitle')}</h2>
                            <p className="text-muted-foreground">
                                {t('caseDetails.challengesDesc')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {caseItem.challenges?.map((item: any, index: number) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="group p-8 rounded-[2rem] bg-foreground/5 border border-foreground/10 hover:border-foreground/20 transition-all duration-500"
                                >
                                    <div className="flex flex-col gap-6">
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 block">{t('caseDetails.problem')} {index + 1}</span>
                                            <p className="text-lg font-medium text-foreground/80 leading-relaxed italic">
                                                «{item.p}»
                                            </p>
                                        </div>
                                        <div className="h-px w-full bg-foreground/10 relative">
                                            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-8 rounded-full bg-foreground flex items-center justify-center text-background text-xs font-bold shadow-lg">
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">{t('caseDetails.solution')}</span>
                                            <p className="text-lg text-foreground leading-relaxed">
                                                {item.s}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Screenshot Gallery */}
                    <section className="mb-40">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-medium">{t('caseDetails.interface')}</h2>
                            <p className="text-muted-foreground hidden md:block">{t('caseDetails.interfaceDesc')}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
                            {images.map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative rounded-3xl overflow-hidden border border-foreground/10 group cursor-zoom-in ${i === 0 ? "md:col-span-2 lg:col-span-2 row-span-1" :
                                        i === 1 ? "md:row-span-1" :
                                            "md:col-span-1"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Screen ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-12 md:p-20 rounded-[3rem] bg-foreground text-background text-center relative overflow-hidden"
                    >
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-light mb-8 italic">{t('caseDetails.ctaTitle')}</h2>
                            <p className="text-background/70 text-lg mb-12 leading-relaxed">
                                {t('caseDetails.ctaDesc')}
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <Button asChild size="xl" variant="hero" className="bg-background text-foreground hover:bg-background/90 text-lg px-10">
                                    <Link to="/#contact">{t('caseDetails.ctaPrimary')}</Link>
                                </Button>
                                <Button asChild size="xl" variant="outline" className="text-background border-background/30 hover:bg-background/10 text-lg px-10">
                                    <Link to="/cases">{t('caseDetails.ctaSecondary')}</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Visual elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-background/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-background/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CaseDetailsPage;
