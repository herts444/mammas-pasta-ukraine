import { useState, useEffect, useRef } from "react";
import { Snowflake } from "lucide-react";

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

const storageGroups = [
  {
    title: "Довга паста + листи лазаньї",
    items: [
      "Холодильник: до 5-7 днів у закритій упаковці",
      "Морозилка: до 2 місяців, заморожувати порціями",
      "Не залишати відкритою — вбирає запахи",
    ],
  },
  {
    title: "Равіолі (заморожені сирі)",
    items: [
      "Морозилка: до 2 місяців",
      "Варити прямо з морозилки — не розморожувати",
      "Після розморожування — використати протягом 24 годин",
    ],
  },
  {
    title: "Gnocchi (заморожені)",
    items: [
      "Морозилка: до 2 місяців",
      "Варити прямо з морозилки",
      "Порада: підсмажити на маслі після варіння для скоринки",
    ],
  },
];

const StorageSection = () => (
  <section id="storage" className="py-24 sm:py-32">
    <div className="container mx-auto px-6 max-w-4xl">
      <Reveal>
        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-primary text-center mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
          Зберігання
        </h2>
        <p className="font-heading italic text-gold text-center text-lg mb-14">Conservazione</p>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-5">
        {storageGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 80}>
            <div className="bg-background rounded-2xl border border-primary/[0.07] p-6 shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Snowflake size={18} className="text-primary/40" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">{group.title}</h3>
              <ul className="space-y-2.5 flex-1">
                {group.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-foreground/75">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default StorageSection;
