import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [selectedParcel, setSelectedParcel] = useState(null);

  const {
    data: parcels = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/user?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Cost Calculator
  const calculateCost = (parcel) => {
    if (parcel.parcelType === "document") return 60;
    const weight = parcel.weight || 0;
    if (weight <= 1) return 80;
    return 80 + (weight - 1) * 20;
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/parcels/${id}?email=${user.email}`);

        Swal.fire({
          title: "Deleted!",
          text: "Parcel deleted successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      } catch {
        Swal.fire("Error!", "Failed to delete parcel", "error");
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-600 dark:text-gray-300">
        My Parcels
      </h2>

      {/* Loading */}
      {isLoading && (
        <p className="text-center py-6 text-gray-500">Loading...</p>
      )}

      {/* Error */}
      {isError && (
        <p className="text-center py-6 text-red-500">Failed to load parcels</p>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="text-left border-b text-gray-600 dark:text-gray-300">
                <th>Title</th>
                <th>Type</th>
                <th>Created</th>
                <th>Cost</th>
                <th>Payment</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((p) => (
                <tr
                  key={p._id}
                  className="border-b text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="py-2 font-medium">{p.title}</td>

                  <td>
                    {p.parcelType === "document" ? "Document" : "Non-Document"}
                  </td>

                  <td>{new Date(p.creation_date).toLocaleDateString()}</td>

                  <td>৳{calculateCost(p)}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        p.paymentStatus === "paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}>
                      {p.paymentStatus}
                    </span>
                  </td>

                  <td className="text-center space-x-1 md:space-x-2">
                    {/* VIEW BUTTON */}
                    <button
                      onClick={() => setSelectedParcel(p)}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                      View
                    </button>

                    {p.paymentStatus !== "paid" && (
                      <button className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">
                        Pay
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ MODAL */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-2">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-xl p-4 md:p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Parcel Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>Title:</strong> {selectedParcel.title}
              </p>
              <p>
                <strong>Type:</strong> {selectedParcel.parcelType}
              </p>
              <p>
                <strong>Weight:</strong> {selectedParcel.weight} kg
              </p>
              <p>
                <strong>Status:</strong> {selectedParcel.parcelStatus}
              </p>
              <p>
                <strong>Tracking:</strong> {selectedParcel.trackingNumber}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(selectedParcel.creation_date).toLocaleString()}
              </p>

              <p>
                <strong>Sender:</strong> {selectedParcel.senderName}
              </p>
              <p>
                <strong>Sender Phone:</strong> {selectedParcel.senderPhone}
              </p>
              <p>
                <strong>Sender Address:</strong> {selectedParcel.senderAddress}
              </p>

              <p>
                <strong>Receiver:</strong> {selectedParcel.receiverName}
              </p>
              <p>
                <strong>Receiver Phone:</strong> {selectedParcel.receiverPhone}
              </p>
              <p>
                <strong>Receiver Address:</strong>{" "}
                {selectedParcel.receiverAddress}
              </p>

              <p>
                <strong>Pickup Instruction:</strong>{" "}
                {selectedParcel.pickupInstruction}
              </p>
              <p>
                <strong>Delivery Instruction:</strong>{" "}
                {selectedParcel.deliveryInstruction}
              </p>
            </div>

            {/* Close Button */}
            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedParcel(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
