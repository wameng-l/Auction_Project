"use client";

import { use } from "react";
import { useEffect, useState } from "react";

interface ProductParams {
  Product: string;
}

const Product = ({ params }: { params: Promise<ProductParams> }) => {
  const unwrappedParams = use(params); // ✅ Next.js 15+ way
  const productId = unwrappedParams.Product;

  const [detail, setDetail] = useState({
    id: 0,
    title: "",
    discountPercentage: 0,
    price: 0,
    description: "",
    brand: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const result = await res.json();
        setDetail(result);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const originalPrice = (detail.price / (1 - detail.discountPercentage / 100)).toFixed(2);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      {loading ? (
        <p className="text-gray-600 text-lg">Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{detail.title}</h1>

          <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Brand: {detail.brand}</p>
              <p className="text-green-600 text-lg font-semibold mb-1">
                {detail.discountPercentage.toFixed(1)}% OFF
              </p>
              <p className="text-xl text-gray-800 font-bold">
                ${detail.price.toFixed(2)}{" "}
                <span className="line-through text-sm text-gray-400 ml-2">
                  ${originalPrice}
                </span>
              </p>
            </div>

            {/* Placeholder for Auction Countdown */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Auction ends in</p>
              <p className="text-2xl font-bold text-red-600">--:--:--</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{detail.description}</p>

          <button
            disabled
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition cursor-not-allowed"
          >
            Place a Bid (Coming Soon)
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
