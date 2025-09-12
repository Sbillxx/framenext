"use client";

import Link from "next/link";
import Image from "next/image";

export default function TentangKamiPage() {
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
                <h1 className="text-4xl font-bold text-gray-900 mb-4">🏢 Tentang Kami - Frame ID</h1>
                <p className="text-lg text-gray-600">Platform terdepan untuk membuat dan berbagi twibbon berkualitas tinggi</p>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                {/* Visi Misi */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">🎯 Visi & Misi</h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Visi</h3>
                      <p className="text-gray-700">Menjadi platform terdepan di Indonesia untuk kreasi dan berbagi twibbon yang memudahkan setiap orang mengekspresikan dukungan mereka terhadap berbagai kampanye dan acara.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Misi</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Menyediakan tools yang mudah digunakan untuk membuat twibbon berkualitas tinggi</li>
                        <li>• Membangun komunitas yang mendukung berbagai kampanye positif</li>
                        <li>• Memberikan pengalaman terbaik dalam berbagi konten visual</li>
                        <li>• Mendorong kreativitas dan ekspresi diri melalui desain</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sejarah */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">📚 Sejarah Frame ID</h2>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-700 leading-relaxed">
                      Frame ID didirikan pada tahun 2024 dengan tujuan untuk memudahkan masyarakat Indonesia dalam mengekspresikan dukungan mereka terhadap berbagai kampanye, acara, dan gerakan positif.
                      <br />
                      <br />
                      Kami percaya bahwa setiap orang memiliki hak untuk menyuarakan pendapat dan dukungan mereka, dan twibbon adalah cara yang efektif untuk melakukannya.
                      <br />
                      <br />
                      Dengan teknologi terdepan dan desain yang user-friendly, Frame ID telah membantu ribuan pengguna membuat twibbon yang menarik dan profesional.
                    </p>
                  </div>
                </div>

                {/* Tim */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">👥 Tim Kami</h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Tim Pengembangan</h3>
                      <p className="text-gray-700">Tim developer berpengalaman yang terus berinovasi untuk memberikan fitur terbaik</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Tim Desain</h3>
                      <p className="text-gray-700">Kreator visual yang memastikan setiap template twibbon memiliki kualitas terbaik</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Tim Support</h3>
                      <p className="text-gray-700">Customer service yang siap membantu 24/7 untuk memastikan pengalaman terbaik</p>
                    </div>
                  </div>
                </div>

                {/* Nilai */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">💎 Nilai-Nilai Kami</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">🚀 Inovasi</h3>
                      <p className="text-gray-700 text-sm">Terus berinovasi untuk memberikan pengalaman terbaik</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">🤝 Kolaborasi</h3>
                      <p className="text-gray-700 text-sm">Bekerja sama untuk mencapai tujuan bersama</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">🎨 Kreativitas</h3>
                      <p className="text-gray-700 text-sm">Mendorong ekspresi kreatif setiap pengguna</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">💯 Kualitas</h3>
                      <p className="text-gray-700 text-sm">Komitmen pada kualitas terbaik dalam setiap aspek</p>
                    </div>
                  </div>
                </div>

                {/* Kontak */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">📞 Hubungi Kami</h2>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📧</span>
                        <span className="text-gray-700">
                          Email:{" "}
                          <a href="mailto:info@frameid.com" className="text-blue-600 hover:text-blue-800 font-medium">
                            info@frameid.com
                          </a>
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">💬</span>
                        <span className="text-gray-700">
                          WhatsApp:{" "}
                          <a href="https://wa.me/6281234567890" className="text-blue-600 hover:text-blue-800 font-medium">
                            +62 812-3456-7890
                          </a>
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🌐</span>
                        <span className="text-gray-700">
                          Website:{" "}
                          <a href="https://frameid.com" className="text-blue-600 hover:text-blue-800 font-medium">
                            www.frameid.com
                          </a>
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium mt-4">Kami senang mendengar dari Anda! 💙</p>
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
