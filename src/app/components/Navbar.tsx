"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const isLogged = localStorage.getItem("loggedIn");
      setIsLoggedIn(isLogged === "true");
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    location.href = "/Login";
  };

  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-white">
          AuctionWeb
        </Link>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm mt-4 sm:mt-0`}
        >
          <Link
            href="/"
            onClick={handleLinkClick}
            className="block px-3 py-5 hover:bg-gray-800 transition"
          >
            Home
          </Link>
          <Link
            href="/Auction"
            onClick={handleLinkClick}
            className="block px-3 py-5 hover:bg-gray-800 transition"
          >
            Auction
          </Link>
          <Link
            href="/Contact"
            onClick={handleLinkClick}
            className="block px-3 py-5 hover:bg-gray-800 transition"
          >
            Contact
          </Link>

          {!isLoggedIn ? (
            <Link
              href="/Login"
              onClick={handleLinkClick}
              className="block px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href="/Profile"
                onClick={handleLinkClick}
                className="block px-3 py-2 rounded hover:bg-gray-800"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
