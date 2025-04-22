"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  discountPercentage: number;
  price: number;
  brand: string;
}

const Auction = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
  const [brandList, setBrandList] = useState<string[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products");
        const result = await res.json();
        const products = result.products || [];
        setAllProducts(products);
        setFilteredProducts(products);

        const brands = Array.from(
          new Set(products.map((p: Product) => p.brand).filter(Boolean))
        );
        setBrandList(brands);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (searchTerm) {
      const searchRegex = new RegExp(`\\b${searchTerm}`, "i");
      filtered = filtered.filter((product) => searchRegex.test(product.title));
    }

    if (checkedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        checkedBrands.includes(product.brand)
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, checkedBrands, allProducts]);

  const handleBrandCheck = (brand: string) => {
    setCheckedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 p-4 w-full">
      <h1 className="text-3xl font-bold text-center mb-6">
        Available Auctions
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 w-[90%] mx-auto">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white p-4 rounded-xl shadow-md h-full">
          <h2 className="text-xl font-semibold mb-4">Filter</h2>

          <div className="flex flex-col gap-4">
            {/* Search */}
            <div>
              <label className="block mb-1 text-sm font-medium">Search</label>
              <input
                type="text"
                placeholder="Search product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Brand checkboxes */}
            <div>
              <label className="block mb-2 text-sm font-medium">Brand</label>
              <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                {brandList.map((brand) => (
                  <label
                    key={`brand-${brand}`}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={checkedBrands.includes(brand)}
                      onChange={() => handleBrandCheck(brand)}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="w-full lg:w-3/4">
          {loading ? (
            <p className="text-gray-700 text-lg">Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-red-500">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-sm text-green-600 font-medium mb-1">
                    {product.discountPercentage.toFixed(1)}% OFF
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Brand: {product.brand}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Price: ${product.price.toFixed(2)}
                  </p>
                  <Link
                    href={`/Auction/${product.id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-semibold"
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
