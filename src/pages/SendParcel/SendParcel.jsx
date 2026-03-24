import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const SendParcel = () => {
  const warehouses = useLoaderData(); // Loader data
  const [parcelType, setParcelType] = useState("document");

  // Sender cascading
  const [senderDistrict, setSenderDistrict] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderCoveredArea, setSenderCoveredArea] = useState("");

  // Receiver cascading
  const [receiverDistrict, setReceiverDistrict] = useState("");
  const [receiverCity, setReceiverCity] = useState("");
  const [receiverCoveredArea, setReceiverCoveredArea] = useState("");

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-400 outline-none";

  const districts = [...new Set(warehouses.map((w) => w.district))];

  const getCities = (district) =>
    warehouses.filter((w) => w.district === district).map((w) => w.city);

  const getCoveredAreas = (city) =>
    warehouses.find((w) => w.city === city)?.covered_area || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      parcelType,
      title: form.title.value,
      weight: form.weight?.value || 0,

      // Sender
      senderName: form.senderName.value,
      senderAddress: form.senderAddress.value,
      senderPhone: form.senderPhone.value,
      senderDistrict,
      senderCity,
      senderCoveredArea,
      pickupInstruction: form.pickupInstruction.value,

      // Receiver
      receiverName: form.receiverName.value,
      receiverAddress: form.receiverAddress.value,
      receiverPhone: form.receiverPhone.value,
      receiverDistrict,
      receiverCity,
      receiverCoveredArea,
      deliveryInstruction: form.deliveryInstruction.value,

      creation_date: new Date(),
    };

    let cost = 50;
    if (parcelType === "non-document") cost += data.weight * 10;
    if (data.senderDistrict !== data.receiverDistrict) cost += 30;

    toast.success(`Delivery Cost: ৳${cost}`);

    if (confirm(`Confirm booking with cost ৳${cost}?`)) {
      console.log("SEND TO DB 👉", data);
      toast.success("Parcel booked successfully ✅");
      form.reset();
      setSenderDistrict("");
      setSenderCity("");
      setSenderCoveredArea("");
      setReceiverDistrict("");
      setReceiverCity("");
      setReceiverCoveredArea("");
    }
  };

  return (
    <div className="bg-[#f5f6fa] dark:bg-gray-800 min-h-screen py-8 px-3 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-gray-700 p-5 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Add Parcel
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-sm mb-6">
          Fill all required details for delivery
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Parcel Info */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="font-medium text-gray-700 dark:text-gray-200 mb-4">
              Parcel Info
            </h2>

            <div className="flex gap-6 mb-4 text-sm">
              <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <input
                  type="radio"
                  checked={parcelType === "document"}
                  onChange={() => setParcelType("document")}
                />
                Document
              </label>

              <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <input
                  type="radio"
                  checked={parcelType === "non-document"}
                  onChange={() => setParcelType("non-document")}
                />
                Non-Document
              </label>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">
                  Parcel Title
                </label>
                <input
                  name="title"
                  required
                  placeholder="Parcel Title"
                  className={inputClass}
                />
              </div>

              {parcelType === "non-document" && (
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Weight (KG)
                  </label>
                  <input
                    name="weight"
                    type="number"
                    placeholder="Weight (KG)"
                    className={inputClass}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sender & Receiver */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sender */}
            <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="font-medium text-gray-700 dark:text-gray-200 mb-4">
                Sender Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Sender Name
                  </label>
                  <input
                    name="senderName"
                    required
                    placeholder="Sender Name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Address
                  </label>
                  <input
                    name="senderAddress"
                    required
                    placeholder="Address"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Sender Phone No
                  </label>
                  <input
                    name="senderPhone"
                    required
                    placeholder="Sender Phone No"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    District
                  </label>
                  <select
                    name="senderDistrict"
                    value={senderDistrict}
                    required
                    className={inputClass}
                    onChange={(e) => {
                      setSenderDistrict(e.target.value);
                      setSenderCity("");
                      setSenderCoveredArea("");
                    }}>
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {senderDistrict && (
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300">
                      City
                    </label>
                    <select
                      name="senderCity"
                      value={senderCity}
                      required
                      className={inputClass}
                      onChange={(e) => {
                        setSenderCity(e.target.value);
                        setSenderCoveredArea("");
                      }}>
                      <option value="">Select City</option>
                      {getCities(senderDistrict).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {senderCity && (
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300">
                      Covered Area
                    </label>
                    <select
                      name="senderCoveredArea"
                      value={senderCoveredArea}
                      required
                      className={inputClass}
                      onChange={(e) => setSenderCoveredArea(e.target.value)}>
                      <option value="">Select Area</option>
                      {getCoveredAreas(senderCity).map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Pickup Instruction
                  </label>
                  <textarea
                    name="pickupInstruction"
                    required
                    placeholder="Pickup Instruction"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Receiver */}
            <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="font-medium text-gray-700 dark:text-gray-200 mb-4">
                Receiver Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Receiver Name
                  </label>
                  <input
                    name="receiverName"
                    required
                    placeholder="Receiver Name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Address
                  </label>
                  <input
                    name="receiverAddress"
                    required
                    placeholder="Receiver Address"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Receiver Phone No
                  </label>
                  <input
                    name="receiverPhone"
                    required
                    placeholder="Receiver Contact No"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    District
                  </label>
                  <select
                    name="receiverDistrict"
                    value={receiverDistrict}
                    required
                    className={inputClass}
                    onChange={(e) => {
                      setReceiverDistrict(e.target.value);
                      setReceiverCity("");
                      setReceiverCoveredArea("");
                    }}>
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {receiverDistrict && (
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300">
                      City
                    </label>
                    <select
                      name="receiverCity"
                      value={receiverCity}
                      required
                      className={inputClass}
                      onChange={(e) => {
                        setReceiverCity(e.target.value);
                        setReceiverCoveredArea("");
                      }}>
                      <option value="">Select City</option>
                      {getCities(receiverDistrict).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {receiverCity && (
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300">
                      Covered Area
                    </label>
                    <select
                      name="receiverCoveredArea"
                      value={receiverCoveredArea}
                      required
                      className={inputClass}
                      onChange={(e) => setReceiverCoveredArea(e.target.value)}>
                      <option value="">Select Area</option>
                      {getCoveredAreas(receiverCity).map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Delivery Instruction
                  </label>
                  <textarea
                    name="deliveryInstruction"
                    required
                    placeholder="Delivery Instruction"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            * PickUp Time 4pm-7pm Approx.
          </p>

          <button className="bg-[#CAEB66] hover:bg-[#9db555] text-black px-6 py-2 rounded-md text-sm">
            Proceed to Confirm
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SendParcel;
