import { Info } from "lucide-react";

const steps = [
  {
    title: "Напишіть нам",
    text: "Напишіть в Instagram або Telegram, оберіть пасту та кількість порцій.",
  },
  {
    title: "Отримайте підтвердження",
    text: "Ми підтвердимо замовлення і узгодимо дату відправки.",
  },
  {
    title: "Оплата 100%",
    text: "Оплата повна і одразу — це продукти харчування, які ми готуємо спеціально для вас.",
  },
  {
    title: "Отримайте пасту",
    text: "Звичайна паста — відправляємо напівсушеною, прямо з холодильника. Равіолі та ньокі — відправляємо замороженими у термобоксі.",
  },
];

const HowToOrderSection = () => {
  return (
    <section id="how-to-order" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-3">
            Як замовити
          </h2>
          <p className="font-heading italic text-gold text-lg md:text-xl">
            Просто. Швидко. З любов'ю.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-[#FDF0E8] border border-gold/40 rounded-2xl p-6 pt-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-5 left-6 w-11 h-11 rounded-full bg-primary text-background font-heading text-xl font-bold flex items-center justify-center shadow-md">
                {i + 1}
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">
                {step.title}
              </h3>
              <p className="font-body text-foreground/80 text-sm leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gold/15 border-l-4 border-gold rounded-lg p-5 flex gap-3 items-start max-w-3xl mx-auto">
          <Info className="text-gold shrink-0 mt-0.5" size={22} />
          <p className="font-body text-foreground/85 text-sm md:text-base leading-relaxed">
            Замовлення приймаємо мінімум за 24 години до відправки — паста готується свіжою спеціально для вас, щойно після замовлення. Ми не відправляємо готові залишки — тільки свіже.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToOrderSection;
