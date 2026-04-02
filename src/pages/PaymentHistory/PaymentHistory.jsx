import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-40 text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
          💳 Payment History
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View all your completed payments
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            {/* Table Head */}
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Tracking</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {payments.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200">
                  <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-200">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-semibold text-blue-600 dark:text-blue-400">
                    {item.trackingNumber || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100 font-medium">
                    ৳ {item.price}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      {item.paymentStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4 max-w-[180px]">
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {item.transactionId}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(item.paid_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {payments.length === 0 && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            🚫 No payment history found
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
