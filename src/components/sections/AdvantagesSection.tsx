import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Clock, MessageSquare, Globe } from "lucide-react";

const icons = [Clock, MessageSquare, Globe];

export const AdvantagesSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const advantages = t('advantages.items', { returnObjects: true }) as Array<{ title: string, desc: string }>;
  const stats = t('advantages.stats', { returnObjects: true }) as Array<{ value: string, label: string }>;

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
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${index === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{advantage.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {advantage.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-card/40 backdrop-blur-md border border-border"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-light text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};