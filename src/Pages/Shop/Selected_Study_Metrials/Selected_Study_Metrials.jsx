import Nav from "../../../Components/Common/Nav/Nav";
import Selected_Hero from "../../../Components/Shop_Components/Selected_Hero/Selected_Hero";
import Footer from "../../../Components/Common/Footer/Footer";
import ShopCard from "../../../Components/Shop_Components/Shop_Card/Shop_Card";
import LearnMoreSlider from "../../../Components/Shop_Components/Learn_More/LearnMore";
import BenefitsSection from "../../../Components/Shop_Components/BenefitsSection/BenefitsSection";
import CompareFormats from "../../../Components/Shop_Components/CompareFormats/CompareFormats";
import { KitProvider } from "../../../context/KitContext"; // Import the context provider

const Selected_Study_Metrials = () => {
  return (
    <KitProvider>
      <div>
        <Nav />
        <Selected_Hero />
        <ShopCard />
        {/* <BenefitsSection /> */}
        <LearnMoreSlider />
        {/* <CompareFormats /> */}
        <div>
          <br />
          <br />
          <br />
        </div>
        <Footer />
      </div>
    </KitProvider>
  );
};

export default Selected_Study_Metrials;
