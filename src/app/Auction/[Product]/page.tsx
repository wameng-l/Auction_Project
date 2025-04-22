"use client";

import { use } from "react";
import { useEffect, useState } from "react";

interface ProductParams {
  Product: string;
}

const Product = ({ params }: { params: Promise<ProductParams> }) => {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.Product;

  const [detail, setDetail] = useState({
    id: 0,
    title: "",
    discountPercentage: 0,
    price: 0,
    description: "",
    brand: "",
    thumbnail: "", // <- Optional if you use image
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

  const originalPrice = (
    detail.price /
    (1 - detail.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      {loading ? (
        <p className="text-gray-500 text-lg">Loading...</p>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 w-full max-w-3xl flex flex-col gap-6">
          {/* Product Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            {detail.title}
          </h1>

          {/* Product Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image (Optional) */}
            <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
              Image Placeholder
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Brand: {detail.brand}</p>
                <p className="text-green-600 text-lg font-semibold">
                  {detail.discountPercentage.toFixed(1)}% OFF
                </p>
                <p className="text-xl text-gray-800 font-bold">
                  ${detail.price.toFixed(2)}{" "}
                  <span className="line-through text-sm text-gray-400 ml-2">
                    ${originalPrice}
                  </span>
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Auction ends in</p>
                <p className="text-2xl font-bold text-red-600">--:--:--</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm leading-relaxed">
            {detail.description}
          </p>

          {/* Action Button */}
          <button
            disabled
            className="w-full bg-gray-300 text-white text-sm font-semibold py-3 rounded-md cursor-not-allowed"
          >
            Place a Bid (Coming Soon)
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
