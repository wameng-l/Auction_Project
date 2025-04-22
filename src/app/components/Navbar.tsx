"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // optional: use any icon you like

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center font-bold gap-4 px-4 py-2">
        {/* Top Row - Logo and Toggle */}
        <div className="w-full flex justify-between items-center sm:w-auto">
          <Link href="/" className="text-2xl py-3">
            Auction Web
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col sm:flex sm:flex-row sm:items-center w-full sm:w-auto`}
        >
          <Link
            href="/"
            className="px-3 py-2 hover:bg-yellow-400 hover:text-black transition"
          >
            Home
          </Link>
          <Link
            href="/Auction"
            className="px-3 py-2 hover:bg-yellow-400 hover:text-black transition"
          >
            Auction
          </Link>
          <Link
            href="/Contact"
            className="px-3 py-2 hover:bg-yellow-400 hover:text-black transition"
          >
            Contact
          </Link>
          <Link
            href="/Login"
            className="px-3 py-2 hover:bg-yellow-400 hover:text-black transition sm:ml-4"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
