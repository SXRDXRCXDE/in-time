import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";
import { useCases } from "@/hooks/useCases";

const CasesPage = () => {
    const { t } = useTranslation();
    const { cases, loading, error } = useCases();

    if (loading) {
        return (
            <div className="min-h-screen text-foreground">
                <Header />
                <HeroBackgroundAnimation />
                <main className="pt-32 pb-20">
                    <div className="container-custom">
                        <div className="flex items-center justify-center h-64">
                            <p className="text-muted-foreground">{t('common.loading')}</p>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen text-foreground">
                <Header />
                <HeroBackgroundAnimation />
                <main className="pt-32 pb-20">
                    <div className="container-custom">
                        <div className="flex items-center justify-center h-64">
                            <p className="text-red-500">Error loading cases: {error}</p>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen text-foreground">
            <Header />
            <HeroBackgroundAnimation />
            <main className="pt-32 pb-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-8 bg-foreground/30" />
                            <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                                {t('cases.tag')}
                            </p>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                            {t('cases.title')}
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            {t('footer.desc')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {cases.map((caseItem, index) => (
                            <motion.div
                                key={caseItem.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group flex flex-col gap-6"
                            >
                                <Link to={`/cases/${caseItem.slug}`} className="relative block overflow-hidden rounded-3xl aspect-square">
                                    <img
                                        src={caseItem.images && caseItem.images.length > 0 ? caseItem.images[0].url : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop'}
                                        alt={caseItem.images && caseItem.images.length > 0 ? caseItem.images[0].alt : caseItem.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                    <div className="absolute top-6 right-6 w-14 h-14 rounded-full bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                                        <ArrowUpRight className="w-6 h-6 text-foreground" />
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xs font-medium text-foreground bg-foreground/10 px-3 py-1 rounded-full border border-foreground/20">
                                                {caseItem.category}
                                            </span>
                                            <span className="text-xs text-muted-foreground bg-background/40 backdrop-blur-sm px-3 py-1 rounded-full border border-foreground/10">
                                                {caseItem.result}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-medium group-hover:text-foreground transition-colors duration-300">
                                            {caseItem.title}
                                        </h3>
                                    </div>
                                </Link>

                                <div className="flex justify-between items-start px-2">
                                    <p className="text-muted-foreground max-w-md line-clamp-2">
                                        {caseItem.description ? caseItem.description.split('. ')[0] + '...' : ''}
                                    </p>
                                    <Button asChild variant="ghost" className="group/btn hover:bg-transparent">
                                        <Link to={`/cases/${caseItem.slug}`} className="flex items-center gap-2">
                                            <span className="border-b border-transparent group-hover/btn:border-foreground transition-all">
                                                {t('cases.more')}
                                            </span>
                                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CasesPage;
