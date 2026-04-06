import { useState, useEffect, useRef } from "react";
import { Instagram, Mail, Phone, Send, Music2 } from "lucide-react";

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

const contacts = [
  { icon: Instagram, label: "@mammaspastaa", href: "https://www.instagram.com/mammaspastaa" },
  { icon: Music2, label: "TikTok", href: "https://www.tiktok.com/@mamaspastaa?_r=1&_t=ZS-94ypnTQ3xIW" },
  { icon: Phone, label: "Viber", href: "viber://chat?number=380508640148" },
  { icon: Send, label: "Telegram", href: "https://t.me/+380508640148" },
  { icon: Mail, label: "mammaspastaa@gmail.com", href: "mailto:mammaspastaa@gmail.com" },
];

const ContactSection = () => (
  <section id="contact" className="py-24 sm:py-32">
    <div className="container mx-auto px-6 max-w-3xl text-center">
      <Reveal>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
          Для замовлень та співпраці — пишіть нам
        </h2>
        <p className="font-heading italic text-gold text-lg mb-12">Contattaci</p>
      </Reveal>

      <Reveal delay={80}>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border border-primary/[0.08] bg-background shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 text-sm font-medium text-foreground/80 hover:text-primary"
            >
              <c.icon size={18} />
              <span>{c.label}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </div>

    {/* Footer */}
    <footer className="border-t border-primary/[0.06] mt-8">
      <div className="container mx-auto px-6 py-10 text-center space-y-3">
        <p className="text-lg font-heading font-semibold text-foreground">
          Casa, famiglia, pasta 🫰
        </p>
        <p className="font-heading italic text-gold text-sm">
          Mangia bene, ridi spesso, ama molto.
        </p>
        <p className="text-xs text-foreground/40 pt-2">
          © 2025 Mamma's Pasta · Pasta fresca · Для тих, кого ami
        </p>
      </div>
    </footer>
  </section>
);

export default ContactSection;
