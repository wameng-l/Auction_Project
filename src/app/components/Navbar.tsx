"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("loggedIn") === "true";
      setIsLoggedIn(loggedIn);
      setUsername(loggedIn ? localStorage.getItem("username") : null);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername(null);
    location.href = "/Login";
  };

  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-white">
          AuctionWeb
        </Link>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } sm:flex sm:items-center text-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm sm:mt-0 bg-gray-900 sm:bg-transparent sm:relative absolute w-full sm:w-auto left-0 top-16 sm:top-auto sm:left-auto border-t border-gray-700 sm:border-none`}
        >
          <Link
            href="/"
            onClick={handleLinkClick}
            className="block px-4 py-5 hover:bg-gray-800 transition"
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
              className="block px-3 sm:py-2 py-5 bg-blue-600 text-white hover:bg-blue-700 transition sm:rounded sm:mt-0"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-5 hover:bg-gray-800 transition"
              >
                <User size={20} className="text-white" />{" "}
                {/* ไอคอน User ด้านหน้า */}
                <span>{username}</span>
                <ChevronDown size={18} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white text-gray-800 rounded-lg shadow-lg py-2">
                  <Link
                    href="/Profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-300"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/Report"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-300"
                  >
                    Report
                  </Link>
                  <Link
                    href="/Payment"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-300"
                  >
                    Payment
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 hover:bg-gray-300 text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
