/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Main from "./home/page";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("token"); // Example: check for an auth token in localStorage

    if (isAuthenticated) {
      // If authenticated, redirect to login
      router.push("/home");
    } else {
      // If not authenticated, redirect to register
      router.push("/login");
    }
  }, [router]);

  return <></>;
}
