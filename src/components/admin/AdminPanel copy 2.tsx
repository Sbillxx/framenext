"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "../halamanutama/Footer";

const AdminPanel = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Simple Navbar - 2 Columns */}
      <nav className="w-full bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Left: Frame ID Logo */}
          <div className="flex items-center">
            <Image
              src="/images/frameidbiru.png"
              alt="Frame ID Logo"
              width={120}
              height={40}
              className="h-6 sm:h-8 w-auto"
            />
          </div>

          {/* Right: X Icon */}
          <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90 hover:shadow-md">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="#0268f8"
              stroke="#0268f8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          {/* Upload Section / Frame Preview */}
          <div className="mb-6 sm:mb-8">
            {!imagePreview ? (
              // Upload Area
              <label htmlFor="image-upload" className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl sm:rounded-4xl p-4 sm:p-6 md:p-8 text-center hover:border-[#0268f8] hover:bg-[#0268f8]/5 transition-all duration-300 cursor-pointer w-full max-w-5xl mx-auto aspect-[16/9] flex flex-col justify-center transform hover:scale-[1.02] hover:shadow-lg">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {/* Cloud Upload Icon */}
                  <div className="mb-3 sm:mb-4">
                    <svg
                      className="w-12 h-12 sm:w-16 sm:h-16 text-[#0268f8] mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  {/* Upload Text */}
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Upload desainmu disini
                  </h3>
                  {/* Upload Specifications */}
                  <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <p>Tipe: PNG</p>
                    <p>Ukuran Maksimum: 5 MB</p>
                    <p>Rekomendasi: 1080x1080px</p>
                  </div>
                </div>
              </label>
            ) : (
              // Frame Preview Area
              <div className="border-2 border-dashed border-gray-300 rounded-2xl sm:rounded-4xl p-4 sm:p-6 md:p-8 text-center w-full max-w-5xl mx-auto aspect-[16/9] flex items-center justify-center relative bg-gray-50">
                {/* Simple Image Preview */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={imagePreview}
                    alt="Uploaded frame"
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />

                  {/* Trash Button */}
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-2xl sm:rounded-4xl text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:scale-105 hover:shadow-md transition-all duration-200 text-sm sm:text-base">
              Batalkan
            </button>
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-300 text-gray-500 rounded-2xl sm:rounded-4xl cursor-not-allowed hover:bg-gray-400 hover:scale-105 transition-all duration-200 text-sm sm:text-base">
              Selanjutnya
            </button>
          </div>

          {/* Banner Display Area */}
          {/* <div className="text-center">
            <div className="w-full max-w-5xl mx-auto border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 md:p-8 text-center bg-gray-50 min-h-[150px] sm:min-h-[200px] flex items-center justify-center">
              <div className="text-gray-500">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-base sm:text-lg font-medium">Banner Iklan Disini</p>
                <p className="text-xs sm:text-sm text-gray-400">Foto akan ditampilkan disini setelah upload</p>
              </div>
            </div>
          </div> */}
        </div>
      </main>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AdminPanel;
