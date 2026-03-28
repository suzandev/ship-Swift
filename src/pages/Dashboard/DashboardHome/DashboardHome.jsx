import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const COLORS = ["#facc15", "#38bdf8", "#4ade80"];

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [stats, setStats] = useState({
    pending: 0,
    shipped: 0,
    delivered: 0,
  });

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/parcels/stats?email=${user.email}`)
      .then((res) =>
        setStats(
          res.data || {
            pending: 0,
            shipped: 0,
            delivered: 0,
          },
        ),
      )
      .catch((err) => console.log(err));
  }, [user, axiosSecure]);

  const statusData = [
    { name: "Pending", value: stats.pending },
    { name: "Shipped", value: stats.shipped },
    { name: "Delivered", value: stats.delivered },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* 👤 User Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-[#1E1E1E] dark:text-white">
          User Info
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          Name: {user?.displayName}
        </p>
        <p className="text-gray-600 dark:text-gray-300">Email: {user?.email}</p>
      </div>

      {/* 📊 Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-[#1E1E1E] dark:text-white">
          Parcel Status
        </h2>

        <PieChart width={250} height={250}>
          <Pie data={statusData} dataKey="value">
            {statusData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default DashboardHome;

// 65.7 will be start
