import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const warehouses = useLoaderData(); // Loader data
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [parcelType, setParcelType] = useState("document");

  // Sender cascading
  const [senderDistrict, setSenderDistrict] = useState("");
  const [senderCoveredArea, setSenderCoveredArea] = useState("");

  // Receiver cascading
  const [receiverDistrict, setReceiverDistrict] = useState("");
  const [receiverCoveredArea, setReceiverCoveredArea] = useState("");

  const [weight, setWeight] = useState(0);

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-400 outline-none";

  const districts = [...new Set(warehouses.map((w) => w.district))];

  const getCoveredAreas = (district) =>
    warehouses.find((w) => w.district === district)?.covered_area || [];

  const calculateCost = (data) => {
    const withinSameDistrict = data.senderDistrict === data.receiverDistrict;
    let baseCost = 0;
    let extraCharge = 0;

    if (data.parcelType === "document") {
      baseCost = withinSameDistrict ? 60 : 80;
    } else {
      if (data.weight <= 3) {
        baseCost = withinSameDistrict ? 110 : 150;
      } else {
        const extraKg = data.weight - 3;
        baseCost = withinSameDistrict ? 110 : 150;
        extraCharge = extraKg * 40 + (withinSameDistrict ? 0 : 40);
      }
    }

    const totalCost = baseCost + extraCharge;
    return { baseCost, extraCharge, totalCost, withinSameDistrict };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      userEmail: user?.email || "guest@example.com",
      parcelType,
      title: form.title.value,
      weight: parcelType === "non-document" ? Number(form.weight.value) : 0,

      senderName: form.senderName.value,
      senderAddress: form.senderAddress.value,
      senderPhone: form.senderPhone.value,
      senderDistrict,
      senderCoveredArea,
      pickupInstruction: form.pickupInstruction.value,

      receiverName: form.receiverName.value,
      receiverAddress: form.receiverAddress.value,
      receiverPhone: form.receiverPhone.value,
      receiverDistrict,
      receiverCoveredArea,
      deliveryInstruction: form.deliveryInstruction.value,

      creation_date: new Date().toISOString(),
      parcelStatus: "pending",
      trackingNumber: `TRK-${Date.now()}`,
      paymentStatus: "unpaid",
    };

    const { baseCost, extraCharge, totalCost, withinSameDistrict } =
      calculateCost(data);

    // SweetAlert2 breakdown
    const { isConfirmed } = await Swal.fire({
      title: "Delivery Cost Breakdown",
      html: `
        <table class="w-full text-left">
          <tr><td><b>Parcel Type:</b></td><td>${data.parcelType}</td></tr>
          <tr><td><b>Weight:</b></td><td>${data.weight} kg</td></tr>
          <tr><td><b>Delivery Zone:</b></td><td>${
            withinSameDistrict ? "Within District" : "Outside District"
          }</td></tr>
          <tr><td><b>Base Cost:</b></td><td>৳${baseCost}</td></tr>
          <tr><td><b>Extra Charge:</b></td><td>৳${extraCharge}</td></tr>
          <tr><td><b>Total Cost:</b></td><td style="font-size:16px;color:#2ecc71"><b>৳${totalCost}</b></td></tr>
        </table>
      `,
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Edit Details",
      focusConfirm: false,
    });

    if (isConfirmed) {
      try {
        // 👉 SEND DATA TO SERVER
        const res = await axiosSecure.post("/parcels", data);

        if (res.data.insertedId) {
          toast.success("Parcel booked successfully ✅");

          form.reset();
          setSenderDistrict("");
          setSenderCoveredArea("");
          setReceiverDistrict("");
          setReceiverCoveredArea("");
          setWeight(0);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to book parcel ❌");
      }
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
                    min={0}
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    placeholder="Weight (KG)"
                    className={inputClass}
                    required
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
                      Covered Area
                    </label>
                    <select
                      name="senderCoveredArea"
                      value={senderCoveredArea}
                      required
                      className={inputClass}
                      onChange={(e) => setSenderCoveredArea(e.target.value)}>
                      <option value="">Select Area</option>
                      {getCoveredAreas(senderDistrict).map((a) => (
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
                      Covered Area
                    </label>
                    <select
                      name="receiverCoveredArea"
                      value={receiverCoveredArea}
                      required
                      className={inputClass}
                      onChange={(e) => setReceiverCoveredArea(e.target.value)}>
                      <option value="">Select Area</option>
                      {getCoveredAreas(receiverDistrict).map((a) => (
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
