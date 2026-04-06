import { useState, useEffect, useRef } from "react";
import { ChevronDown, Flame, Leaf, Fish, Beef } from "lucide-react";

/* ── Reveal ── */
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

const RevealBlock = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        filter: visible ? "blur(0)" : "blur(3px)",
        transitionProperty: "opacity, transform, filter",
        transitionDuration: "600ms",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
};

/* ── Data ── */
interface Recipe {
  name: string;
  italian?: string;
  ingredients: string;
  substitute?: string;
  steps: string[];
  note?: string;
}

interface RecipeGroup {
  title: string;
  icon: typeof Flame;
  recipes: Recipe[];
}

const groups: RecipeGroup[] = [
  {
    title: "Прості соуси",
    icon: Flame,
    recipes: [
      {
        name: "Aglio e Olio",
        italian: "Часник та олія",
        ingredients: "часник (4-5 зубчиків), оливкова олія extra virgin (100мл), пеперончино, петрушка, сіль",
        substitute: "пеперончино = суха гостра паприка або чилі",
        steps: ["Наріжте часник тонкими пластинами", "Розігрійте олію, додайте часник і пеперончино до золотистого кольору", "Додайте пасту з крохмальною водою", "Посипте петрушкою"],
      },
      {
        name: "Burro e Salvia",
        italian: "Масло та шавлія",
        ingredients: "вершкове масло (80г), шавлія свіжа (8-10 листків), пармезан, сіль, чорний перець",
        substitute: "шавлія = розмарин або чебрець. Або просто Burro e Parmigiano — масло + пармезан",
        steps: ["Розтопіть масло до золотистого кольору", "Додайте шавлію — до хрусткості", "Додайте пасту, перемішайте", "Посипте пармезаном і перцем"],
      },
      {
        name: "Cacio e Pepe",
        italian: "Сир та перець",
        ingredients: "пекоріно романо (100г), пармезан (50г), чорний перець свіжомелений, крохмальна вода",
        substitute: "пекоріно = пармезан або твердий солоний сир. Сир має бути дрібно натертий, кімнатної температури",
        steps: ["Обсмажте перець на сухій сковороді 30 сек", "Додайте крохмальну воду", "Додайте пасту, потім сир порціями", "Постійно мішайте до кремового соусу"],
      },
      {
        name: "Pomodoro fresco",
        italian: "Свіжий томатний",
        ingredients: "стиглі томати (500г), часник (2 зубчики), базилік, оливкова олія, сіль",
        substitute: "взимку — консервовані томати у власному соку",
        steps: ["Зніміть шкірку з томатів", "Обсмажте часник, додайте томати", "Тушкуйте 15 хвилин", "Додайте базилік"],
      },
    ],
  },
  {
    title: "Томатні соуси",
    icon: Flame,
    recipes: [
      {
        name: "Marinara",
        ingredients: "консервовані томати San Marzano (400г), часник (3 зубчики), оливкова олія, орегано, базилік, сіль",
        substitute: "San Marzano = будь-які консервовані томати у власному соку без добавок",
        steps: ["Обсмажте часник", "Додайте томати, подрібніть руками", "Додайте орегано, тушкуйте 20 хвилин", "Додайте базилік"],
      },
      {
        name: "Arrabbiata",
        italian: "«Злий» соус 🌶",
        ingredients: "консервовані томати (400г), часник (3 зубчики), пеперончино, оливкова олія, петрушка, сіль",
        note: "Як Marinara, але гостріше. «Arrabbiata» = злий 🌶",
        steps: ["Обсмажте часник з пеперончино", "Додайте томати, подрібніть", "Тушкуйте 20 хвилин", "Посипте петрушкою"],
      },
      {
        name: "Amatriciana",
        ingredients: "гуанчале або бекон (150г), консервовані томати (400г), пекоріно або пармезан, біле вино (50мл), пеперончино, сіль",
        substitute: "гуанчале = панчетта = копчений бекон",
        steps: ["Обсмажте бекон до хрусткості", "Додайте пеперончино, вино — випаруйте", "Додайте томати, тушкуйте 20 хвилин", "Подавайте з пармезаном"],
      },
    ],
  },
  {
    title: "Вегетаріанські",
    icon: Leaf,
    recipes: [
      {
        name: "Pesto alla Genovese",
        ingredients: "базилік (50г), пармезан (50г), пекоріно (25г), кедрові горіхи (30г), часник (1 зубчик), оливкова олія (100мл), сіль",
        substitute: "кедрові горіхи = волоські або кеш'ю",
        steps: ["Подрібніть базилік, часник, горіхи в блендері", "Додайте сири", "Поступово вливайте олію", "Не нагрівати — додавати до теплої пасти"],
      },
      {
        name: "Грибний вершковий",
        ingredients: "шампіньйони або білий гриб (300г), вершки 30% (200мл), часник (2 зубчики), вершкове масло, пармезан, петрушка, сіль, перець",
        substitute: "вершки 30% = вершки 20% або вершковий сир з молоком",
        steps: ["Обсмажте гриби до золотистого", "Додайте часник", "Влийте вершки, тушкуйте 5-7 хвилин", "Додайте пармезан"],
      },
      {
        name: "Alfredo",
        ingredients: "вершкове масло (80г), пармезан (100г), вершки 30% (100мл), сіль, перець, мускатний горіх",
        steps: ["Розтопіть масло, додайте вершки", "Зніміть з вогню, додайте пармезан порціями", "Додайте пасту, мускатний горіх, перець"],
      },
    ],
  },
  {
    title: "М'ясні соуси",
    icon: Beef,
    recipes: [
      {
        name: "Ragù alla Bolognese",
        ingredients: "яловичий фарш (300г), свинячий фарш (200г), цибуля (1), морква (1), селера (1 стебло), консервовані томати (400г), томатна паста (2 ст.л.), червоне вино (150мл), молоко (100мл), оливкова олія, лавровий лист, сіль, перець",
        substitute: "суміш фаршів = тільки яловичина. Вино = яловичий бульйон. Молоко не пропускати — пом'якшує кислоту томатів",
        steps: ["Обсмажте цибулю, моркву, селеру (soffritto)", "Додайте фарш, смажте до рум'яності", "Влийте вино — випаруйте", "Додайте томати, пасту, лавровий лист", "Тушкуйте мінімум 2 години", "За 15 хвилин до кінця додайте молоко"],
        note: "Справжній болоньєзе — мінімум 2-3 години ⏱️",
      },
      {
        name: "Carbonara",
        ingredients: "гуанчале або бекон (150г), яйця (2 цілих + 2 жовтки), пекоріно або пармезан (100г), чорний перець, сіль",
        note: "⚠️ ВАЖЛИВО: ніяких вершків! Тільки яйця + сир + жир від м'яса",
        steps: ["Збийте яйця з сиром і перцем", "Обсмажте бекон, зніміть з вогню", "Додайте гарячу пасту до сковороди (вогонь вимкнений!)", "Додайте яєчну суміш, швидко мішайте", "Додайте крохмальну воду якщо треба"],
      },
      {
        name: "Грибний з м'ясом",
        ingredients: "яловичина або свинина (300г), шампіньйони (250г), цибуля (1), вершки 30% (150мл), часник, тим'ян, сіль, перець",
        steps: ["Обсмажте м'ясо до рум'яності", "Додайте цибулю, часник, гриби", "Влийте вершки, тушкуйте 15-20 хвилин", "Додайте тим'ян"],
      },
    ],
  },
  {
    title: "З морепродуктами",
    icon: Fish,
    recipes: [
      {
        name: "З мідіями",
        ingredients: "мідії (500г свіжих або 300г заморожених), часник (3 зубчики), біле вино (100мл), консервовані томати (200г) або вершки (150мл), оливкова олія, петрушка, сіль, пеперончино",
        steps: ["Обсмажте часник з пеперончино", "Додайте мідії, влийте вино — накрийте на 3-5 хвилин", "Додайте томати або вершки, тушкуйте 5 хвилин", "Посипте петрушкою"],
      },
      {
        name: "З креветками",
        ingredients: "креветки очищені (400г), часник (3 зубчики), вершки або томати, біле вино (50мл), оливкова олія, лимон, петрушка, сіль, перець",
        substitute: "вино = лимонний сік (1 ст.л.)",
        steps: ["Обсмажте часник", "Додайте креветки 2-3 хвилини до рожевого", "Влийте вино, випаруйте", "Додайте вершки або томати", "Збризніть лимоном"],
      },
    ],
  },
];

