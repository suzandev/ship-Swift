import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Customer images
import customer1 from "../../../assets/customers/customer1.jpg";
import customer2 from "../../../assets/customers/customer2.jpg";
import customer3 from "../../../assets/customers/customer3.jpg";
import customer4 from "../../../assets/customers/customer4.jpg";
import customer5 from "../../../assets/customers/customer5.jpg";
import customer6 from "../../../assets/customers/customer6.jpg";
import customer7 from "../../../assets/customers/customer7.jpg";
import customer8 from "../../../assets/customers/customer8.jpg";
import customer9 from "../../../assets/customers/customer9.jpg";
import customer10 from "../../../assets/customers/customer10.jpg";
import customer11 from "../../../assets/customers/customer11.jpg";

// Customers logo
import customerLogo from "../../../assets/customers/customer-top.png";

// Icons
import icon1 from "../../../assets/customers/reviewQuote.png";
import icon2 from "../../../assets/customers/reviewQuote.png";
import icon3 from "../../../assets/customers/reviewQuote.png";

// Customer testimonials data
const testimonials = [
  {
    id: 1,
    icon: icon1,
    text: "ShipSwift made my online business deliveries faster and more reliable. Highly recommended!",
    authorImg: customer1,
    name: "Rafiq Ahmed",
    designation: "Small Business Owner",
  },
  {
    id: 2,
    icon: icon2,
    text: "The courier service is amazing! Always on time and safe delivery every time.",
    authorImg: customer2,
    name: "Sara Khan",
    designation: "E-commerce Seller",
  },
  {
    id: 3,
    icon: icon3,
    text: "I love tracking my parcels live. Gives me peace of mind and great customer experience.",
    authorImg: customer3,
    name: "Tanvir Hossain",
    designation: "Freelancer",
  },
  {
    id: 4,
    icon: icon1,
    text: "Excellent service! Friendly staff and very reliable deliveries.",
    authorImg: customer4,
    name: "Farhana Akter",
    designation: "Online Shop Owner",
  },
  {
    id: 5,
    icon: icon2,
    text: "Fast, safe, and convenient. ShipSwift always delivers as promised.",
    authorImg: customer5,
    name: "Imran Rafi",
    designation: "Startup Founder",
  },
  {
    id: 6,
    icon: icon3,
    text: "Their customer support is amazing! Always ready to help anytime.",
    authorImg: customer6,
    name: "Nabila Sultana",
    designation: "Entrepreneur",
  },
  {
    id: 7,
    icon: icon1,
    text: "Very reliable service. I can always trust ShipSwift with my shipments.",
    authorImg: customer7,
    name: "Anik Rahman",
    designation: "Online Retailer",
  },
  {
    id: 8,
    icon: icon2,
    text: "Fast deliveries and great support. Highly recommended for e-commerce.",
    authorImg: customer8,
    name: "Rina Akter",
    designation: "Shop Owner",
  },
  {
    id: 9,
    icon: icon3,
    text: "The tracking system is amazing! Makes my life so much easier.",
    authorImg: customer9,
    name: "Fahim Islam",
    designation: "Freelancer",
  },
  {
    id: 10,
    icon: icon1,
    text: "ShipSwift is my go-to courier service. Very trustworthy and fast.",
    authorImg: customer10,
    name: "Sadia Rahman",
    designation: "Small Business Owner",
  },
  {
    id: 11,
    icon: icon2,
    text: "Excellent customer support and safe deliveries every time!",
    authorImg: customer11,
    name: "Mamun Hossain",
    designation: "Startup Founder",
  },
];

const CustomersSayings = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Image, Title & Subtitle */}
        <img
          src={customerLogo}
          alt="Customer feedback"
          className="mx-auto  mb-4"
        />
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          What Our Customers Are Saying
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Hear directly from our happy customers who trust ShipSwift for
          reliable and fast deliveries.
        </p>

        {/* Swiper Carousel */}
        <div className="relative ">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 3000, // slide every 3 seconds
              disableOnInteraction: false, // continue auto-slide after manual navigation
            }}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="py-8">
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl p-6 shadow hover:shadow-lg transition">
                  <img
                    src={testimonial.icon}
                    alt="icon"
                    className="h-12 w-12 mb-4"
                  />
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 border-b-2 border-dashed border-gray-300 pb-4">
                    {testimonial.text}
                  </p>
                  <div className="flex justify-center items-center gap-4 mt-4">
                    <img
                      src={testimonial.authorImg}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mb-2"
                      loading="lazy"
                    />

                    <div className="flex flex-col justify-center items-center">
                      <h4 className="text-gray-900 dark:text-white font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10">
            <button className="swiper-button-prev p-3 bg-[#CAEB66] text-white rounded-full shadow hover:bg-[#b7c983] transition">
              &#8592;
            </button>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10">
            <button className="swiper-button-next p-3 bg-[#CAEB66] text-white rounded-full shadow hover:bg-[#b7c983] transition">
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomersSayings;
