import React from "react";
import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import Services from "./Services/Services";
import TrustedBy from "./TrustedBy/TrustedBy";
import OurServices from "./OurServices/OurServices";
import CustomersSayings from "./Testimonials/CustomersSayings";
import FaqSection from "./Faq/FaqSection";
import BeARider from "../BeARider/BeARider";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <Services />
      <TrustedBy />
      <OurServices />
      <CustomersSayings />
      <FaqSection />
      <BeARider />
    </div>
  );
};

export default Home;
