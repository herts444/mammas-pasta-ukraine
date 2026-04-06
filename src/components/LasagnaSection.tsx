import { useState, useEffect, useRef } from "react";

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)",
      filter: visible ? "blur(0)" : "blur(3px)", transitionProperty: "opacity, transform, filter",
      transitionDuration: "600ms", transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    }}>{children}</div>
  );
};

const LasagnaSection = () => (
  <section id="lasagna" className="py-24 sm:py-32">
    <div className="container mx-auto px-6 max-w-4xl">
      <Reveal>
        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-primary text-center mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
          Класична лазанья alla Bolognese
        </h2>
        <p className="font-heading italic text-gold text-center text-lg mb-14">Lasagna alla Bolognese</p>
      </Reveal>

      {/* Main ingredients */}
      <Reveal delay={60}>
        <div className="bg-background rounded-2xl border border-primary/[0.07] p-6 sm:p-8 mb-8 shadow-sm">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Інгредієнти <span className="text-sm font-body text-foreground/50">(6 порцій)</span></h3>
          <ul className="grid sm:grid-cols-2 gap-2.5 text-sm text-foreground/80">
            {["Листи лазаньї Mamma's Pasta — 250г", "Ragù alla Bolognese — 1 порція", "Соус бешамель — 1 порція", "Пармезан тертий — 100г"].map((item) => (
              <li key={item} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />{item}</li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Besciamella */}
      <Reveal delay={100}>
        <div className="bg-background rounded-2xl border border-primary/[0.07] p-6 sm:p-8 mb-8 shadow-sm">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-1">Бешамель</h3>
          <p className="font-heading italic text-gold text-sm mb-4">Besciamella</p>
          <p className="text-sm text-foreground/70 mb-5">Вершкове масло 80г · борошно 80г · молоко 1л · мускатний горіх · сіль</p>
          <ol className="space-y-3">
            {["Розтопіть масло", "Додайте борошно, готуйте 2 хвилини", "Поступово вливайте холодне молоко, мішаючи вінчиком", "Варіть до загустіння 10-12 хвилин, додайте мускатний горіх і сіль"].map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="w-6 h-6 rounded-full bg-primary/[0.08] text-primary font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Assembly */}
      <Reveal delay={140}>
        <div className="bg-background rounded-2xl border border-primary/[0.07] p-6 sm:p-8 mb-8 shadow-sm">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Збирання лазаньї</h3>
          <ol className="space-y-3">
            {[
              "Розігрійте духовку до 180°C",
              "Змастіть форму маслом, тонкий шар бешамель на дно",
              "Шар листів → болоньєзе → бешамель → пармезан",
              "Повторіть 3-4 рази. Верхній шар: бешамель + пармезан",
              "Накрийте фольгою, запікайте 30 хвилин",
              "Зніміть фольгу — ще 15 хвилин до золотистої скоринки",
              "Дайте відпочити 10 хвилин перед нарізкою",
            ].map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="w-6 h-6 rounded-full bg-primary/[0.08] text-primary font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal delay={180}>
        <div className="bg-accent/10 rounded-xl px-5 py-4 text-center">
          <p className="text-sm font-medium text-foreground/80 font-heading italic">
            <span className="text-gold">Consiglio:</span> лазанья смачніша наступного дня
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default LasagnaSection;
