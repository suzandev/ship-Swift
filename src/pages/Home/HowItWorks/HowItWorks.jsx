import { FaTruck } from "react-icons/fa";

const services = [
  {
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruck className="text-blue-500 dark:text-blue-400 text-4xl" />,
  },
  {
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruck className="text-green-500 dark:text-green-400 text-4xl" />,
  },
  {
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruck className="text-purple-500 dark:text-purple-400 text-4xl" />,
  },
  {
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruck className="text-orange-500 dark:text-orange-400 text-4xl" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6 md:px-12 lg:px-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-12">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
