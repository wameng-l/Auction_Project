"use client";

import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    window.location.href = "/Login"; // รีเฟรช
  }, []);

  return null;
};

export default Logout;
