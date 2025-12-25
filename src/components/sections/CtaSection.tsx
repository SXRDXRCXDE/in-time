import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CtaSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('cta.toastTitle'),
      description: t('cta.toastDesc'),
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20">
        <div className="w-full h-full rounded-full glow-orb animate-pulse-glow" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
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

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl p-8 md:p-12 border border-border"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  {t('cta.name')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-foreground/50 focus:outline-none transition-colors duration-300"
                  placeholder={t('cta.namePlaceholder')}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-foreground/50 focus:outline-none transition-colors duration-300"
                  placeholder={t('cta.emailPlaceholder')}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-muted-foreground mb-2">
                {t('cta.message')}
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-foreground/50 focus:outline-none transition-colors duration-300 resize-none"
                rows={4}
                placeholder={t('cta.messagePlaceholder')}
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-muted-foreground text-sm">
                {t('cta.response')}
              </p>
              <Button type="submit" variant="hero" size="xl">
                {t('cta.submit')}
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};