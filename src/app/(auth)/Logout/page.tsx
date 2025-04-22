"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("loggedIn");
    router.push("/Login");
  }, [router]);

  return null;
};

export default Logout;
