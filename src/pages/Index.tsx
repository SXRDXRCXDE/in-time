import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection/ServicesSection";
import { CalculatorSection } from "@/components/sections/CalculatorSection/CalculatorSection";
import { CasesSection } from "@/components/sections/CasesSection/CasesSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection/AdvantagesSection";
import { ProcessSection } from "@/components/sections/ProcessSection/ProcessSection";
import { ITParkSection } from "@/components/sections/ITParkSection/ITParkSection";
import { SimpleContactForm } from "@/components/sections/SimpleContactForm/SimpleContactForm";

import HeroBackgroundAnimation from "@/components/HeroBackgroundAnimation/HeroBackgroundAnimation";

const Index = () => {
  return (
    <div className="min-h-screen  text-foreground">
      <Header />
      <HeroBackgroundAnimation />
      <main>
        <HeroSection />
        <ServicesSection />
        <CalculatorSection />
        <CasesSection />
        <AdvantagesSection />
        <ProcessSection />
        <ITParkSection />
        <SimpleContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
