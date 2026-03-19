import React, { useState } from "react";

// 👉 import your image here
import riderImg from "../../assets/tracking/agent-pending.png";

const BeARider = () => {
  const [formData, setFormData] = useState({
    name: "",
    license: "",
    email: "",
    region: "",
    district: "",
    nid: "",
    phone: "",
    bikeInfo: "",
    bikeReg: "",
    about: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit (for now only console.log)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rider Form Data:", formData);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 shadow">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Be a Rider
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-xl">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
              Tell us about yourself
            </h3>

            {/* Input Field Component */}
            {[
              {
                label: "Your Name",
                name: "name",
                type: "text",
                placeholder: "Your Name",
              },
              {
                label: "Driving License Number",
                name: "license",
                type: "text",
                placeholder: "Driving License Number",
              },
              {
                label: "Your Email",
                name: "email",
                type: "email",
                placeholder: "Your Email",
              },
            ].map((field, index) => (
              <div key={index}>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 
                  border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            ))}

            {/* Region */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Your Region
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 
                border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                required>
                <option value="">Select your Region</option>
                <option>Dhaka</option>
                <option>Chittagong</option>
                <option>Rajshahi</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Your District
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 
                border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                required>
                <option value="">Select your District</option>
                <option>Dhaka</option>
                <option>Gazipur</option>
                <option>Narayanganj</option>
              </select>
            </div>

            {/* More Inputs */}
            {[
              {
                label: "NID No",
                name: "nid",
                type: "text",
                placeholder: "NID",
              },
              {
                label: "Phone Number",
                name: "phone",
                type: "tel",
                placeholder: "Phone Number",
              },
              {
                label: "Bike Brand Model and Year",
                name: "bikeInfo",
                type: "text",
                placeholder: "Bike Brand Model and Year",
              },
              {
                label: "Bike Registration Number",
                name: "bikeReg",
                type: "text",
                placeholder: "Bike Registration Number",
              },
            ].map((field, index) => (
              <div key={index}>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 
                  border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            ))}

            {/* About */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Tell Us About Yourself
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Tell Us About Yourself"
                rows="3"
                className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 
                border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#CAEB66] hover:bg-[#a2ba59] text-black py-3 rounded-lg transition font-medium">
              Submit
            </button>
          </form>

          {/* IMAGE */}
          <div className="hidden md:flex justify-center items-center">
            <img
              src={riderImg}
              alt="Rider"
              className="max-w-xs md:max-w-sm object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeARider;
