"use client";

import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
import FeedbackModal from "@/components/FeedbackModal";
import Navbar from "@/components/halamanutama/Navbar";
import Hero from "@/components/halamanutama/Hero";
import TwibbonList from "@/components/halamanutama/TwibbonList";
import FeedbackButton from "@/components/halamanutama/FeedbackButton";
import Jumbotron from "@/components/halamanutama/Jumbotron";
import Footer from "@/components/halamanutama/Footer";

interface Twibbon {
  id: number;
  name: string;
  description: string;
  filename: string;
  url: string;
  downloads: number;
  shares: number;
  created_at: string;
  slug: string;
  thumbnail: string;
}

export default function Home() {
  const [twibbons, setTwibbons] = useState<Twibbon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    fetchTwibbons();
  }, []);

  const fetchTwibbons = async () => {
    try {
      const response = await fetch("/api/twibbons");
      const data = await response.json();
      if (data.success) {
        setTwibbons(data.data);
      }
    } catch (error) {
      console.error("Error fetching twibbons:", error);
    } finally {
      setLoading(false);
    }
  };

  // const formatNumber = (num: number) => {
  //   if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  //   if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  //   return num.toString();
  // };

  return (
    <div className="min-h-9 bg-white text-white ">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="-mt-5">
        <Hero />
      </div>
      {/* Twibbon List Section */}
      <TwibbonList twibbons={twibbons} loading={loading} />

      {/* Jumbotron Section */}
      <Jumbotron />

      {/* footer */}
      <Footer />
      {/* Feedback Button */}
      <FeedbackButton onOpenModal={() => setShowFeedbackModal(true)} />

      {/* Feedback Modal */}
      <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />
    </div>
  );
}
