import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const caseImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
];

export const CasesSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cases = t('cases.items', { returnObjects: true }) as Array<{ title: string, cat: string, res: string }>;

  return (
    <section id="cases" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-foreground/30" />
              <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                {t('cases.tag')}
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light">
              {t('cases.title')}
            </h2>
          </div>
          <Button variant="heroOutline" size="lg">
            {t('cases.button')}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={caseImages[index % caseImages.length]}
                  alt={caseItem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-foreground bg-foreground/10 px-3 py-1 rounded-full border border-foreground/20">
                    {caseItem.cat}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {caseItem.res}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-medium group-hover:text-foreground transition-colors duration-300">
                  {caseItem.title}
                </h3>
              </div>

              {/* Arrow */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 translate-x-4">
                <ArrowUpRight className="w-5 h-5 text-foreground" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};