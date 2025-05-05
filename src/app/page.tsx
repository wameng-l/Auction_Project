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

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 px-4 py-6 bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Banner */}
      <section className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-md">
        <HeroCarousel images={images} />
      </section>

      {/* Upcoming Section */}
      <section className="w-full max-w-6xl bg-white rounded-2xl p-6 shadow-md"></section>

      {/* Featured Section */}
      <section className="w-full max-w-6xl bg-white rounded-2xl p-6 shadow-md"></section>
    </main>
  );
}
