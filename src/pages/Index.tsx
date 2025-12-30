import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection/ServicesSection";
import { CasesSection } from "@/components/sections/CasesSection/CasesSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection/AdvantagesSection";
import { ProcessSection } from "@/components/sections/ProcessSection/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection/TestimonialsSection";
import { ITParkSection } from "@/components/sections/ITParkSection/ITParkSection";
import { CtaSection } from "@/components/sections/CtaSection/CtaSection";

import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";

const Index = () => {
  return (
    <div className="min-h-screen  text-foreground">
      <Header />
      <HeroBackgroundAnimation />
      <main>
        <HeroSection />
        <ServicesSection />
        <CasesSection />
        <AdvantagesSection />
        <ProcessSection />
        <ITParkSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
