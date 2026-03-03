import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useCalculator } from "@/contexts/CalculatorContext";

export const SimpleContactForm = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { calculatorData, setCalculatorData } = useCalculator();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const getThankYouPathWithGclid = () => {
        const params = new URLSearchParams(window.location.search);
        const gclidFromUrl = params.get('gclid');

        if (gclidFromUrl) {
            sessionStorage.setItem('gclid', gclidFromUrl);
            return `/thank-you?gclid=${encodeURIComponent(gclidFromUrl)}`;
        }

        const gclidFromStorage = sessionStorage.getItem('gclid');
        if (gclidFromStorage) {
            return `/thank-you?gclid=${encodeURIComponent(gclidFromStorage)}`;
        }

        return '/thank-you';
    };

    const calculateResult = (calcFormData: {
        serviceType: string;
        projectGoal: string;
        scale: string;
        budget: string;
        timeline: string;
    }) => {
        const serviceData: Record<string, { base: number, weeks: [number, number] }> = {
            site: { base: 700, weeks: [1, 2] },
            app: { base: 2000, weeks: [3, 5] },
            bot: { base: 250, weeks: [1, 2] },
            automation: { base: 1200, weeks: [2, 3] },
            notSure: { base: 1000, weeks: [2, 3] },
        };

        const goalMults: Record<string, number> = {
            mvp: 1.0,
            sales: 1.2,
            internal: 1.1,
            support: 1.15,
            scaling: 1.3,
        };

        const scaleData: Record<string, { mult: number, weekOffset: number }> = {
            simple: { mult: 0.9, weekOffset: -1 },
            medium: { mult: 1.0, weekOffset: 0 },
            complex: { mult: 1.4, weekOffset: 2 },
        };

        const budgetCorrections: Record<string, number> = {
            under500: -0.15,
            "500-1000": -0.05,
            "1000-3000": 0,
            "3000-7000": 0.05,
            dontKnow: 0,
        };

        const timelineData: Record<string, { mult: number, timeMult: number }> = {
            urgent: { mult: 1.3, timeMult: 0.7 },
            "1-2months": { mult: 1.0, timeMult: 1.0 },
            noDeadline: { mult: 0.95, timeMult: 1.2 },
        };

        const service = serviceData[calcFormData.serviceType] || serviceData.notSure;
        const goalMult = goalMults[calcFormData.projectGoal] || 1.0;
        const scale = scaleData[calcFormData.scale] || scaleData.medium;
        const budgetCorr = budgetCorrections[calcFormData.budget] || 0;
        const timeline = timelineData[calcFormData.timeline] || timelineData["1-2months"];

        const marketMult = i18n.language.startsWith('he') ? 1.4 : 1.0;

        const basePrice = service.base;
        const finalPrice = basePrice * goalMult * scale.mult * timeline.mult * marketMult * (1 + budgetCorr);

        const priceMin = Math.round((finalPrice * 0.95) / 50) * 50;
        const priceMax = Math.round((finalPrice * 1.25) / 50) * 50;

        const minWeeks = Math.max(1, Math.round((service.weeks[0] + scale.weekOffset) * timeline.timeMult));
        const maxWeeks = Math.max(minWeeks + 1, Math.round((service.weeks[1] + scale.weekOffset) * timeline.timeMult));

        return { priceMin, priceMax, minWeeks, maxWeeks };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload: any = {
            name: formData.name,
            email: formData.email,
            language: i18n.language,
            domain: window.location.hostname,
        };

        let results = null;
        // Если калькулятор заполнен, добавляем данные калькулятора
        if (calculatorData) {
            results = calculateResult(calculatorData);
            payload.serviceType = t('cta.steps.step1.options.' + calculatorData.serviceType);
            payload.projectGoal = t('cta.steps.step2.options.' + calculatorData.projectGoal);
            payload.scale = t('cta.steps.step3.options.' + calculatorData.scale);
            payload.budget = t('cta.steps.step4.options.' + calculatorData.budget);
            payload.timeline = t('cta.steps.step5.options.' + calculatorData.timeline);
            payload.priceMin = results.priceMin;
            payload.priceMax = results.priceMax;
            payload.minWeeks = results.minWeeks;
            payload.maxWeeks = results.maxWeeks;
        }

        // Выводим все данные в консоль перед отправкой
        console.log('=== FORM SUBMIT ===');
        console.log('Calculator data found:', calculatorData !== null);
        if (calculatorData) {
            console.log('✅ Calculator data from context:', calculatorData);
            console.log('Calculation results:', results);
        }
        console.log('Full payload to send:', payload);
        console.log('Payload JSON:', JSON.stringify(payload, null, 2));
        console.log('===================');

        try {
            const response = await fetch('/api/cta/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            if (
                typeof window !== 'undefined' &&
                (window as any).gtag &&
                !sessionStorage.getItem('lead_sent')
            ) {
                (window as any).gtag('event', 'close_convert_lead');
                sessionStorage.setItem('lead_sent', '1');
            }

            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'form_submit_lead', {
                    event_category: 'form',
                    event_label: 'lead_form'
                });
            }

            // Очищаем данные калькулятора после успешной отправки
            if (calculatorData) {
                setCalculatorData(null);
            }
            
            // Редиректим на страницу благодарности
            navigate(getThankYouPathWithGclid());
        } catch (error) {
            console.error(error);
            alert('Error: Something went wrong. Please try again.');
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
        });
    };

    return (
        <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
                <div className="w-full h-full rounded-full glow-orb animate-pulse-glow" />
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-6xl font-light mb-6"
                    >
                        {t('cta.title')}
                        <span className="font-medium">{t('cta.titleSpan')}</span>?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        {t('cta.steps.step6.ctaTitle', { defaultValue: 'Оставьте контакты — мы свяжемся с вами в ближайшее время.' })}
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="max-w-xl mx-auto"
                >
                    <form onSubmit={handleSubmit} className="bg-card/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-16 border border-border">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground ml-1">
                                    {t('cta.steps.step6.name')}
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder={t('cta.steps.step6.namePlaceholder')}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-secondary border border-border rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground ml-1">
                                    {t('cta.steps.step6.email')}
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder={t('cta.steps.step6.emailPlaceholder')}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-secondary border border-border rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-6 items-center justify-between pt-8 border-t border-border">
                            <p className="text-muted-foreground text-sm order-2 sm:order-1">
                                {t('cta.response', { defaultValue: 'Обычно отвечаем в течение 24 часов' })}
                            </p>
                            <Button
                                type="submit"
                                variant="hero"
                                size="xl"
                                className="w-full sm:w-auto order-1 sm:order-2 rounded-xl"
                                disabled={!formData.name || !formData.email}
                            >
                                {t('cta.submit')}
                                <Send className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};
