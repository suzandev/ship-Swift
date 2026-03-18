import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

const Banner = () => {
  const slides = [
    {
      img: bannerImg1,
      title: "Parcel Arrives On Time",
      subtitle: "Reliable, fast, and safe delivery at your doorstep.",
      cta: "Track Your Parcel",
    },
    {
      img: bannerImg2,
      title: "Fastest Delivery & Easy Pickup",
      subtitle: "Schedule pickups with just a few clicks.",
      cta: "Book Pickup",
    },
    {
      img: bannerImg3,
      title: "30 Minutes at Your Doorstep",
      subtitle: "Speedy service without compromise.",
      cta: "Get Started",
    },
  ];

  return (
    <div className="relative py-5 md:py-16">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={1000}
        emulateTouch>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="object-cover w-full "
            />

            {/* Animated Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4 md:px-8">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                {slide.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-white text-sm md:text-lg mb-5 drop-shadow-md">
                {slide.subtitle}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="bg-[#CAEB66] text-black px-5 py-2 rounded-lg font-semibold hover:scale-105 transition-transform">
                {slide.cta}
              </motion.button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
