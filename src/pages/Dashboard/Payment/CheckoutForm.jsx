import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [parcel, setParcel] = useState(null);

  // =========================
  // GET PARCEL
  // =========================
  useEffect(() => {
    const fetchParcel = async () => {
      try {
        const res = await axiosSecure.get(`/parcels/${id}`);
        setParcel(res.data);
      } catch (err) {
        toast.error("Failed to load parcel ❌");
      }
    };

    fetchParcel();
  }, [id, axiosSecure]);

  // =========================
  // PAYMENT SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe not ready ❌");
      return;
    }

    const card = elements.getElement(CardElement);
    setLoading(true);

    const toastId = toast.loading("Processing payment... ⏳");

    try {
      // 1️⃣ Create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        parcelId: id,
      });

      const clientSecret = res.data.clientSecret;

      if (!clientSecret) {
        toast.error("Payment init failed ❌", { id: toastId });
        setLoading(false);
        return;
      }

      // 2️⃣ Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        toast.error(result.error.message, { id: toastId });
      }

      if (result.paymentIntent?.status === "succeeded") {
        // 🔥 FIX: send email (important for backend security)
        await axiosSecure.patch(`/parcels/payment/${id}`, {
          email: parcel?.created_by,
          transactionId: result.paymentIntent.id,
        });

        toast.success("🎉 Payment Successful!", { id: toastId });
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong", { id: toastId });
    }

    setLoading(false);
  };

  // =========================
  // PRICE SAFETY FIX
  // =========================
  const price = parcel?.price ?? 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 💰 PRICE DISPLAY */}
      <div className="text-center text-lg font-semibold text-gray-700">
        {parcel ? <>Total Payable: ৳{price}</> : "Loading price..."}
      </div>

      <CardElement className="p-3 border rounded-md" />

      {/* 💳 PAY BUTTON */}
      <button
        type="submit"
        disabled={!stripe || loading || !parcel}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        {loading ? "Processing..." : `Pay Now - ৳${price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
