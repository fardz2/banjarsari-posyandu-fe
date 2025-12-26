import FeatureSection from "../../components/landing/feature";
import Footer from "../../components/landing/footer";
import HeroSection from "../../components/landing/hero";
import RegistrationFlow from "../../components/landing/registration-flow";
import ServicesSection from "../../components/landing/service";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans selection:bg-black selection:text-white">
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <ServicesSection />
        <RegistrationFlow />
        {/* <FAQSection /> */}
        {/* <ContactSection /> */}
      </main>
      <Footer />
    </div>
  );
}
