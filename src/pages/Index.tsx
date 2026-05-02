import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyFrescaSection from "@/components/WhyFrescaSection";
import ProductsSection from "@/components/ProductsSection";
import PricesSection from "@/components/PricesSection";
import HowToOrderSection from "@/components/HowToOrderSection";
import SaucesSection from "@/components/SaucesSection";
import LasagnaSection from "@/components/LasagnaSection";
import CookingSection from "@/components/CookingSection";
import StorageSection from "@/components/StorageSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import ItalianDivider from "@/components/ItalianDivider";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ItalianDivider phrase="Pasta fresca" />
      <AboutSection />
      <ItalianDivider phrase="La differenza" flip />
      <WhyFrescaSection />
      <ItalianDivider phrase="Buon appetito" flip />
      <ProductsSection />
      <ItalianDivider phrase="Listino prezzi" flip />
      <PricesSection />
      <ItalianDivider phrase="Come ordinare" />
      <HowToOrderSection />
      <ItalianDivider phrase="Al dente" />
      <SaucesSection />
      <ItalianDivider phrase="Che buono!" flip />
      <LasagnaSection />
      <ItalianDivider phrase="Delizioso" />
      <CookingSection />
      <ItalianDivider phrase="Con amore" flip />
      <StorageSection />
      <ItalianDivider phrase="Ciao bella" />
      <FaqSection />
      <ItalianDivider phrase="Mangia bene" flip />
      <ContactSection />
      <BackToTop />
    </div>
  );
};

export default Index;
