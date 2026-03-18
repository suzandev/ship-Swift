export default function ServiceCard({
  title,
  description,
  Icon,
  color,
  highlight,
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg shadow-md p-6 bg-white dark:bg-gray-800 
      flex flex-col items-center text-center group
      transition-all duration-3000 ease-in-out ${
        highlight ? "border-2 border-green-500 dark:border-green-400" : ""
      }`}>
      {/* Ripple Background */}
      <span
        className="absolute w-0 h-0 bg-[#CAEB66] rounded-full 
        group-hover:w-[300%] group-hover:h-[300%] 
        transition-all duration-500 ease-out 
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></span>

      {/* Content */}
      <div className="relative z-10">
        <Icon className={`${color} text-4xl mb-4`} />

        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-800 dark:group-hover:text-black mb-2">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
