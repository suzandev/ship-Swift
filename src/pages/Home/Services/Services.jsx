import {
  FaShippingFast,
  FaGlobeAsia,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in major cities. Express delivery available in Dhaka within 4–6 hours.",
    color: "text-blue-500 dark:text-blue-400",
    Icon: FaShippingFast,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring products reach customers within 48–72 hours.",
    color: "text-green-500 dark:text-green-400",
    Icon: FaGlobeAsia,
    highlight: true,
  },
  {
    title: "Fulfillment Solution",
    description:
      "Customized service with inventory management, online order processing, packaging, and after-sales support.",
    color: "text-purple-500 dark:text-purple-400",
    Icon: FaWarehouse,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed product safety.",
    color: "text-orange-500 dark:text-orange-400",
    Icon: FaMoneyBillWave,
  },
  {
    title: "Corporate Service / Contract Logistics",
    description:
      "Customized corporate services including warehouse and inventory management support.",
    color: "text-pink-500 dark:text-pink-400",
    Icon: FaBuilding,
  },
  {
    title: "Parcel Return",
    description:
      "Reverse logistics facility allowing customers to return or exchange products with merchants.",
    color: "text-indigo-500 dark:text-indigo-400",
    Icon: FaUndo,
  },
];

export default function Services() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6 md:px-12 lg:px-20 transition-colors duration-3000">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Our Services
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              color={service.color}
              Icon={service.Icon}
              highlight={service.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
