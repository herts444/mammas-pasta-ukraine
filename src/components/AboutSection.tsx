import { useEffect, useRef, useState } from "react";

const philosophyCards = [
  "Їжа — це більше, ніж їжа. Це турбота, спілкування і тепло.",
  "Традиції живі, коли їх проживають — не зберігають під склом.",
  "Справжність важливіша за ідеальність. Ручна робота — це характер.",
  "Якість починається з інгредієнтів. Мінімум складників, максимум сенсу.",
  "Справжній італійський смак має бути бути близьким кожному.",
  "Італія та Україна — ближче, ніж здається. Нас об'єднує любов до родини і столу.",
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const RevealBlock = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        filter: visible ? "blur(0)" : "blur(4px)",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Main heading */}
        <RevealBlock>
          <h2
            className="text-4xl sm:text-5xl font-heading font-bold text-primary mb-4 text-center"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Наша історія
          </h2>
          <p className="font-heading italic text-gold text-center text-lg mb-12">
            La nostra storia
          </p>
        </RevealBlock>

        {/* Intro text */}
        <RevealBlock delay={80}>
          <p className="text-lg sm:text-xl leading-relaxed text-foreground/85 mb-16 text-center max-w-3xl mx-auto" style={{ textWrap: "pretty" } as React.CSSProperties}>
            Mamma's Pasta — це не просто їжа. Це спосіб сказати «люблю». Італія дала нам ідею, Україна — відчуття дому. Ми створюємо пасту для моментів, які важливі: коли ви разом, коли говорите, коли мовчите поруч.{" "}
            <span className="font-heading italic text-gold">Ami</span> — це не просто слово. Це любов, яку ви готуєте для своїх.
          </p>
        </RevealBlock>

        {/* Two column blocks */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <RevealBlock delay={0}>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
              Як це починалось
            </h3>
            <p className="text-base leading-relaxed text-foreground/75" style={{ textWrap: "pretty" } as React.CSSProperties}>
              Ідея Mamma's Pasta народилась в Італії — серед традицій, де їжа не поспішає. Там стало зрозуміло, що італійська культура їжі дуже схожа на українську: родина, стіл, прості рецепти і якісні інгредієнти. Так з'явилась Mamma's Pasta — паста з італійською душею та українським серцем.
            </p>
          </RevealBlock>

          <RevealBlock delay={100}>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
              Наша місія
            </h3>
            <p className="text-base leading-relaxed text-foreground/75" style={{ textWrap: "pretty" } as React.CSSProperties}>
              Зробити італійську пасту близькою для українських родин. Не як ресторанну екзотику, а як частину домашньої культури їжі.
            </p>
          </RevealBlock>
        </div>

        {/* Philosophy */}
        <RevealBlock>
          <h3 className="text-3xl font-heading font-bold text-primary text-center mb-3">
            Наша філософія
          </h3>
          <p className="font-heading italic text-gold text-center mb-10">
            La nostra filosofia
          </p>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {philosophyCards.map((text, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div className="group bg-background rounded-xl p-6 shadow-sm shadow-primary/[0.04] border border-primary/[0.06] hover:shadow-md hover:shadow-primary/[0.08] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 h-full">
                <p className="text-sm leading-relaxed text-foreground/80">
                  {text}
                </p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
