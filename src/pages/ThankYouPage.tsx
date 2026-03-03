import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CheckCircle2, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";

const ThankYouPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Отправляем событие в Google Analytics о просмотре страницы благодарности
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'page_view', {
                page_title: 'Thank You Page',
                page_location: window.location.href,
                page_path: '/thank-you'
            });
            
            // Также отправляем кастомное событие конверсии
            (window as any).gtag('event', 'conversion', {
                send_to: 'AW-17856054839/yUoGCIjyw4AcELeMt8JC',
                value: 1.0,
                currency: 'CZK'
            });
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow flex items-center justify-center section-padding relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
                    <div className="w-full h-full rounded-full glow-orb animate-pulse-glow" />
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="bg-card/40 backdrop-blur-md rounded-[2.5rem] p-12 md:p-16 lg:p-20 border border-border"
                        >
                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
                            >
                                <CheckCircle2 className="w-12 h-12 text-primary" />
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6"
                            >
                                {t('thankYou.title')}
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed"
                            >
                                {t('thankYou.description')}
                            </motion.p>

                            {/* Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <Button
                                    variant="hero"
                                    size="xl"
                                    onClick={() => navigate('/')}
                                    className="w-full sm:w-auto gap-2"
                                >
                                    <Home className="w-5 h-5" />
                                    {t('thankYou.backToHome')}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="xl"
                                    onClick={() => navigate(-1)}
                                    className="w-full sm:w-auto gap-2"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    {t('thankYou.goBack')}
                                </Button>
                            </motion.div>

                            {/* Additional info */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-sm text-muted-foreground mt-8"
                            >
                                {t('thankYou.responseTime')}
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ThankYouPage;
