import Link from "next/link";
import Image from "next/image";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Tentang Kami - Frame ID | Platform Twibbon Maker Terpercaya",
  description: "Kenali lebih dalam tentang Frame ID, platform twibbon maker terdepan di Indonesia. Visi, misi, dan komitmen kami untuk memberikan tools terbaik untuk membuat twibbon gratis tanpa watermark.",
  keywords: ["tentang frame id", "profil perusahaan", "visi misi frame id", "platform twibbon indonesia", "sejarah frame id", "tim frame id", "about us twibbon maker"],
  url: "/tentang-kami",
  type: "website",
});

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-[#0268f8]">
      {/* Main Content */}
      <div className="px-4 py-6 flex items-center justify-center min-h-screen">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl p-4 mb-8">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
            <Image src="/images/Logo Frameid White.png" alt="Frame ID Logo" width={200} height={60} className="h-8 w-auto sm:h-10" />
          </Link>

          {/* Navigation */}
          <nav className="mt-4 sm:mt-0">
            <Link href="/" className="text-white hover:text-gray-200 transition-colors duration-200 text-sm sm:text-base font-medium">
              ← Kembali ke Beranda
            </Link>
          </nav>
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

              {/* Nilai-nilai */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">⭐ Nilai-nilai Kami</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-blue-600 mb-2">🚀 Inovasi</h3>
                    <p className="text-gray-700">Terus berinovasi untuk memberikan fitur-fitur terbaru dan terbaik</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-blue-600 mb-2">🎨 Kreativitas</h3>
                    <p className="text-gray-700">Mendorong kreativitas tanpa batas dalam setiap karya</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-blue-600 mb-2">🤝 Komunitas</h3>
                    <p className="text-gray-700">Membangun komunitas yang saling mendukung dan berbagi</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-blue-600 mb-2">✨ Kualitas</h3>
                    <p className="text-gray-700">Mengutamakan kualitas dalam setiap layanan yang kami berikan</p>
                  </div>
                </div>
              </div>

              {/* Fitur Unggulan */}
              <div className="bg-green-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">🌟 Fitur Unggulan</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Gratis Tanpa Watermark</h3>
                      <p className="text-gray-700">Semua fitur dapat digunakan secara gratis tanpa watermark mengganggu</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Interface Mudah Digunakan</h3>
                      <p className="text-gray-700">Desain yang intuitif dan mudah dipahami untuk semua kalangan</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Template Beragam</h3>
                      <p className="text-gray-700">Koleksi template yang terus bertambah untuk berbagai kebutuhan</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Responsive Design</h3>
                      <p className="text-gray-700">Dapat diakses dengan sempurna di desktop, tablet, dan smartphone</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kontak */}
              <div className="bg-orange-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">📞 Hubungi Kami</h2>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Email:</strong> support@frameid.com
                  </p>
                  <p className="text-gray-700">
                    <strong>Media Sosial:</strong> @frameid di Instagram, Twitter, Facebook
                  </p>
                  <p className="text-gray-700">
                    <strong>Alamat:</strong> Jakarta, Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <Link href="/" className="inline-block bg-[#0268f8] text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                Mulai Buat Twibbon Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
