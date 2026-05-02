import { Check, Minus, Wheat } from "lucide-react";

const fresca = [
  "Виготовлена вручну з яєць і борошна",
  "Ніжна, шовкова текстура",
  "Готується за 2-4 хвилини",
  "Живий смак — соус прилипає і розкривається",
  "Без консервантів, стабілізаторів і добавок",
];

const dry = [
  "Виготовлена промислово, без яєць",
  "Щільніша, менш ніжна текстура",
  "Готується 8-12 хвилин",
  "Нейтральний смак",
  "Може містити добавки",
];

const flourFacts = [
  {
    title: "Semola di grano duro",
    sub: "(крупного помолу)",
    points: [
      "Тверда пшениця крупного помолу — схожа на манку.",
      "Дає пасті характер, пружність і золотистий колір.",
      "Містить більше білка ніж звичайне борошно.",
      "Повільніше засвоюється — корисно для травлення.",
    ],
  },
  {
    title: "Semola rimacinata",
    sub: "(дрібного помолу)",
    points: [
      "Та сама тверда пшениця, але змелена дрібніше.",
      "Дає тісту ніжність і шовковистість.",
      "Разом з крупним помолом — ідеальний баланс текстури.",
    ],
  },
  {
    title: "Чому не звичайне борошно?",
    sub: "",
    points: [
      "Звичайне борошно з магазину — м'яка пшениця.",
      "Тверда пшениця (durum) — вищий вміст білка, нижчий глікемічний індекс, краще для травлення.",
      "Саме тому італійська паста — це не просто їжа.",
    ],
  },
];

const WhyFrescaSection = () => {
  return (
    <section id="why-fresca" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-3">
            Чому pasta fresca?
          </h2>
          <p className="font-heading italic text-gold text-lg md:text-xl">
            Не суха. Свіжа. Різниця відчутна.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#FDF0E8] border-2 border-primary/70 rounded-2xl p-7 shadow-sm">
            <h3 className="font-heading text-2xl font-bold text-primary mb-1">
              Pasta fresca
            </h3>
            <p className="font-body text-sm text-foreground/60 mb-5 italic">
              Mamma's Pasta
            </p>
            <ul className="space-y-3">
              {fresca.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <Check className="text-primary shrink-0 mt-0.5" size={18} />
                  <span className="font-body text-foreground/85 text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background border border-foreground/15 rounded-2xl p-7 shadow-sm">
            <h3 className="font-heading text-2xl font-bold text-foreground/70 mb-1">
              Суха паста з магазину
            </h3>
            <p className="font-body text-sm text-foreground/50 mb-5 italic">
              Промислова
            </p>
            <ul className="space-y-3">
              {dry.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <Minus className="text-foreground/40 shrink-0 mt-0.5" size={18} />
                  <span className="font-body text-foreground/65 text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="font-body italic text-foreground/75 text-base md:text-lg leading-relaxed">
            Ми не кажемо що суха паста погана. Ми просто знаємо що pasta fresca — інший рівень відчуттів. Спробуйте один раз — і ви зрозумієте.
          </p>
        </div>

        {/* Flour part */}
        <div className="text-center mb-10">
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-3">
            Наше борошно — не звичайне
          </h3>
          <p className="font-heading italic text-gold text-base md:text-lg mb-6">
            Semola di grano duro · Semola rimacinata
          </p>
          <p className="font-body text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Ми використовуємо два види італійського борошна — і це одна з головних причин, чому наша паста така особлива.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {flourFacts.map((fact, i) => (
            <div
              key={i}
              className="bg-[#FDF0E8] border border-gold/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <Wheat className="text-gold mb-3" size={28} />
              <h4 className="font-heading text-xl font-bold text-primary leading-tight">
                {fact.title}
              </h4>
              {fact.sub && (
                <p className="font-body text-sm text-foreground/60 italic mb-4">
                  {fact.sub}
                </p>
              )}
              {!fact.sub && <div className="mb-4" />}
              <ul className="space-y-2">
                {fact.points.map((p, j) => (
                  <li key={j} className="flex gap-2 items-start">
                    <span className="text-gold mt-1.5 shrink-0">•</span>
                    <span className="font-body text-foreground/80 text-sm leading-relaxed">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-5 max-w-3xl mx-auto">
          <p className="font-body text-foreground/85 text-sm md:text-base leading-relaxed italic">
            Це борошно не продається у звичайних супермаркетах. Ми завозимо його спеціально — бо якість починається з першого інгредієнта.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyFrescaSection;
