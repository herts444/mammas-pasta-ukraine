import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "hero", label: "Головна" },
  { id: "about", label: "Про нас" },
  { id: "products", label: "Наша паста" },
  { id: "sauces", label: "Соуси" },
  { id: "lasagna", label: "Лазанья" },
  { id: "cooking", label: "Як варити" },
  { id: "storage", label: "Зберігання" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Замовити" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => scrollTo("hero")}
          className="font-heading text-xl font-bold text-primary tracking-wide"
        >
          MAMMA'S PASTA
        </button>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-6">
          {sections.slice(1).map((s) => (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className="text-sm font-body font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground p-2 active:scale-95 transition-transform"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <ul className="container mx-auto px-6 py-4 flex flex-col gap-3">
            {sections.slice(1).map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  className="w-full text-left py-2 text-base font-body font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
