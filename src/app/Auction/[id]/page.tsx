"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BidHistoryItem {
  bidder: { _id: string; username: string };
  amount: number;
  bidTime: string;
}

interface AuctionProduct {
  _id: string;
  product: {
    name: string;
    brand: string;
    description: string;
    image: string;
  };
  startingPrice: number;
  currentBid: number;
  auctionEnd: string;
  bidHistory: BidHistoryItem[];
}

interface AuctionParams {
  id: string;
}

const AuctionDetail = ({ params }: { params: Promise<AuctionParams> }) => {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const router = useRouter();
  const [auction, setAuction] = useState<AuctionProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>("");

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auctions/${id}`);
        const data = await res.json();
        setAuction(data);
        setBidAmount(data.currentBid + 1); // ✅ ตั้งค่า default = currentBid + 1
        updateTimeLeft(data.auctionEnd);
      } catch (err) {
        console.error("Failed to load auction", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAuction();
  }, [id]);

  const updateTimeLeft = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Auction ended");
        clearInterval(interval);
      } else {
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s left`);
      }
    }, 1000);
  };

  const handleBid = async () => {
    if (!auction) return;

    const loggedIn = localStorage.getItem("loggedIn");
    const currentUserId = localStorage.getItem("userId");

    if (loggedIn !== "true" || !currentUserId) {
      alert("Please login first to place a bid.");
      router.push("/Login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auctions/bid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auctionId: auction._id,
          bidderId: currentUserId,
          amount: bidAmount,
        }),
      });

      if (res.ok) {
        alert("Bid successful!");
        setAuction((prev) =>
          prev
            ? {
                ...prev,
                currentBid: bidAmount,
                bidHistory: [
                  {
                    bidder: { _id: currentUserId, username: "You" },
                    amount: bidAmount,
                    bidTime: new Date().toISOString(),
                  },
                  ...(prev.bidHistory || []),
                ],
              }
            : prev
        );
        setBidAmount(bidAmount + 1); // ✅ หลังบิดเสร็จ เพิ่มขึ้นอีก 1 ต่อเนื่อง
      } else {
        const result = await res.json();
        alert(result.message);
      }
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!auction) return <div>Auction not found</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* Left side: Product info & Bidding */}
        <div className="flex-1 flex flex-col gap-6">
          {auction.product.image ? (
            <img
              src={auction.product.image}
              alt={auction.product.name}
              className="w-full h-64 object-contain rounded-xl shadow-sm"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400 text-sm">
              No Image Available
            </div>
          )}

          <h1 className="text-3xl font-bold text-gray-800 text-center">
            {auction.product.name}
          </h1>
          <p className="text-gray-500 text-center">
            {auction.product.description}
          </p>

          <div className="flex flex-col gap-2 mt-4 text-center">
            <p className="text-lg font-semibold text-green-600">
              Starting Price: ${auction.startingPrice.toFixed(2)}
            </p>
            <p className="text-lg font-bold text-blue-600">
              Current Bid: ${auction.currentBid.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 italic">{timeLeft}</p>
          </div>

          {/* Bid Form */}
          <div className="flex flex-col gap-4 mt-6">
            <input
              type="number"
              placeholder="Your Bid Amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleBid}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg p-3 transition"
            >
              Place Bid
            </button>
          </div>
        </div>

        {/* Right side: Bid History */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            📜 Bid History
          </h2>
          {auction.bidHistory && auction.bidHistory.length > 0 ? (
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col gap-3 max-h-[500px] overflow-y-auto">
              {auction.bidHistory
                .sort(
                  (a, b) =>
                    new Date(b.bidTime).getTime() -
                    new Date(a.bidTime).getTime()
                )
                .map((bid, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>{bid.bidder?.username || "Unknown"}</span>
                    <span>${bid.amount.toFixed(2)}</span>
                    <span className="text-gray-400">
                      {new Date(bid.bidTime).toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No bids yet. Be the first!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
