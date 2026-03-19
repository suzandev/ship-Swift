import React from "react";
import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import Services from "./Services/Services";
import TrustedBy from "./TrustedBy/TrustedBy";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <Services />
      <TrustedBy />
    </div>
  );
};

export default Home;
