import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const SendParcel = () => {
  const [parcelType, setParcelType] = useState("document");

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-400 outline-none";

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
      senderDistrict: form.senderDistrict.value,
      pickupInstruction: form.pickupInstruction.value,

      // Receiver
      receiverName: form.receiverName.value,
      receiverAddress: form.receiverAddress.value,
      receiverPhone: form.receiverPhone.value,
      receiverDistrict: form.receiverDistrict.value,
      deliveryInstruction: form.deliveryInstruction.value,

      creation_date: new Date(),
    };

    // 💰 Cost Calculation
    let cost = 50;

    if (parcelType === "non-document") {
      cost += data.weight * 10;
    }

    // district based charge
    if (data.senderDistrict !== data.receiverDistrict) {
      cost += 30;
    }

    // ✅ Show Toast
    toast.success(`Delivery Cost: ৳${cost}`);

    // ✅ Confirm
    if (confirm(`Confirm booking with cost ৳${cost}?`)) {
      console.log("SEND TO DB 👉", data);

      toast.success("Parcel booked successfully ✅");
      form.reset();
    }
  };

  return (
    <div className="bg-[#f5f6fa] dark:bg-gray-800 min-h-screen py-8 px-3 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-gray-700 p-5 md:p-8">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Add Parcel
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-sm mb-6">
          Fill all required details for delivery
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ========= Parcel Info ========= */}
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
              <input
                name="title"
                required
                placeholder="Parcel Title"
                className={inputClass}
              />

              {parcelType === "non-document" && (
                <input
                  name="weight"
                  type="number"
                  placeholder="Weight (KG)"
                  className={inputClass}
                />
              )}
            </div>
          </div>

          {/* ========= Sender & Receiver ========= */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sender Details */}
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
                    Your District
                  </label>
                  <select name="senderDistrict" required className={inputClass}>
                    <option value="">Select your District</option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Rangpur</option>
                  </select>
                </div>

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

            {/* Receiver Details */}
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
                    Receiver Address
                  </label>
                  <input
                    name="receiverAddress"
                    required
                    placeholder="Address"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Receiver Contact No
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
                    Receiver District
                  </label>
                  <select
                    name="receiverDistrict"
                    required
                    className={inputClass}>
                    <option value="">Select your District</option>
                    <option>Dhaka</option>
                    <option>Rangpur</option>
                    <option>Khulna</option>
                  </select>
                </div>

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

          {/* Pickup Time Note */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            * PickUp Time 4pm-7pm Approx.
          </p>

          {/* Button */}
          <div className="">
            <button className="bg-[#CAEB66] hover:bg-[#9db555] text-black px-6 py-2 rounded-md text-sm">
              Proceed to Confirm
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SendParcel;
