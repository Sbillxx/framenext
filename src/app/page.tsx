"use client";

import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
import FeedbackModal from "@/components/FeedbackModal";
import Navbar from "@/components/halamanutama/Navbar";
import Hero from "@/components/halamanutama/Hero";
import TwibbonList from "@/components/halamanutama/TwibbonList";
import FeedbackButton from "@/components/halamanutama/FeedbackButton";
import Jumbotron from "@/components/halamanutama/Jumbotron";
import Footer from "@/components/halamanutama/Footer";

// Interface tidak diperlukan lagi karena TwibbonList sekarang self-contained

export default function Home() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

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
      {/* Twibbon List Section - sekarang self-contained */}
      <TwibbonList autoFetch={true} />

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
