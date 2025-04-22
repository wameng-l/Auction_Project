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

        {/* Product Grid */}
        <section className="w-full lg:w-3/4">
          {loading ? (
            <p className="text-center text-gray-600 text-lg">Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-red-500 text-sm">
              No products match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-100 rounded-xl p-4 shadow hover:shadow-md transition"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.title}
                  </h2>
                  <p className="text-green-600 text-sm font-medium">
                    {product.discountPercentage.toFixed(1)}% OFF
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Brand: {product.brand}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    Price: ${product.price.toFixed(2)}
                  </p>
                  <Link
                    href={`/Auction/${product.id}`}
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
