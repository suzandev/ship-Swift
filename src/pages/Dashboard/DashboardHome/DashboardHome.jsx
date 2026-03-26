import { PieChart, Pie, Cell, Tooltip } from "recharts";

const DashboardHome = ({ data }) => {
  const statusData = [
    { name: "Pending", value: data.pending },
    { name: "Shipped", value: data.shipped },
    { name: "Delivered", value: data.delivered },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* 👤 User Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">User Info</h2>
        <p>Name: John Doe</p>
        <p>Email: john@email.com</p>
      </div>

      {/* 📊 Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Parcel Status</h2>

        <PieChart width={250} height={250}>
          <Pie data={statusData} dataKey="value">
            {statusData.map((_, i) => (
              <Cell key={i} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default DashboardHome;
