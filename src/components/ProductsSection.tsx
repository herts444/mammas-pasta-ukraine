import { useState, useEffect, useRef } from "react";
import { Clock, Snowflake, UtensilsCrossed } from "lucide-react";
import pastaTagliatelle from "@/assets/pasta-tagliatelle.jpg";
import pastaTagliolini from "@/assets/pasta-tagliolini.jpg";
import pastaSpaghetti from "@/assets/pasta-spaghetti.jpg";
import pastaMafaldine from "@/assets/pasta-mafaldine.jpg";
import pastaLasagna from "@/assets/pasta-lasagna.jpg";
import pastaGnocchi from "@/assets/pasta-gnocchi.jpg";
import pastaRavioli from "@/assets/pasta-ravioli.jpg";

/* ── Reveal hook ── */
function useReveal(threshold = 0.15) {
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

/* ── Data ── */
interface PastaProduct {
  name: string;
  italian?: string;
  description: string;
  ingredients: string;
  cooking: string;
  storage: string;
  sauces?: string[];
  emoji: string;
  image: string;
}

interface RavioliFilling {
  name: string;
  ingredients: string;
  sauces: string[];
}

const pastas: PastaProduct[] = [
  {
    name: "Tagliatelle", italian: "Tagliatelle all'uovo", emoji: "🍝", image: pastaTagliatelle,
    description: "Широка плоска яєчна паста з Емілія-Романья. За легендою, її форму у 1487 році придумав кухар, натхненний золотим волоссям Лукреції Борджіа. Чудово тримає густі соуси.",
    ingredients: "Semola di grano duro, semola rimacinata, яйця, оливкова олія, сіль.",
    cooking: "3 хвилини", storage: "Холодильник 5-7 днів · Морозилка 2 місяці",
    sauces: ["Bolognese", "Грибний вершковий", "Грибний з м'ясом", "Вершковий з пармезаном"],
  },
  {
    name: "Tagliolini", italian: "Tagliolini freschi", emoji: "🍜", image: pastaTagliolini,
    description: "Тонка, делікатна сестра тальятелле. З П'ємонту та Лігурії. Потребує легких, елегантних соусів.",
    ingredients: "Semola di grano duro, semola rimacinata, яйця, оливкова олія, сіль.",
    cooking: "2 хвилини", storage: "Холодильник 5-7 днів · Морозилка 2 місяці",
    sauces: ["Вершковий з пармезаном", "З креветками", "З мідіями", "Aglio e Olio"],
  },
  {
    name: "Spaghetti", italian: "Spaghetti freschi", emoji: "🍝", image: pastaSpaghetti,
    description: "Найвідоміша паста у світі. Родом з півдня Італії. Головне правило справжньої carbonara — ніяких вершків.",
    ingredients: "Semola di grano duro, semola rimacinata, яйця, оливкова олія, сіль.",
    cooking: "3-4 хвилини", storage: "Холодильник 5-7 днів · Морозилка 2 місяці",
    sauces: ["Carbonara", "Amatriciana", "Aglio e Olio", "Arrabbiata", "Marinara"],
  },
  {
    name: "Mafaldine", italian: "Reginette", emoji: "👑", image: pastaMafaldine,
    description: "Широка стрічка з хвилястими краями. Названа на честь принцеси Мафальди Савойської. Інша назва — Reginette (маленькі королеви).",
    ingredients: "Semola di grano duro, semola rimacinata, яйця, оливкова олія, сіль.",
    cooking: "4 хвилини", storage: "Холодильник 5-7 днів · Морозилка 2 місяці",
    sauces: ["Bolognese", "Грибний з м'ясом", "Amatriciana"],
  },
  {
    name: "Lasagna Sheets", italian: "Sfoglia per lasagna", emoji: "🧈", image: pastaLasagna,
    description: "Листи зі свіжого яєчного тіста — тонкі, еластичні, добре вбирають соус.",
    ingredients: "Semola di grano duro, semola rimacinata, яйця, оливкова олія, сіль.",
    cooking: "2-3 хвилини або сирими (+15 хв запікання)", storage: "Холодильник 5-7 днів · Морозилка 2 місяці",
  },
  {
    name: "Gnocchi", italian: "Gnocchi di patate", emoji: "🥔", image: pastaGnocchi,
    description: "Картопляні галушки з борошном найдрібнішого помелу. Надзвичайно ніжна текстура. Порада: підсмажити на вершковому маслі після варіння.",
    ingredients: "Картопля, борошно тонкого помелу, сіль.",
    cooking: "2-3 хвилини з морозилки, готові щойно спливли", storage: "Морозилка 2 місяці",
    sauces: ["Burro e Salvia", "Вершковий з пармезаном", "Томатний"],
  },
];

const ravioliFillings: RavioliFilling[] = [
  { name: "Рікота та шпинат", ingredients: "рікота, шпинат, яйце, цедра лимону, мускатний горіх, сіль, чорний перець", sauces: ["Burro e Salvia", "Burro e Parmigiano"] },
  { name: "Білий гриб", ingredients: "білий гриб сушений, шампіньйони, цибуля, часник, пармезан, чорний перець, сіль", sauces: ["Вершковий трюфельний", "Burro e Parmigiano"] },
  { name: "Яловичина", ingredients: "яловичина, цибуля, часник, морква, селера, яйце, мускатний горіх, чорний перець, сіль", sauces: ["Burro e Salvia", "Томатний"] },
];

/* ── Detail row ── */
const DetailRow = ({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) => (
  <div className="flex items-start gap-2.5 text-sm">
    <Icon size={16} className="text-primary/50 mt-0.5 shrink-0" />
    <div>
      <span className="font-semibold text-foreground/60 text-xs uppercase tracking-wide">{label}</span>
      <p className="text-foreground/80 mt-0.5">{value}</p>
    </div>
  </div>
);

/* ── Pasta Card ── */
const PastaCard = ({ pasta, index }: { pasta: PastaProduct; index: number }) => (
  <RevealBlock delay={index * 80} className="h-full">
    <div className="group bg-background rounded-2xl border border-primary/[0.07] shadow-sm shadow-primary/[0.03] hover:shadow-lg hover:shadow-primary/[0.06] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 h-full flex flex-col overflow-hidden">
      {/* Product image */}
      <div className="h-48 overflow-hidden">
        <img src={pasta.image} alt={pasta.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      {/* Header */}
      <div className="px-6 pt-4 pb-3">
        <h3 className="text-2xl font-heading font-bold text-foreground">{pasta.name}</h3>
        {pasta.italian && (
          <p className="font-heading italic text-gold text-sm mt-1">{pasta.italian}</p>
        )}
      </div>

      {/* Body */}
      <div className="px-6 py-5 flex-1 flex flex-col gap-5">
        <p className="text-sm leading-relaxed text-foreground/75">{pasta.description}</p>

        <div className="space-y-4">
          <DetailRow icon={UtensilsCrossed} label="Інгредієнти" value={pasta.ingredients} />
          <DetailRow icon={Clock} label="Варити" value={pasta.cooking} />
          <DetailRow icon={Snowflake} label="Зберігання" value={pasta.storage} />
        </div>

        {pasta.sauces && pasta.sauces.length > 0 && (
          <div className="mt-auto pt-4 border-t border-primary/[0.05]">
            <p className="text-xs uppercase tracking-wide font-semibold text-foreground/50 mb-2">Рекомендовані соуси</p>
            <div className="flex flex-wrap gap-1.5">
              {pasta.sauces.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-primary/[0.06] text-foreground/70 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </RevealBlock>
);

/* ── Ravioli Card ── */
const RavioliCard = ({ index }: { index: number }) => {
  const [activeFilling, setActiveFilling] = useState(0);
  const filling = ravioliFillings[activeFilling];

  return (
    <RevealBlock delay={index * 80} className="h-full">
      <div className="group bg-background rounded-2xl border border-primary/[0.07] shadow-sm shadow-primary/[0.03] hover:shadow-lg hover:shadow-primary/[0.06] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 h-full flex flex-col overflow-hidden">
        {/* Product image */}
        <div className="h-48 overflow-hidden">
          <img src={pastaRavioli} alt="Ravioli" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        {/* Header */}
        <div className="px-6 pt-4 pb-3">
          <h3 className="text-2xl font-heading font-bold text-foreground">Ravioli</h3>
          <p className="font-heading italic text-gold text-sm mt-1">Ravioli fatti a mano</p>
        </div>

        {/* Filling tabs */}
        <div className="px-6 pt-4">
          <p className="text-xs uppercase tracking-wide font-semibold text-foreground/50 mb-2">Начинка</p>
          <div className="flex flex-wrap gap-1.5">
            {ravioliFillings.map((f, i) => (
              <button
                key={f.name}
                onClick={() => setActiveFilling(i)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 active:scale-95 ${
                  i === activeFilling
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-primary/[0.06] text-foreground/70 hover:bg-primary/[0.12]"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex-1 flex flex-col gap-5">
          <div className="space-y-4">
            <DetailRow icon={UtensilsCrossed} label="Тісто" value="Farina 00, яйця, оливкова олія, сіль." />
            <DetailRow icon={UtensilsCrossed} label="Начинка" value={filling.ingredients} />
            <DetailRow icon={Clock} label="Варити" value="4-6 хвилин з морозилки, діставати шумівкою" />
          </div>

          <div className="mt-auto pt-4 border-t border-primary/[0.05]">
            <p className="text-xs uppercase tracking-wide font-semibold text-foreground/50 mb-2">Рекомендовані соуси</p>
            <div className="flex flex-wrap gap-1.5">
              {filling.sauces.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-primary/[0.06] text-foreground/70 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RevealBlock>
  );
};

/* ── Section ── */
const ProductsSection = () => {
  return (
    <section id="products" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <RevealBlock>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-primary text-center mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
            Наша паста
          </h2>
          <p className="font-heading italic text-gold text-center text-lg mb-4">
            La nostra pasta
          </p>
          <p className="text-center text-foreground/60 font-body max-w-lg mx-auto mb-14">
            Кожен вид — це окрема історія, традиція і характер. Свіжа, ручної роботи, з найкращих інгредієнтів.
          </p>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {pastas.map((pasta, i) => (
            <PastaCard key={pasta.name} pasta={pasta} index={i} />
          ))}
          <RavioliCard index={pastas.length} />
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
