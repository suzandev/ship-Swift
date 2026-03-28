import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // 🔥 TanStack Query
  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email, // only run when email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/user?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-300">
        My Parcels
      </h2>

      {/* ✅ Loading State */}
      {isLoading && (
        <p className="text-center py-4 text-gray-500">Loading...</p>
      )}

      {/* ❌ Error State */}
      {isError && (
        <p className="text-center py-4 text-red-500">Failed to load parcels</p>
      )}

      {/* ✅ Table */}
      {!isLoading && !isError && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-600 dark:text-gray-300">
                <th>Title</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Cost</th>
              </tr>
            </thead>

            <tbody>
              {parcels.length > 0 ? (
                parcels.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b text-gray-600 dark:text-gray-300">
                    <td>{p.title}</td>
                    <td>{p.receiverName}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          p.parcelStatus === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : p.parcelStatus === "delivered"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-200 text-gray-600"
                        }`}>
                        {p.parcelStatus}
                      </span>
                    </td>
                    <td>৳{p.cost || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No parcels found 😔
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
