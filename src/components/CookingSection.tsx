import { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";

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

const rules = [
  "1 літр води на 100г пасти",
  "10г солі на літр — вода солона як море",
  "Олія у воду — не додавати (заважає соусу прилипати)",
  "Al dente — пружна, з легким опором при укусі",
  "Зберегти склянку крохмальної води для соусу",
  "Останню хвилину доварювати в соусі на сковороді",
];

const times = [
  { name: "Tagliolini", time: "2 хв" },
  { name: "Tagliatelle", time: "3 хв" },
  { name: "Spaghetti", time: "3-4 хв" },
  { name: "Mafaldine", time: "4 хв" },
  { name: "Листи лазаньї", time: "2-3 хв" },
  { name: "Равіолі (з морозилки)", time: "4-6 хв, діставати шумівкою" },
  { name: "Gnocchi (з морозилки)", time: "2-3 хв, готові щойно спливли" },
];

const CookingSection = () => (
  <section id="cooking" className="py-24 sm:py-32">
    <div className="container mx-auto px-6 max-w-4xl">
      <Reveal>
        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-primary text-center mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
          Як варити пасту
        </h2>
        <p className="font-heading italic text-gold text-center text-lg mb-14">Come cucinare la pasta</p>
      </Reveal>

      {/* Golden rules */}
      <Reveal delay={60}>
        <div className="bg-background rounded-2xl border border-primary/[0.07] p-6 sm:p-8 mb-8 shadow-sm">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-5">✨ Золоті правила</h3>
          <ul className="space-y-3">
            {rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Cooking times */}
      <Reveal delay={120}>
        <div className="bg-background rounded-2xl border border-primary/[0.07] overflow-hidden shadow-sm">
          <div className="px-6 sm:px-8 py-5 border-b border-primary/[0.05] flex items-center gap-2.5">
            <Clock size={18} className="text-primary/50" />
            <h3 className="text-xl font-heading font-semibold text-foreground">Час варіння</h3>
          </div>
          <div className="divide-y divide-primary/[0.04]">
            {times.map((t) => (
              <div key={t.name} className="flex items-center justify-between px-6 sm:px-8 py-3.5 hover:bg-primary/[0.015] transition-colors">
                <span className="text-sm font-medium text-foreground/80">{t.name}</span>
                <span className="text-sm text-foreground/60 font-body">{t.time}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CookingSection;
