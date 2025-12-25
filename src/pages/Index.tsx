import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ITParkSection } from "@/components/sections/ITParkSection";
import { CtaSection } from "@/components/sections/CtaSection";

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
