import nonnaMascot from "@/assets/nonna-mascot.png";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#FDF0E8" }}
    >
      <div className="container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left space-y-6 max-w-xl">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-primary leading-[0.95] tracking-tight animate-fade-up"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            MAMMA'S
            <br />
            PASTA
          </h1>

          <p
            className="text-2xl sm:text-3xl font-heading font-semibold text-foreground opacity-0 animate-fade-up"
            style={{ animationDelay: "0.12s" }}
          >
            Для тих, кого ami 🫰
          </p>

          <p
            className="text-base sm:text-lg font-body text-muted-foreground opacity-0 animate-fade-up"
            style={{ animationDelay: "0.24s" }}
          >
            Pasta fresca · Свіжа італійська паста
          </p>

          <p
            className="text-lg sm:text-xl font-heading italic text-gold opacity-0 animate-fade-up"
            style={{ animationDelay: "0.36s" }}
          >
            "Mangia bene, ridi spesso, ama molto"
          </p>

          <div
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: "0.48s" }}
          >
            <button
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-4 px-8 py-3.5 bg-primary text-primary-foreground font-body font-semibold text-base rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
            >
              Наша паста
            </button>
          </div>
        </div>

        {/* Nonna mascot placeholder */}
        <div
          className="flex-1 flex items-center justify-center opacity-0 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <img
            src={nonnaMascot}
            alt="Nonna — маскот Mamma's Pasta"
            className="w-96 sm:w-[30rem] h-auto drop-shadow-lg mix-blend-multiply"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
