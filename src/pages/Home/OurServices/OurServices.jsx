// components/OurServices.tsx
import React from "react";

// Import your images from assets
import trackingImg from "../../../assets/tracking/live-tracking.png";
import safeDeliveryImg from "../../../assets/tracking/safe-delivery.png";
import supportImg from "../../../assets/tracking/safe-delivery.png";
import bannerImg from "../../../assets/tracking/location-merchant.png";

const services = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    img: trackingImg,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    img: safeDeliveryImg,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    img: supportImg,
  },
];

const OurServices = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        {/* Services Grid */}
        <div className="flex flex-col space-y-8">
          {services.map((service, idx) => {
            const isEven = idx % 2 !== 0; // For 2nd service
            return (
              <div
                key={service.id}
                className={`flex flex-col md:flex-row items-center md:items-start p-6 rounded-xl shadow hover:shadow-lg transition duration-300 bg-gray-50 dark:bg-gray-900 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}>
                {/* Service Image */}
                <div
                  className={`md:w-1/5 flex justify-center md:justify-start ${
                    isEven ? "md:justify-end" : ""
                  }`}>
                  <div
                    className={`${
                      isEven
                        ? "border-l-2 border-dashed border-gray-300 pl-4 md:pl-6"
                        : "border-r-2 border-dashed border-gray-300 pr-4 md:pr-6"
                    }`}>
                    <img
                      src={service.img}
                      alt={service.title}
                      className="h-32 w-auto object-contain bg-[#CAEB66]"
                    />
                  </div>
                </div>

                {/* Service Text */}
                <div
                  className={`md:w-4/5 mt-6 md:mt-0 md:ml-3 text-left ${
                    isEven ? "md:text-left md:mr-6" : "md:ml-0"
                  }`}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Section */}
        <div className="mt-16 flex flex-col md:flex-row rounded-2xl overflow-hidden bg-indigo-600">
          {/* Left Content */}
          <div className="md:w-1/2 p-10 text-white flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Merchant and Customer Satisfaction is Our First Priority
            </h2>
            <p className="mb-8 text-sm md:text-base">
              We offer the lowest delivery charges with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-5 py-2 bg-[#CAEB66] text-indigo-700 font-semibold rounded-lg shadow hover:bg-[#bcd867] transition ">
                Become a Merchant
              </button>
              <button className="px-5 py-2 bg-indigo-800 text-white font-semibold rounded-lg shadow hover:bg-indigo-900 transition">
                Earn with ZapShift Courier
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 relative">
            <img
              src={bannerImg}
              alt="Courier banner"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
