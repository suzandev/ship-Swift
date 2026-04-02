import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrackParcel = () => {
  const axiosSecure = useAxiosSecure();

  const [trackingId, setTrackingId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!trackingId) return;

    try {
      setLoading(true);
      const res = await axiosSecure.get(`/tracking/${trackingId}`);
      setData(res.data);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Track Your Consignment
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Now you can easily track your shipment
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex flex-col md:flex-row gap-3 mb-10">
        <input
          type="text"
          placeholder="Enter tracking code"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1 px-5 py-3 rounded-full border dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-full bg-lime-400 hover:bg-lime-500 font-semibold">
          Search
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-center">Loading...</p>}

      {/* RESULT */}
      {data.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT CARD */}
          <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-3xl shadow">
            <h2 className="text-xl font-bold mb-4">Product Details</h2>
            <p>
              <strong>Tracking:</strong> {trackingId}
            </p>
            <p>
              <strong>Total Updates:</strong> {data.length}
            </p>
          </div>

          {/* RIGHT TIMELINE */}
          <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-3xl shadow">
            <h2 className="text-xl font-bold mb-6">Tracking Updates</h2>

            <div className="space-y-6">
              {data.map((item, i) => (
                <div key={item._id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                      ✓
                    </div>
                    {i !== data.length - 1 && (
                      <div className="w-[2px] h-full bg-gray-300 dark:bg-gray-700"></div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      {new Date(item.time).toLocaleString()}
                    </p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {item.message}
                    </p>
                    <p className="text-xs text-gray-500">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!loading && data.length === 0 && (
        <p className="text-center text-gray-500">
          No tracking information found
        </p>
      )}
    </div>
  );
};

export default TrackParcel;
