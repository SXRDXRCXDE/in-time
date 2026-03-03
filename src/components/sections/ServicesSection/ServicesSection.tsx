import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Smartphone, Bot, Zap, Palette, Database } from "lucide-react";

const iconsMap: Record<string, any> = {
  crm: Bot,
  web: Globe,
  app: Smartphone
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export const ServicesSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [focus, setFocus] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const focusParam = params.get('focus') || '';
    setFocus(focusParam);
  }, []);

  const services = t('services.items', { returnObjects: true }) as Array<{ title: string, desc: string }>;

  // Определяем порядок блоков в зависимости от focus
  const getOrderedServices = () => {
    // Текущий порядок: 0-CRM, 1-Web, 2-App, 3-Landing
    const orderMap: Record<string, number[]> = {
      'crm': [0, 1, 2, 3],     // CRM, Web, App, Landing
      'web': [1, 0, 2, 3],     // Web, CRM, App, Landing
      'app': [2, 0, 1, 3],     // App, CRM, Web, Landing
      'landing': [3, 1, 0, 2], // Landing, Web, CRM, App
    };

    const order = focus && orderMap[focus] ? orderMap[focus] : [0, 1, 2, 3];
    return order.map(i => services[i]);
  };

  // Определяем иконку в зависимости от заголовка блока
  const getIcon = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('crm')) return iconsMap.crm;
    if (titleLower.includes('landing') || titleLower.includes('נחית')) return iconsMap.web; // та же иконка что у web
    if (titleLower.includes('web') || titleLower.includes('сайт') || titleLower.includes('אתר')) return iconsMap.web;
    if (titleLower.includes('app') || titleLower.includes('aplikace') || titleLower.includes('приложен') || titleLower.includes('אפליק')) return iconsMap.app;
    return Bot;
  };

  const orderedServices = getOrderedServices();

  // Функция для разделения описания и цены
  const splitDescAndPrice = (desc: string) => {
    // Разделяем по переносу строки и находим строку с ценой
    const lines = desc.split('\n');
    const priceLineIndex = lines.findIndex(line => 
      line.includes('Od ') || line.includes('From ') || line.includes('От ') || line.includes('מ-')
    );
    
    if (priceLineIndex !== -1) {
      const priceLine = lines[priceLineIndex];
      const descLines = lines.filter((_, i) => i !== priceLineIndex);
      return { description: descLines.join('\n'), price: priceLine };
    }
    
    return { description: desc, price: null };
  };

  return (
    <section id="services" className="section-padding" ref={ref}>
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
              {t('services.tag')}
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light max-w-3xl">
            {t('services.title')}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {orderedServices.map((service, index) => {
            const Icon = getIcon(service.title);
            const { description, price } = splitDescAndPrice(service.desc);
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 rounded-2xl bg-card/40 backdrop-blur-md border border-border hover:border-foreground/20 transition-all duration-500 card-shine hover-lift cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-foreground/5 transition-colors duration-500">
                  <Icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {description}
                </p>
                {price && (
                  <p className="text-foreground font-medium text-lg">
                    {price}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};