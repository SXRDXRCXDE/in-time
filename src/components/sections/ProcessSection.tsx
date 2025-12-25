import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export const ProcessSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = t('process.steps', { returnObjects: true }) as Array<{ title: string, desc: string }>;

  return (
    <section id="process" className="section-padding bg-card/30" ref={ref}>
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
              {t('process.tag')}
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light max-w-3xl">
            {t('process.title')}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => {
              const stepNumber = (index + 1).toString().padStart(2, '0');
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`lg:grid lg:grid-cols-2 lg:gap-16 ${index % 2 === 0 ? "" : "lg:direction-rtl"
                    }`}
                >
                  <div
                    className={`relative pb-8 lg:pb-16 ${index % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:pl-16 lg:col-start-2"
                      }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`hidden lg:flex absolute top-0 w-12 h-12 rounded-full bg-background border border-foreground/30 items-center justify-center ${index % 2 === 0 ? "right-0 translate-x-1/2 -mr-6" : "left-0 -translate-x-1/2 -ml-6"
                        }`}
                    >
                      <span className="text-foreground text-sm font-medium">{stepNumber}</span>
                    </div>

                    <div className="lg:hidden flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/20 flex items-center justify-center">
                        <span className="text-foreground text-sm font-medium">{stepNumber}</span>
                      </div>
                      <h3 className="text-xl font-medium">{step.title}</h3>
                    </div>

                    <h3 className="hidden lg:block text-xl font-medium mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed lg:max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};