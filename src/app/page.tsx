import HeroCarousel from "./components/HeroCarousel";
import AuctionSection from "./components/AuctionSection";

interface Product {
  id: number;
  title: string;
  description: string;
  discountPercentage: number;
  price: number;
}

const images = [
  { src: "/image/banner.png", alt: "Banner 1" },
  { src: "/image/banner2.png", alt: "Banner 2" },
];

// ✅ ฟังก์ชันนี้อยู่ก่อน Home
async function getTopDiscountProducts(): Promise<{
  featured: Product[];
  upcoming: Product[];
}> {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  const sorted = data.products.sort(
    (a: Product, b: Product) => b.discountPercentage - a.discountPercentage
  );

  return {
    featured: sorted.slice(0, 5),
    upcoming: sorted.slice(5, 10),
  };
}

export default async function Home() {
  const { featured, upcoming } = await getTopDiscountProducts();

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-4 bg-gray-200">
      {/* Banner */}
      <section className="w-full rounded-xl text-white py-4 flex items-center justify-center">
        <HeroCarousel images={images} />
      </section>

      <AuctionSection
        title="⏳ Upcoming Auctions"
        products={upcoming}
        type="upcoming"
      />
      <hr className="text-black" />
      <AuctionSection
        title="🔥 Featured Auctions"
        products={featured}
        type="featured"
      />
    </main>
  );
}
