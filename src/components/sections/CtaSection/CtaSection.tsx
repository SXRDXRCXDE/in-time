import { CtaForm } from "./CtaForm";

export const CtaSection = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
        <div className="w-full h-full rounded-full glow-orb animate-pulse-glow" />
      </div>

      <div className="container-custom relative z-10">
        <CtaForm />
      </div>
    </section>
  );
};