import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";

const useTracking = () => {
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 ADD TRACKING UPDATE
  const addTrackingUpdate = async ({
    trackingNumber,
    status,
    message,
    location,
  }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosSecure.post("/tracking", {
        trackingNumber,
        status,
        message,
        location,
      });

      toast.success("Tracking updated successfully ✅");

      return res.data;
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("Failed to update tracking ❌");
    } finally {
      setLoading(false);
    }
  };

  return {
    addTrackingUpdate,
    loading,
    error,
  };
};

export default useTracking;
