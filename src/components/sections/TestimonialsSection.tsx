import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const avatars = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
];

const clientsIcons = [
  "KAY-KAY",
  "SOLOD-EXPO",
  "ICE-MILLENIUM",
  "Amadeus",
  "IT PARK",
];

export const TestimonialsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{ quote: string, author: string, role: string }>;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="reviews" className="section-padding" ref={ref}>
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
              {t('testimonials.tag')}
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light max-w-3xl">
            {t('testimonials.title')}
          </h2>
        </motion.div>

        {/* Testimonial Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 lg:p-16 border border-border">
            <Quote className="w-12 h-12 text-foreground/10 mb-8" />

            <div className="relative min-h-[200px]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: current === index ? 1 : 0,
                    x: current === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`${current === index ? "block" : "hidden"}`}
                >
                  <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={avatars[index % avatars.length]}
                      alt={testimonial.author}
                      className="w-14 h-14 rounded-full object-cover grayscale"
                    />
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${current === index
                      ? "w-8 bg-foreground"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-border hover:border-foreground/50 hover:bg-foreground/5 flex items-center justify-center transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full border border-border hover:border-foreground/50 hover:bg-foreground/5 flex items-center justify-center transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <p className="text-muted-foreground text-sm text-center mb-8">
            {t('testimonials.trust')}
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {clientsIcons.map((client, index) => (
              <div
                key={index}
                className="text-muted-foreground/40 font-medium text-lg hover:text-muted-foreground transition-colors duration-300 cursor-default"
              >
                {client}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};