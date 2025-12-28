import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Send,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Globe,
  Smartphone,
  Bot,
  Cpu,
  HelpCircle,
  Rocket,
  TrendingUp,
  Settings,
  Headset,
  Maximize,
  Layout,
  Layers,
  Zap,
  Clock,
  Euro,
  Calculator,
  Timer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const stepIcons: Record<string, any> = {
  // Step 1: What to do
  site: Globe,
  app: Smartphone,
  bot: Bot,
  automation: Cpu,
  notSure: HelpCircle,

  // Step 2: Goal
  mvp: Rocket,
  sales: TrendingUp,
  internal: Settings,
  support: Headset,
  scaling: Maximize,

  // Step 3: Scale
  simple: Layout,
  medium: Layers,
  complex: Zap,

  // Step 4: Budget (optional, can use Euro)
  // Step 5: Timeline (optional, can use Clock)
};

export const CtaSection = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: "",
    projectGoal: "",
    scale: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const NumberCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (isInView) {
        let startTimestamp: number | null = null;
        const duration = 1200; // ms

        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);

          // Cubic ease out
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * easeProgress));

          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      }
    }, [value, isInView]);

    return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>;
  };

  const totalSteps = 7;

  const calculateResult = () => {
    const serviceData: Record<string, { base: number, weeks: [number, number] }> = {
      site: { base: 700, weeks: [1, 2] },
      app: { base: 2000, weeks: [3, 5] },
      bot: { base: 700, weeks: [1, 2] },
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

    const service = serviceData[formData.serviceType] || serviceData.notSure;
    const goalMult = goalMults[formData.projectGoal] || 1.0;
    const scale = scaleData[formData.scale] || scaleData.medium;
    const budgetCorr = budgetCorrections[formData.budget] || 0;
    const timeline = timelineData[formData.timeline] || timelineData["1-2months"];

    const marketMult = i18n.language.startsWith('he') ? 1.4 : 1.0;

    const basePrice = service.base;
    const finalPrice = basePrice * goalMult * scale.mult * timeline.mult * marketMult * (1 + budgetCorr);

    // Price Range Calculation as per example 2100 - 2700 (which is roughly single value +/- 10-15%)
    const priceMin = Math.round((finalPrice * 0.95) / 50) * 50;
    const priceMax = Math.round((finalPrice * 1.25) / 50) * 50;

    const minWeeks = Math.max(1, Math.round((service.weeks[0] + scale.weekOffset) * timeline.timeMult));
    const maxWeeks = Math.max(minWeeks + 1, Math.round((service.weeks[1] + scale.weekOffset) * timeline.timeMult));

    return { priceMin, priceMax, minWeeks, maxWeeks };
  };

  const handleNext = () => {
    if (step < totalSteps) {
      if (step === 5) {
        setDirection(1);
        setIsCalculating(true);
        setStep(step + 1);
        setTimeout(() => setIsCalculating(false), 1500);
      } else {
        setDirection(1);
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleOptionSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (step < 6) {
      setDirection(1);
      setTimeout(() => setStep(step + 1), 200);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: t('cta.toastTitle'),
        description: t('cta.toastDesc'),
      });
    }, 600);
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setFormData({
      serviceType: "",
      projectGoal: "",
      scale: "",
      budget: "",
      timeline: "",
      name: "",
      email: "",
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const renderStep = () => {
    if (isCalculating) {
      return (
        <div className="flex flex-col items-center justify-center h-full py-12 space-y-6">
          <div className="relative w-20 h-20">
            <motion.div
              className="absolute inset-0 border-4 border-primary/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 border-4 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-medium animate-pulse"
          >
            {t('cta.calculating', { defaultValue: 'Анализируем параметры...' })}
          </motion.p>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="space-y-6 p-1">
            <h3 className="text-2xl md:text-3xl font-medium mb-8">{t('cta.steps.step1.question')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(t('cta.steps.step1.options', { returnObjects: true })).map(([key, value]) => {
                const Icon = stepIcons[key] || HelpCircle;
                return (
                  <Button
                    key={key}
                    type="button"
                    variant={formData.serviceType === key ? "hero" : "heroOutline"}
                    size="xl"
                    className="justify-start text-left h-auto max-[480px]:px-2.5 max-[480px]:py-3 py-6 px-8 rounded-2xl group transition-all duration-300 overflow-hidden"
                    onClick={() => handleOptionSelect('serviceType', key)}
                  >
                    <div className={cn(
                      "p-3 rounded-xl max-[480px]:mr-0 mr-4 transition-colors duration-300",
                      formData.serviceType === key ? "bg-white/20" : "bg-secondary group-hover:bg-primary/10"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg">{value as string}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 p-1">
            <h3 className="text-2xl md:text-3xl font-medium mb-8">{t('cta.steps.step2.question')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(t('cta.steps.step2.options', { returnObjects: true })).map(([key, value]) => {
                const Icon = stepIcons[key] || Layout;
                return (
                  <Button
                    key={key}
                    type="button"
                    variant={formData.projectGoal === key ? "hero" : "heroOutline"}
                    size="xl"
                    className="justify-start text-left h-auto max-[480px]:px-2.5 max-[480px]:py-3 py-6 px-8 rounded-2xl group transition-all duration-300 overflow-hidden"
                    onClick={() => handleOptionSelect('projectGoal', key)}
                  >
                    <div className={cn(
                      "p-3 rounded-xl max-[480px]:mr-0 mr-4 transition-colors duration-300",
                      formData.projectGoal === key ? "bg-white/20" : "bg-secondary group-hover:bg-primary/10"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg">{value as string}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 p-1">
            <h3 className="text-2xl md:text-3xl font-medium mb-8">{t('cta.steps.step3.question')}</h3>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(t('cta.steps.step3.options', { returnObjects: true })).map(([key, value]) => {
                const Icon = stepIcons[key] || Layers;
                return (
                  <Button
                    key={key}
                    type="button"
                    variant={formData.scale === key ? "hero" : "heroOutline"}
                    size="xl"
                    className="justify-start text-left h-auto max-[480px]:px-2.5 max-[480px]:py-3 py-6 px-8 rounded-2xl group transition-all duration-300 overflow-hidden"
                    onClick={() => handleOptionSelect('scale', key)}
                  >
                    <div className={cn(
                      "p-3 rounded-xl max-[480px]:mr-0 mr-4 transition-colors duration-300",
                      formData.scale === key ? "bg-white/20" : "bg-secondary group-hover:bg-primary/10"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg">{value as string}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 p-1">
            <h3 className="text-2xl md:text-3xl font-medium mb-8">{t('cta.steps.step4.question')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(t('cta.steps.step4.options', { returnObjects: true })).map(([key, value]) => (
                <Button
                  key={key}
                  type="button"
                  variant={formData.budget === key ? "hero" : "heroOutline"}
                  size="xl"
                  className="justify-start text-left h-auto max-[480px]:px-2.5 max-[480px]:py-3 py-6 px-8 rounded-2xl group transition-all duration-300 overflow-hidden"
                  onClick={() => handleOptionSelect('budget', key)}
                >
                  <div className={cn(
                    "p-3 rounded-xl max-[480px]:mr-0 mr-4 transition-colors duration-300",
                    formData.budget === key ? "bg-white/20" : "bg-secondary group-hover:bg-primary/10"
                  )}>
                    <Euro className="w-6 h-6" />
                  </div>
                  <span className="text-lg">{value as string}</span>
                </Button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 p-1">
            <h3 className="text-2xl md:text-3xl font-medium mb-8">{t('cta.steps.step5.question')}</h3>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(t('cta.steps.step5.options', { returnObjects: true })).map(([key, value]) => (
                <Button
                  key={key}
                  type="button"
                  variant={formData.timeline === key ? "hero" : "heroOutline"}
                  size="xl"
                  className="justify-start text-left h-auto max-[480px]:px-2.5 max-[480px]:py-3 py-6 px-8 rounded-2xl group transition-all duration-300 overflow-hidden"
                  onClick={() => handleOptionSelect('timeline', key)}
                >
                  <div className={cn(
                    "p-3 rounded-xl max-[480px]:mr-0 mr-4 transition-colors duration-300",
                    formData.timeline === key ? "bg-white/20" : "bg-secondary group-hover:bg-primary/10"
                  )}>
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-lg">{value as string}</span>
                </Button>
              ))}
            </div>
          </div>
        );
      case 6:
        const results = calculateResult();
        const currencyData = {
          cs: { rate: 25, symbol: " Kč" },
          he: { rate: 4, symbol: " ₪" },
          ru: { rate: 1, symbol: " €" },
          en: { rate: 1, symbol: " €" },
        }[i18n.language] || { rate: 1, symbol: " €" };

        const displayPriceMin = Math.round(results.priceMin * currencyData.rate);
        const displayPriceMax = Math.round(results.priceMax * currencyData.rate);

        return (
          <div className="space-y-8 p-1">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl md:text-3xl font-medium">{t('cta.result.title')}</h3>
              <div className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-[0.2em] border border-primary/20">
                {t('cta.result.liveEstimate', { defaultValue: 'Live Estimate' })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary/40 backdrop-blur-sm rounded-[2rem] max-[480px]:p-4 p-8 border border-primary/10 space-y-6 relative overflow-hidden group"
              >
                <div className="absolute -top-12 -right-12 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                  <Calculator className="w-64 h-64" />
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <Calculator className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">
                      {t('cta.result.estimation')}
                    </p>
                    <div className=" max-[480px]:text-sm text-3xl md:text-5xl font-semibold flex items-baseline gap-1">
                      <span className="text-2xl mr-1">💰</span>
                      <NumberCounter value={displayPriceMin} suffix=" – " />
                      <NumberCounter value={displayPriceMax} suffix={currencyData.symbol} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-primary/20 rounded-2xl">
                    <Timer className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">
                      {t('cta.result.timeline')}
                    </p>
                    <div className="max-[480px]:text-sm text-2xl md:text-3xl font-medium flex items-center gap-2">
                      <span>⏱️</span>
                      <NumberCounter value={results.minWeeks} />
                      <span>–</span>
                      <NumberCounter value={results.maxWeeks} suffix={` ${t('cta.result.weeks')}`} />
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: formData.serviceType ? t('cta.steps.step1.options.' + formData.serviceType) : '', icon: Globe },
                  { label: formData.projectGoal ? t('cta.steps.step2.options.' + formData.projectGoal) : '', icon: Rocket },
                  { label: formData.scale ? t('cta.steps.step3.options.' + formData.scale) : '', icon: Layers },
                  { label: formData.timeline ? t('cta.steps.step5.options.' + formData.timeline) : '', icon: Clock }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-secondary/20 border border-border/50 text-center">
                    <item.icon className="w-4 h-4 mb-2 text-primary opacity-60" />
                    <span className="text-[10px] uppercase tracking-tighter text-muted-foreground line-clamp-1">{item.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground italic px-4 text-center text-sm">
                {t('cta.result.disclaimer')}
              </p>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-8 p-1">
            <h3 className="text-2xl md:text-3xl font-medium mb-4">{t('cta.steps.step6.question')}</h3>
            <p className="text-muted-foreground mb-8 text-lg">{t('cta.steps.step6.ctaTitle')}</p>
            <div className="grid grid-cols-1 gap-6">
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
          </div>
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
        <div className="container-custom relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-card/40 backdrop-blur-md rounded-[2.5rem] p-12 md:p-16 border border-border"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-medium mb-4">{t('cta.toastTitle')}</h2>
              <p className="text-muted-foreground text-lg mb-8">{t('cta.toastDesc')}</p>
              <Button variant="hero" size="xl" onClick={resetForm} className="w-full">
                {t('common.done', { defaultValue: 'Готово' })}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
        <div className="w-full h-full rounded-full glow-orb animate-pulse-glow" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-6xl font-light mb-6"
            >
              {t('cta.title')}
              <span className="font-medium">{t('cta.titleSpan')}</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              {t('cta.subtitle')}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-16 border border-border relative min-h-[600px] flex flex-col shadow-2xl shadow-primary/5"
          >
            {/* Progress Bar */}
            <div className="w-full h-1.5 absolute top-0 left-0 overflow-hidden px-10">
              <div className="w-full h-1.5 bg-secondary rounded-[2.5rem] overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>


            <div className="mb-12 flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                {t('common.step', { defaultValue: 'Шаг' })} {step} / {totalSteps}
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-6 h-1 rounded-full transition-all duration-300",
                      step > i ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="w-full h-full"
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between pt-8 border-t border-border">
                <div className="flex gap-4 w-full sm:w-auto">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="heroOutline"
                      size="lg"
                      onClick={handleBack}
                      className="px-6 rounded-xl"
                    >
                      <ChevronLeft className="mr-2 h-5 w-5" />
                      {t('cta.back')}
                    </Button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-center w-full sm:w-auto">
                  <p className="text-muted-foreground text-sm order-2 sm:order-1 hidden md:block">
                    {t('cta.response')}
                  </p>
                  {step < totalSteps && (
                    <Button
                      type="button"
                      variant="hero"
                      size="xl"
                      className="w-full sm:w-auto order-1 sm:order-2 rounded-xl"
                      onClick={handleNext}
                      disabled={
                        (step === 1 && !formData.serviceType) ||
                        (step === 2 && !formData.projectGoal) ||
                        (step === 3 && !formData.scale) ||
                        (step === 4 && !formData.budget) ||
                        (step === 5 && !formData.timeline)
                      }
                    >
                      {step === 6 ? t('cta.result.toContact') : t('cta.next')}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                  {step === 7 && (
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
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};