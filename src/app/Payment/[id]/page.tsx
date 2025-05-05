"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const SelectPaymentPage = () => {
  const { id } = useParams(); // รับ paymentId จาก URL
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/payment/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "paid",
            paymentMethod: selectedMethod,
          }),
        }
      );

      const data = await res.json();
      console.log("✅ Payment confirmed:", data);
      alert("Payment completed!");
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("Failed to complete payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Select Payment Method
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setSelectedMethod("cash")}
            className={`border rounded-lg p-4 text-center ${
              selectedMethod === "cash"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            💸 Cash
          </button>
          <button
            onClick={() => setSelectedMethod("paypal")}
            className={`border rounded-lg p-4 text-center ${
              selectedMethod === "paypal"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            🅿️ PayPal
          </button>
        </div>

        <button
          onClick={handleConfirm}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg p-3 transition"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default SelectPaymentPage;
