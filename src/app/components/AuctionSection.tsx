"use client";

import Link from "next/link";

interface Product {
  id: number;
  title: string;
  description: string;
  discountPercentage?: number;
}

interface AuctionSectionProps {
  title: string;
  products: Product[];
  type: "upcoming" | "featured";
}

const AuctionSection = ({ title, products, type }: AuctionSectionProps) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between h-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                {product.title}
              </h3>

              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {product.description}
              </p>

              {type === "upcoming" ? (
                <p className="text-yellow-600 text-sm italic font-medium mb-4">
                  Coming soon
                </p>
              ) : (
                <p className="text-green-600 text-sm font-semibold mb-4">
                  {product.discountPercentage?.toFixed(1)}% OFF
                </p>
              )}
            </div>

            {type === "upcoming" ? (
              <button
                disabled
                className="w-full mt-auto bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
              >
                Coming Soon
              </button>
            ) : (
              <Link
                href={`/Auction/${product.id}`}
                className="block mt-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition font-medium"
              >
                View Auction
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AuctionSection;
