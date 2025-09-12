"use client";

import Link from "next/link";
import Image from "next/image";

export default function PusatBantuanPage() {
  return (
    <div className="min-h-screen bg-[#0268f8]">
      {/* Main Content */}
      <div className="px-4 py-6 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg">
          {/* Header */}
          <header className="bg-[#0268f8] px-4 mb-6">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                <Image src="/images/Logo Frameid White.png" alt="Frame ID Logo" width={200} height={200} className="h-6 w-auto" priority />
              </Link>
              <Link href="/" className="text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </Link>
            </div>
          </header>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Main Content Box */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">📖 Pusat Bantuan Frame ID</h1>
                <p className="text-lg text-gray-600">
                  Selamat datang di Pusat Bantuan Frame ID 🎉
                  <br />
                  Di sini kamu bisa menemukan jawaban dari pertanyaan yang sering diajukan serta panduan menggunakan layanan kami.
                </p>
              </div>

              {/* FAQ Sections */}
              <div className="space-y-8">
                {/* Akun & Login */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">🔑 Akun & Login</h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Q: Bagaimana cara membuat akun?</h3>
                      <p className="text-gray-700">A: Klik tombol Daftar di kanan atas, lalu isi nama, email, dan kata sandi. Setelah itu verifikasi email kamu.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Q: Saya lupa kata sandi, bagaimana cara reset?</h3>
                      <p className="text-gray-700">A: Klik Lupa Kata Sandi di halaman login, lalu ikuti instruksi untuk reset via email.</p>
                    </div>
                  </div>
                </div>

                {/* Kampanye Twibbon */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">📸 Kampanye Twibbon</h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Q: Bagaimana cara membuat kampanye twibbon?</h3>
                      <p className="text-gray-700">A: Klik tombol + Mulai Kampanye, unggah desain twibbon kamu, isi detail kampanye, lalu publikasikan.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Q: Apakah membuat kampanye twibbon gratis?</h3>
                      <p className="text-gray-700">A: Ya, kamu bisa membuat kampanye secara gratis tanpa watermark.</p>
                    </div>
                  </div>
                </div>

                {/* Menggunakan Twibbon */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">🖼️ Menggunakan Twibbon</h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Q: Bagaimana cara pasang twibbon ke foto saya?</h3>
                      <p className="text-gray-700">A: Cari kampanye yang kamu suka, klik Pasang Twibbon, lalu unggah foto. Sesuaikan posisi, lalu klik Download.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Q: Apakah twibbon bisa langsung dibagikan ke media sosial?</h3>
                      <p className="text-gray-700">A: Bisa! Setelah pasang twibbon, kamu akan lihat tombol Bagikan ke WhatsApp, Instagram, atau Facebook.</p>
                    </div>
                  </div>
                </div>

                {/* Dukungan & Bantuan */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">⚡ Dukungan & Bantuan</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 font-medium">Jika masih ada kendala:</p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📧</span>
                        <span className="text-gray-700">
                          Email kami di:{" "}
                          <a href="mailto:support@frameid.com" className="text-blue-600 hover:text-blue-800 font-medium">
                            support@frameid.com
                          </a>
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">💬</span>
                        <span className="text-gray-700">Chat langsung melalui tombol di pojok kanan bawah</span>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium mt-4">Kami siap membantu 24/7 🚀</p>
                  </div>
                </div>
              </div>

              {/* Back to Home Button */}
              <div className="text-center mt-8">
                <Link href="/" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  ← Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
