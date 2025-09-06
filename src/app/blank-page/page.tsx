"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BlankPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left side - Text content */}
        <div
          className="flex-1 text-white space-y-6 flex flex-col 
                        items-center lg:items-start 
                        text-center lg:text-left"
        >
          {/* Logo */}
          <Image src="/images/Logo Frameid White.png" alt="Frame ID Logo" width={120} height={40} className="h-8 w-auto mb-6 lg:mb-10" />

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-7xl font-extrabold font-sequel-black">UPSSS..</h1>
            <h2 className="text-2xl lg:text-4xl font-bold font-sequel-black mb-6 lg:mb-10">Halaman Ini Belum Tersedia</h2>
          </div>

          {/* Emot + Text */}
          <div className="flex items-start gap-3 max-w-md justify-center lg:justify-start">
            <Image src="/images/blank-page/emot.png" alt="Sad Icon" width={60} height={60} className="w-12 h-12 lg:w-16 lg:h-16" />
            <p className="text-sm lg:text-base leading-relaxed opacity-90 text-left">
              Web masih dalam tahap pengembangan nih, jadi beberapa fitur belum bisa dipake ya. Tapi ini gak akan lama kok, fitur utama masih berfungsi normal. Terimakasih
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handleBack}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-medium 
                       px-8 py-3 rounded-full 
                       transition-colors duration-200 shadow-lg"
          >
            Kembali
          </button>
        </div>

        {/* Right side - Construction hat illustration */}
        <div className="flex-1 flex justify-center lg:justify-end mt-10 lg:mt-0">
          <Image src="/images/blank-page/topi.png" alt="Hat" width={300} height={300} className="w-40 sm:w-56 lg:w-72 h-auto" />
        </div>
      </div>
    </div>
  );
}
