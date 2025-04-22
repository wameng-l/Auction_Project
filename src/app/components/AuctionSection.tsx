"use client";

import Link from "next/link";

interface Product {
  id: number;
  title: string;
  description: string;
  discountPercentage?: number; // only used in featured
}

interface AuctionSectionProps {
  title: string;
  products: Product[];
  type: "upcoming" | "featured";
}

const AuctionSection = ({ title, products, type }: AuctionSectionProps) => {
  return (
    <section className="w-full rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-200 p-4 rounded-lg shadow hover:shadow-md"
          >
            <h3 className="text-xl font-medium text-gray-900 mb-1">
              {product.title}
            </h3>
            <p className="text-gray-700 text-sm mb-1">{product.description}</p>

            {type === "upcoming" ? (
              <>
                <p className="text-yellow-600 text-sm mb-2 font-medium italic">
                  Coming soon
                </p>
                <button
                  disabled
                  className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </>
            ) : (
              <>
                <p className="text-green-600 text-sm mb-2 font-medium">
                  {product.discountPercentage?.toFixed(1)}% OFF
                </p>
                <Link
                  href={`/Auction/${product.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block"
                >
                  View Auction
                </Link>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AuctionSection;
