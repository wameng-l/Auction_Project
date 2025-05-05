"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  name: string;
  image?: string;
}

interface Auction {
  _id: string;
  product: Product;
}

interface PaymentItem {
  _id: string;
  auction: Auction;
  user: string;
  amount: number;
  status: string;
  createdAt: string;
}

const PaymentPage = () => {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUserId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    if (!storedUserId) {
      alert("You must be logged in to view your payments.");
      setLoading(false);
      return;
    }

    const fetchPayments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/payment/user/${storedUserId}`
        );
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setPayments(data);
        }
      } catch (error) {
        console.error("Failed to load payments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        💳 Your Winning Payments
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading payments...</p>
      ) : payments.length === 0 ? (
        <p className="text-center text-gray-500">No winning payments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition flex flex-col"
            >
              {payment.auction?.product?.image ? (
                <img
                  src={payment.auction.product.image}
                  alt={payment.auction.product.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded text-gray-400 text-sm mb-4">
                  No Image
                </div>
              )}
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {payment.auction?.product?.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Amount: ${payment.amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Status:{" "}
                <span
                  className={`${
                    payment.status === "paid"
                      ? "text-green-600"
                      : payment.status === "failed"
                      ? "text-red-500"
                      : "text-yellow-500"
                  } font-medium`}
                >
                  {payment.status}
                </span>
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Created at: {new Date(payment.createdAt).toLocaleString()}
              </p>

              {payment.status !== "paid" && (
                <button
                  onClick={() => router.push(`/select-payment/${payment._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg p-3 transition"
                >
                  Go to Payment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
