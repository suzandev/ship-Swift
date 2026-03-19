import React from "react";
import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import Services from "./Services/Services";
import TrustedBy from "./TrustedBy/TrustedBy";
import OurServices from "./OurServices/OurServices";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <Services />
      <TrustedBy />
      <OurServices />
    </div>
  );
};

export default Home;
