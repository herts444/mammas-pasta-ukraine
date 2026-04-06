import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

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

const faqs = [
  { q: "Чи можна заморозити напівсушену пасту?", a: "Так! Заморожуйте порціями у zip-пакетах. Варити прямо з морозилки, збільшивши час на 1-2 хвилини." },
  { q: "Скільки пасти на одну людину?", a: "Стандартна порція — 100г пасти на людину." },
  { q: "Чому не можна додавати олію у воду?", a: "Олія покриває пасту плівкою — і соус просто не прилипає." },
  { q: "Равіолі розірвались при варінні — що робити?", a: "Зменшіть вогонь — вода має тихо кипіти, не вирувати. Діставайте шумівкою, не через друшляк." },
  { q: "Чим свіжа паста відрізняється від сухої?", a: "Свіжа паста містить яйця — вона ніжніша, готується швидше і має насиченіший смак." },
  { q: "Можна подавати gnocchi без соусу?", a: "Так! Підсмажені на вершковому маслі з пармезаном — вже чудова страва." },
];

const FaqItem = ({ faq, delay }: { faq: typeof faqs[0]; delay: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay}>
      <div className="border border-primary/[0.07] rounded-xl overflow-hidden bg-background shadow-sm shadow-primary/[0.02]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-primary/[0.02] active:scale-[0.995] transition-all duration-200"
        >
          <span className="text-base font-heading font-semibold text-foreground pr-4">{faq.q}</span>
          <ChevronDown size={20} className={`text-foreground/40 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        <div className="overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0 }}>
          <div className="px-5 pb-4 border-t border-primary/[0.05] pt-3">
            <p className="text-sm text-foreground/75 leading-relaxed">{faq.a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

const FaqSection = () => (
  <section id="faq" className="py-24 sm:py-32">
    <div className="container mx-auto px-6 max-w-3xl">
      <Reveal>
        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-primary text-center mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
          Часті запитання
        </h2>
        <p className="font-heading italic text-gold text-center text-lg mb-14">Domande frequenti</p>
      </Reveal>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FaqItem key={i} faq={faq} delay={i * 60} />
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
