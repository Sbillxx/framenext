"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BlankPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left side - Text content */}
        <div className="flex-1 text-white space-y-6">
          <div className="space-y-2">
            <Image src="/images/Logo Frameid White.png" alt="Frame ID Logo" width={120} height={40} className="h-8 w-auto mb-10" />
            <h1 className="text-6xl lg:text-7xl font-extrabold font-sequel-black">UPSSS..</h1>
            <h2 className="text-3xl lg:text-4xl font-bold font-sequel-black mb-10">Halaman Ini Belum Tersedia</h2>
          </div>

          <div className="flex items-start gap-3">
            <Image src="/images/blank-page/emot.png" alt="Sad Icon" width={100} height={100} className="w-15 h-15" />
            <p className="text-sm leading-relaxed opacity-90 max-w-md">Web masih dalam tahap pengembangan nih, jadi beberapa fitur belum bisa dipake ya. Tapi ini gak akan lama kok, fitur utama masih berfungsi normal. Terimakasih</p>
          </div>

          <button onClick={handleBack} className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-15 py-3 rounded-4xl transition-colors duration-200 shadow-lg">
            Kembali
          </button>
        </div>

        {/* Right side - Construction hat illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative">
            <Image src="/images/blank-page/topi.png" alt="Hat" width={300} height={300} className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
