import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
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
  Euro
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
  const { t } = useTranslation();
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
    contact: "",
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setDirection(1);
      setStep(step + 1);
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
      setTimeout(() => setStep(step + 1), 200); // Slight delay for visual feedback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
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
      contact: "",
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
                    className="justify-start text-left h-auto py-6 px-8 rounded-2xl group transition-all duration-300"
                    onClick={() => handleOptionSelect('serviceType', key)}
                  >
                    <div className={cn(
                      "p-3 rounded-xl mr-4 transition-colors duration-300",
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
                    className="justify-start text-left h-auto py-6 px-8 rounded-2xl group transition-all duration-300"
                    onClick={() => handleOptionSelect('projectGoal', key)}
                  >
                    <div className={cn(
                      "p-3 rounded-xl mr-4 transition-colors duration-300",
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
                    className="justify-start text-left h-auto py-6 px-8 rounded-2xl group transition-all duration-300"
                    onClick={() => handleOptionSelect('scale', key)}
                  >
                    <div className={cn(
                      "p-3 rounded-xl mr-4 transition-colors duration-300",
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
                  className="justify-start text-left h-auto py-6 px-8 rounded-2xl group transition-all duration-300"
                  onClick={() => handleOptionSelect('budget', key)}
                >
                  <div className={cn(
                    "p-3 rounded-xl mr-4 transition-colors duration-300",
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
                  className="justify-start text-left h-auto py-6 px-8 rounded-2xl group transition-all duration-300"
                  onClick={() => handleOptionSelect('timeline', key)}
                >
                  <div className={cn(
                    "p-3 rounded-xl mr-4 transition-colors duration-300",
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
        return (
          <div className="space-y-8 p-1">
            <h3 className="text-2xl md:text-3xl font-medium mb-8">{t('cta.steps.step6.question')}</h3>
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
                  {t('cta.steps.step6.contact')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('cta.steps.step6.contactPlaceholder')}
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
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
              className="bg-card rounded-[2.5rem] p-12 md:p-16 border border-border"
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
            className="bg-card rounded-[2.5rem] p-8 md:p-16 border border-border relative min-h-[600px] flex flex-col shadow-2xl shadow-primary/5"
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
                      "w-8 h-1 rounded-full transition-all duration-300",
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
                  {step < totalSteps ? (
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
                      {t('cta.next')}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="hero"
                      size="xl"
                      className="w-full sm:w-auto order-1 sm:order-2 rounded-xl"
                      disabled={!formData.name || !formData.contact}
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