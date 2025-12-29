import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";

import { getFirstProjectImage } from "@/imagesData/imagesData";

const CasesPage = () => {
    const { t } = useTranslation();
    const cases = t('cases.items', { returnObjects: true }) as Array<{ id: string, title: string, cat: string, res: string }>;

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
                                <Link to={`/cases/${caseItem.id}`} className="relative block overflow-hidden rounded-3xl aspect-[16/10]">
                                    <img
                                        src={getFirstProjectImage(caseItem.id)}
                                        alt={caseItem.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                    <div className="absolute top-6 right-6 w-14 h-14 rounded-full bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                                        <ArrowUpRight className="w-6 h-6 text-foreground" />
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xs font-medium text-foreground bg-foreground/10 px-3 py-1 rounded-full border border-foreground/20">
                                                {caseItem.cat}
                                            </span>
                                            <span className="text-xs text-muted-foreground bg-background/40 backdrop-blur-sm px-3 py-1 rounded-full border border-foreground/10">
                                                {caseItem.res}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-medium group-hover:text-foreground transition-colors duration-300">
                                            {caseItem.title}
                                        </h3>
                                    </div>
                                </Link>

                                <div className="flex justify-between items-start px-2">
                                    <p className="text-muted-foreground max-w-md">
                                        {t('services.items', { returnObjects: true })[index % 3].desc}
                                    </p>
                                    <Button asChild variant="ghost" className="group/btn hover:bg-transparent">
                                        <Link to={`/cases/${caseItem.id}`} className="flex items-center gap-2">
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
