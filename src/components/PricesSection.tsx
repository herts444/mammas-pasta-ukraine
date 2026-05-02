import { useEffect, useRef, useState } from "react";
import { Truck } from "lucide-react";

interface PriceItem {
  name: string;
  italian?: string;
  weight: string;
  price: string;
}

interface PriceCategory {
  title: string;
  items: PriceItem[];
}

const categories: PriceCategory[] = [
  {
    title: "Довга паста",
    items: [
      { name: "Тальятелле", italian: "Tagliatelle", weight: "200 г", price: "220 грн" },
      { name: "Тальйоліні", italian: "Tagliolini", weight: "200 г", price: "220 грн" },
      { name: "Спагетті", italian: "Spaghetti", weight: "200 г", price: "220 грн" },
      { name: "Мафальдіне", italian: "Mafaldine", weight: "200 г", price: "220 грн" },
    ],
  },
  {
    title: "Равіолі",
    items: [
      { name: "Равіолі Рікота та шпинат", weight: "16 шт · ~150–170 г", price: "200 грн" },
      { name: "Равіолі Білий гриб", weight: "16 шт · ~150–170 г", price: "220 грн" },
      { name: "Равіолі Яловичина", weight: "16 шт · ~150–170 г", price: "240 грн" },
    ],
  },
  {
    title: "Інше",
    items: [
      { name: "Ньокі", italian: "Gnocchi", weight: "200 г", price: "100 грн" },
      { name: "Листи лазаньї", weight: "500 г", price: "280 грн" },
    ],
  },
];

/* ── Reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const RevealBlock = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        filter: visible ? "blur(0)" : "blur(4px)",
        transitionProperty: "opacity, transform, filter",
        transitionDuration: "700ms",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
};

const PriceCard = ({ item, index }: { item: PriceItem; index: number }) => (
  <RevealBlock delay={index * 60} className="h-full">
    <div className="group relative h-full flex flex-col bg-background rounded-2xl border border-accent/40 hover:border-accent shadow-sm hover:shadow-lg hover:shadow-primary/[0.08] hover:-translate-y-1 transition-all duration-300 p-6 overflow-hidden">
      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/60 via-accent to-accent/60" />

      <div className="flex-1">
        <h3 className="font-heading font-bold text-primary text-xl leading-tight">
          {item.name}
        </h3>
        {item.italian && (
          <p className="font-heading italic text-gold text-sm mt-1">
            {item.italian}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-3 uppercase tracking-wide font-medium">
          {item.weight}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-accent/30">
        <p className="font-heading font-bold text-primary text-3xl">
          {item.price}
        </p>
      </div>
    </div>
  </RevealBlock>
);

const PricesSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="prices" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <RevealBlock>
          <h2
            className="text-4xl sm:text-5xl font-heading font-bold text-primary text-center mb-3"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Наша паста — ціни
          </h2>
          <p className="font-heading italic text-gold text-center text-lg mb-14">
            Pasta fresca · Ручна робота · Натуральні інгредієнти
          </p>
        </RevealBlock>

        <div className="space-y-14">
          {categories.map((cat) => (
            <div key={cat.title}>
              <RevealBlock>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="h-px flex-1 max-w-[2rem] bg-accent" />
                  {cat.title}
                  <span className="h-px flex-1 bg-accent/40" />
                </h3>
              </RevealBlock>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {cat.items.map((item, i) => (
                  <PriceCard key={item.name} item={item} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Delivery note */}
        <RevealBlock>
          <div className="mt-14 max-w-2xl mx-auto bg-background/60 border border-accent/40 rounded-2xl p-6 flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
              <Truck size={20} className="text-primary" />
            </div>
            <div className="text-sm leading-relaxed text-foreground/80 space-y-1.5">
              <p>Доставка Новою Поштою — за тарифами перевізника.</p>
              <p>
                Термоупаковка для заморожених продуктів (равіолі, ньокі) —{" "}
                <span className="font-semibold text-primary">+50 грн</span>.
              </p>
              <p className="text-foreground/60 italic">
                Діє тільки для відправок за межі міста.
              </p>
            </div>
          </div>
        </RevealBlock>

        {/* CTA */}
        <RevealBlock>
          <div className="mt-12 flex justify-center">
            <button
              onClick={scrollToContact}
              className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              Замовити
            </button>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
};

export default PricesSection;
