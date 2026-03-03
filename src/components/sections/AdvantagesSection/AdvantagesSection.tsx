import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Clock, MessageSquare, Globe, ShieldCheck, Zap, Users, CheckCircle2, XCircle } from "lucide-react";

const icons = [Zap, MessageSquare, Globe, ShieldCheck, Users, Clock, CheckCircle2, XCircle];

export const AdvantagesSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const advantages = t('advantages.items', { returnObjects: true }) as Array<{ title: string, desc: string }>;

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-foreground/30" />
            <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              {t('advantages.tag')}
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light max-w-3xl">
            {t('advantages.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            // Specific icon mapping for the new blocks if they are at the end
            let Icon = icons[index % icons.length];

            // Try to match icon by title or index if known
            if (index === advantages.length - 2 && advantages.length > 3) Icon = CheckCircle2;
            if (index === advantages.length - 1 && advantages.length > 3) Icon = XCircle;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${(index === advantages.length - 1 && index % 3 === 0) ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="flex gap-5">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{advantage.title}</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {advantage.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};