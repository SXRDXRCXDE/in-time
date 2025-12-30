import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getFirstProjectImage } from "@/imagesData/imagesData";

export const CasesSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cases = t('cases.items', { returnObjects: true }) as Array<{ id: string, title: string, cat: string, res: string }>;

  return (
    <section id="cases" className="section-padding overflow-hidden" ref={ref}>
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
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => swiperRef.current?.slidePrev()}
                className="rounded-full h-12 w-12 border-foreground/20 hover:bg-foreground hover:text-background transition-colors bg-transparent"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => swiperRef.current?.slideNext()}
                className="rounded-full h-12 w-12 border-foreground/20 hover:bg-foreground hover:text-background transition-colors bg-transparent"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <Button asChild variant="heroOutline" size="lg" className="hidden md:flex">
              <Link to="/cases">
                {t('cases.button')}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={32}
            slidesPerView={1}
            grabCursor={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.2,
              },
              1280: {
                slidesPerView: 2.5,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="cases-swiper !overflow-visible"
          >
            {cases.map((caseItem, index) => (
              <SwiperSlide key={caseItem.id} className="h-auto">
                <div className="group relative flex flex-col gap-4 h-full">
                  <Link to={`/cases/${caseItem.id}`} className="relative overflow-hidden rounded-2xl cursor-pointer aspect-square block">
                    <img
                      src={getFirstProjectImage(caseItem.id)}
                      alt={caseItem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Arrow */}
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 translate-x-4">
                      <ArrowUpRight className="w-5 h-5 text-foreground" />
                    </div>

                    {/* Content on Image */}
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
                  </Link>

                  <Button
                    asChild
                    variant="ghost"
                    className="w-fit group/btn px-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Link to={`/cases/${caseItem.id}`}>
                      <span className="border-b border-transparent group-hover/btn:border-foreground transition-all duration-300">
                        {t('cases.more')}
                      </span>
                      <ArrowUpRight className="ml-2 h-4 w-4 transform transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </Link>
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <div className="mt-12 flex justify-center md:hidden">
          <Button asChild variant="heroOutline" size="lg" className="w-full">
            <Link to="/cases">
              {t('cases.button')}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};