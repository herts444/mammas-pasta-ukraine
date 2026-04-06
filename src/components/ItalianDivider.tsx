const phrases = [
  "Pasta fresca",
  "Buon appetito",
  "Al dente",
  "Che buono!",
  "Ciao bella",
  "Mangia bene",
  "Con amore",
  "Delizioso",
];

const ItalianDivider = ({ phrase, flip = false }: { phrase?: string; flip?: boolean }) => {
  const text = phrase || phrases[Math.floor(Math.random() * phrases.length)];
  return (
    <div className={`py-6 flex items-center justify-center gap-4 select-none ${flip ? "flex-row-reverse" : ""}`}>
      <span className="h-px flex-1 max-w-[80px] bg-primary/[0.08]" />
      <span className="font-heading italic text-gold text-base sm:text-lg tracking-wide">{text}</span>
      <span className="h-px flex-1 max-w-[80px] bg-primary/[0.08]" />
    </div>
  );
};

export default ItalianDivider;
