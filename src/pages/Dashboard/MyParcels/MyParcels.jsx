import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    const fetchParcels = async () => {
      if (!user?.email) return;

      try {
        const res = await axiosSecure.get(`/parcels?email=${user.email}`);
        setParcels(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParcels();
  }, [user, axiosSecure]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-300">
        My Parcels
      </h2>

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
            {parcels.map((p) => (
              <tr
                key={p._id}
                className="border-b text-gray-600 dark:text-gray-300">
                <td>{p.title}</td>
                <td>{p.receiverName}</td>
                <td>{p.parcelStatus}</td>
                <td>৳{p.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
