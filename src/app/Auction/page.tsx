"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface AuctionProduct {
  _id: string;
  product: {
    name: string;
    band: string;
    image: string; // ✅ เพิ่ม image
  };
  startingPrice: number;
  currentBid: number;
  auctionStart: string;
  auctionEnd: string;
  status?: string;
}

const Auction = () => {
  const [allAuctions, setAllAuctions] = useState<AuctionProduct[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<AuctionProduct[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
  const [brandList, setBrandList] = useState<string[]>([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/auctions");
        const result = await res.json();
        const auctions = (result || []).map((auction: AuctionProduct) => {
          // ✅ คำนวณ status ตามเวลา
          const now = new Date();
          const start = new Date(auction.auctionStart);
          const end = new Date(auction.auctionEnd);

          let status = "pending";
          if (now >= start && now <= end) {
            status = "active";
          } else if (now > end) {
            status = "complete";
          }

          return { ...auction, status };
        });

        setAllAuctions(auctions);
        setFilteredAuctions(auctions);

        const bands = Array.from(
          new Set(
            auctions.map((a: AuctionProduct) => a.product.band).filter(Boolean)
          )
        );
        setBrandList(bands);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  useEffect(() => {
    let filtered = allAuctions;

    if (searchTerm) {
      const searchRegex = new RegExp(`\\b${searchTerm}`, "i");
      filtered = filtered.filter((a) => searchRegex.test(a.product.name));
    }

    if (checkedBrands.length > 0) {
      filtered = filtered.filter((a) => checkedBrands.includes(a.product.band));
    }

    setFilteredAuctions(filtered);
  }, [searchTerm, checkedBrands, allAuctions]);

  const handleBrandCheck = (brand: string) => {
    setCheckedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 tracking-tight">
        🛒 Browse Auctions
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Filters</h2>

          <div className="flex flex-col gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none text-sm"
              />
            </div>

            {/* Brand checkboxes */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Brand
              </label>
              <div className="flex flex-col gap-1 max-h-48 overflow-y-auto text-sm">
                {brandList.map((brand) => (
                  <label
                    key={`brand-${brand}`}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={checkedBrands.includes(brand)}
                      onChange={() => handleBrandCheck(brand)}
                    />
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Auction Grid */}
        <section className="w-full lg:w-3/4">
          {loading ? (
            <p className="text-center text-gray-600 text-lg">Loading...</p>
          ) : filteredAuctions.filter((a) => a.status === "active").length ===
            0 ? (
            <p className="text-center text-red-500 text-sm">
              No active auctions match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuctions
                .filter((auction) => auction.status === "active")
                .map((auction) => (
                  <div
                    key={auction._id}
                    className="bg-white border border-gray-100 rounded-xl p-4 shadow hover:shadow-md transition"
                  >
                    {/* ✅ Image */}
                    {auction.product.image ? (
                      <img
                        src={auction.product.image}
                        alt={auction.product.name}
                        className="w-full h-48 object-contain mb-3 rounded"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-xs mb-3 rounded">
                        No Image
                      </div>
                    )}

                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                      {auction.product.name}
                    </h2>
                    <p className="text-green-600 text-sm font-medium">
                      Starting Price: ${auction.startingPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Brand: {auction.product.band}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Current Bid: ${auction.currentBid.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mb-3 italic">
                      Auction ends:{" "}
                      {new Date(auction.auctionEnd).toLocaleString()}
                    </p>
                    <Link
                      href={`/Auction/${auction._id}`}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium"
                    >
                      View Auction
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Auction;
