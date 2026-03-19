import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { RiArrowRightUpLongLine } from "react-icons/ri";

const faqData = [
  {
    id: 1,
    question: "How does ShipSwift delivery work?",
    answer:
      "ShipSwift connects you with reliable courier services to deliver packages quickly and securely. Simply place your order, choose your delivery option, and track your shipment in real-time.",
  },
  {
    id: 2,
    question: "Is ShipSwift available nationwide?",
    answer:
      "Yes, ShipSwift operates across major cities and regions, ensuring fast and efficient delivery services wherever you are.",
  },
  {
    id: 3,
    question: "Can I track my shipment?",
    answer:
      "Absolutely! You will receive a tracking ID that allows you to monitor your shipment status live from pickup to delivery.",
  },
  {
    id: 4,
    question: "Do you offer same-day delivery?",
    answer:
      "Yes, same-day delivery is available in selected areas depending on courier availability and distance.",
  },
  {
    id: 5,
    question: "How will I be notified about my delivery?",
    answer:
      "You will receive notifications via SMS or email regarding your shipment status, including pickup and delivery updates.",
  },
];

const FaqSection = () => {
  const [activeId, setActiveId] = useState(1);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about ShipSwift delivery services.
        </p>
      </div>

      {/* FAQ Container */}
      <div className="max-w-3xl mx-auto mt-10 space-y-4">
        {faqData.map((faq) => (
          <div
            key={faq.id}
            className={`rounded-xl border transition-all duration-300 ${
              activeId === faq.id
                ? "border-green-500 bg-green-50 dark:bg-gray-800"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            }`}>
            {/* Question */}
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full flex justify-between items-center p-5 text-left">
              <span className="font-medium text-gray-800 dark:text-white">
                {faq.question}
              </span>

              <FiChevronDown
                className={`text-xl transition-transform duration-300 ${
                  activeId === faq.id ? "rotate-180 text-green-500" : ""
                }`}
              />
            </button>

            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeId === faq.id ? "max-h-40 px-5 pb-5" : "max-h-0"
              }`}>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center items-center mt-10">
        <button className="flex items-center gap-2 bg-[#CAEB66] hover:bg-[#98b04d] text-black px-6 py-3 rounded-full transition">
          See More FAQ's
        </button>
        <button className="p-3 bg-black text-[#CAEB66] rounded-full hover:rotate-45 transition-transform duration-300">
          <RiArrowRightUpLongLine size={18} />
        </button>
      </div>
    </section>
  );
};

export default FaqSection;