/* ── Recipe Accordion Item ── */
const RecipeItem = ({ recipe, delay }: { recipe: Recipe; delay: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <RevealBlock delay={delay}>
      <div className="border border-primary/[0.07] rounded-xl overflow-hidden bg-background shadow-sm shadow-primary/[0.02]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-primary/[0.02] active:scale-[0.995] transition-all duration-200"
        >
          <div>
            <span className="text-lg font-heading font-semibold text-foreground">{recipe.name}</span>
            {recipe.italian && (
              <span className="ml-2 font-heading italic text-gold text-sm">{recipe.italian}</span>
            )}
          </div>
          <ChevronDown
            size={20}
            className={`text-foreground/40 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className="overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: open ? "800px" : "0", opacity: open ? 1 : 0 }}
        >
          <div className="px-5 pb-5 space-y-4 border-t border-primary/[0.05] pt-4">
            {/* Ingredients */}
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-foreground/50 mb-1">Інгредієнти</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{recipe.ingredients}</p>
            </div>

            {/* Substitute */}
            {recipe.substitute && (
              <div className="bg-accent/10 rounded-lg px-4 py-3">
                <p className="text-xs uppercase tracking-wide font-semibold text-gold mb-1">🇺🇦 Українська заміна</p>
                <p className="text-sm text-foreground/75">{recipe.substitute}</p>
              </div>
            )}

            {/* Note */}
            {recipe.note && (
              <div className="bg-primary/[0.04] rounded-lg px-4 py-3">
                <p className="text-sm text-foreground/80 font-medium">{recipe.note}</p>
              </div>
            )}

            {/* Steps */}
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-foreground/50 mb-2">Покроково</p>
              <ol className="space-y-2">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="w-6 h-6 rounded-full bg-primary/[0.08] text-primary font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </RevealBlock>
  );
};

/* ── Section ── */
const SaucesSection = () => {
  return (
    <section id="sauces" className="py-24 sm:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <RevealBlock>
          <h2
            className="text-4xl sm:text-5xl font-heading font-bold text-primary text-center mb-3"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Рецепти соусів
          </h2>
          <p className="font-heading italic text-gold text-center text-lg mb-4">Le salse</p>
          <p className="text-center text-foreground/60 font-body max-w-lg mx-auto mb-14">
            15 автентичних італійських соусів з українськими замінами інгредієнтів.
          </p>
        </RevealBlock>

        <div className="space-y-12">
          {groups.map((group) => (
            <div key={group.title}>
              <RevealBlock>
                <div className="flex items-center gap-2.5 mb-5">
                  <group.icon size={20} className="text-primary/60" />
                  <h3 className="text-xl font-heading font-bold text-foreground">{group.title}</h3>
                </div>
              </RevealBlock>
              <div className="space-y-3">
                {group.recipes.map((recipe, i) => (
                  <RecipeItem key={recipe.name} recipe={recipe} delay={i * 60} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaucesSection;
