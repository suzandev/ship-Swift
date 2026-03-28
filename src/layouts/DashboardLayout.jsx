import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, logOut, role } = useAuth();
  const [open, setOpen] = useState(false);

  // ✅ User Links
  const userLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add Parcel", path: "/dashboard/addParcel" },
    { name: "My Parcels", path: "/dashboard/myParcels" },
    { name: "Payments", path: "/dashboard/payments" },
    { name: "Tracking", path: "/dashboard/tracking" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  // ✅ Admin Links
  const adminLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "All Parcels", path: "/dashboard/allParcels" },
    { name: "Manage Users", path: "/dashboard/users" },
    { name: "Assign Rider", path: "/dashboard/assignRider" },
    { name: "Reports", path: "/dashboard/reports" },
  ];

  // 🔥 Decide which links to show
  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 🔥 Desktop Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-2xl p-4 font-bold text-[#1E1E1E] dark:text-white">
            Ship<span className="text-[#CAEB66]">Swift</span>
          </h2>

          <div className="px-4 mb-6">
            <img src={user?.photoURL} className="w-12 h-12 rounded-full mb-2" />
            <h4 className="text-sm font-semibold">{user?.displayName}</h4>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

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

        <button
          onClick={logOut}
          className="m-4 py-2 bg-red-500 text-white rounded-md">
          Logout
        </button>
      </aside>

      {/* 📱 Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-4 py-3 z-50">
        <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">
          Ship<span className="text-[#CAEB66]">Swift</span>
        </h2>

        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-gray-700 dark:text-white">
          ☰
        </button>
      </div>

      {/* 📱 Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="px-4 my-4">
          <img src={user?.photoURL} className="w-12 h-12 rounded-full mb-2" />
          <h4 className="text-sm font-semibold">{user?.displayName}</h4>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
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

        <button
          onClick={logOut}
          className="m-4 py-2 bg-red-500 text-white rounded-md">
          Logout
        </button>
      </div>

      {/* 🔥 Main Content */}
      <main className="flex-1 p-4 md:p-6 mt-14 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
