import React from "react";
import Marquee from "react-fast-marquee";

// Import logos
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";

const TrustedBy = () => {
  const logos = [
    { id: 1, name: "Casio", src: casio },
    { id: 2, name: "Amazon", src: amazon },
    { id: 3, name: "Moonstar", src: moonstar },
    { id: 4, name: "Amazon Vector", src: amazon_vector },
    { id: 5, name: "randstad", src: randstad },
    { id: 6, name: "star", src: star },
    { id: 7, name: "start_people", src: start_people },
  ];

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-10">
          We've helped thousands of sales teams
        </h3>

        {/* ✅ FIXED MARQUEE */}
        <Marquee.default
          speed={40}
          pauseOnHover
          gradient
          gradientColor={isDark ? [20, 20, 20] : [250, 250, 250]}
          gradientWidth={80}>
          <div className="flex items-center gap-12 md:gap-16 lg:gap-20 px-4">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="flex items-center justify-center  transition-all duration-300 min-w-[100px] filter  dark:brightness-200 dark:contrast-125">
                <img
                  src={
                    typeof logo.src === "string" ? logo.src : logo.src?.default
                  }
                  alt={logo.name}
                  className="h-8 md:h-10 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Marquee.default>

        <div className="mt-10 border-t border-dashed border-gray-300 dark:border-gray-700"></div>
      </div>
    </section>
  );
};

export default TrustedBy;
