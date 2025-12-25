import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroBackgroundAnimation from "../HeroBackgroundAnimation/HeroBackgroundAnimation";

// Words will be loaded from i18n

export const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const [currentWord, setCurrentWord] = useState(0);

  // Use words from translation or fallback
  const translatedWords = t('hero.words', { returnObjects: true }) as string[] || ["сайты", "приложения", "боты", "автоматизацию"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % translatedWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [translatedWords.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-background/30 to-transparent" />
      </div>

      {/* Animated Glow Orb */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-full h-full glow-orb rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Secondary Orb */}
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] translate-x-1/2 translate-y-1/2">
        <motion.div
          className="w-full h-full glow-orb-accent rounded-full"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-foreground/30" />
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
              {t('hero.studio')}
            </p>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] tracking-tight mb-8">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="block"
            >
              {t('hero.title1')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="block"
              dir={i18n.language === 'he' ? 'rtl' : 'ltr'}
            >
              {t('hero.title2')}
              <span className="relative inline-block min-w-[200px] md:min-w-[300px]">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-foreground font-medium"
                >
                  {translatedWords[currentWord]}
                </motion.span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-px bg-foreground/50"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                />
              </span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="block text-muted-foreground"
            >
              {t('hero.title3')}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0 })} variant="hero" size="xl">
              {t('hero.ctaPrimary')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button onClick={() => window.scrollTo({ top: document.getElementById('reviews')?.offsetTop || 0 })} variant="heroOutline" size="xl">
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-muted-foreground/30 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};