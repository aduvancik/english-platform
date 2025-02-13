import React from "react";
import Navigation from "../components/Navigation/Navigation";
import HeroSection from "../components/HeroSection/HeroSection";
import BenefitsSection from "../components/BenefitsSection/BenefitsSection";
import ChooseRoleSection from "../components/ChooseRoleSection/ChooseRoleSection";
import GetStarted from "../components/GetStartedSection/GetStartedSection";
import FAQSection from "../components/FAQSection/FAQSection";
import Footer from "../components/Footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navigation />

      <HeroSection />
      <div className="mx-84">
        <BenefitsSection />
        <ChooseRoleSection />
        <GetStarted />
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
