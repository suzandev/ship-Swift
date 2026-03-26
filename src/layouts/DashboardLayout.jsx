import { Outlet, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add Parcel", path: "/dashboard/addParcel" },
    { name: "My Parcels", path: "/dashboard/myParcels" },
    { name: "Payments", path: "/dashboard/payments" },
    { name: "Tracking", path: "/dashboard/tracking" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 🔥 Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden md:flex flex-col justify-between">
        {/* Top */}
        <div>
          <h2 className="text-2xl p-4 font-bold text-[#1E1E1E] dark:text-white">
            Ship<span className="text-[#CAEB66]">Swift</span>
          </h2>

          {/* User Info */}
          <div className="px-4 mb-6">
            <img src={user?.photoURL} className="w-12 h-12 rounded-full mb-2" />
            <h4 className="text-sm font-semibold">{user?.displayName}</h4>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2 px-4">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm ${
                    isActive
                      ? "bg-[#CAEB66] text-black"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }>
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={logOut}
          className="m-4 py-2 bg-red-500 text-white rounded-md">
          Logout
        </button>
      </aside>

      {/* 📱 Mobile Sidebar */}
      {/* (You can add drawer later if needed) */}

      {/* 🔥 Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
