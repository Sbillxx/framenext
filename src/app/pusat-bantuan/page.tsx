import Link from "next/link";
import Image from "next/image";
import { generateSEO } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

export const metadata = generateSEO({
  title: "Pusat Bantuan - Frame ID | Panduan Lengkap Twibbon Maker",
  description: "Temukan bantuan lengkap untuk menggunakan Frame ID. FAQ, tutorial, dan panduan step-by-step cara membuat twibbon gratis, upload foto, dan menggunakan semua fitur platform kami.",
  keywords: ["help center frame id", "panduan twibbon maker", "cara buat twibbon", "tutorial frame id", "faq twibbon", "bantuan pengguna", "cara upload foto twibbon", "troubleshooting twibbon"],
  url: "/pusat-bantuan",
  type: "website",
});

export default function PusatBantuanPage() {
  return (
    <>
      <StructuredData type="faq" />
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
                <h1 className="text-4xl font-bold text-gray-900 mb-4">🆘 Pusat Bantuan</h1>
                <p className="text-lg text-gray-600">Panduan lengkap untuk menggunakan Frame ID</p>
              </div>

              {/* FAQ Section */}
              <div className="space-y-8">
                {/* Panduan Umum */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">📚 Panduan Umum</h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Apa itu Frame ID?</h3>
                      <p className="text-gray-700">Frame ID adalah platform online gratis untuk membuat twibbon (frame foto) untuk kampanye, event, atau dukungan online. Semua fitur dapat digunakan tanpa watermark.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Apakah Frame ID benar-benar gratis?</h3>
                      <p className="text-gray-700">Ya! Frame ID 100% gratis untuk semua fitur. Anda dapat membuat, mengedit, dan mengunduh twibbon tanpa biaya dan tanpa watermark.</p>
                    </div>
                  </div>
                </div>

                {/* Tutorial Penggunaan */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">🎯 Tutorial Penggunaan</h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Cara Membuat Twibbon</h3>
                      <ol className="text-gray-700 space-y-1 list-decimal list-inside">
                        <li>Klik &quot;Mulai Kampanye&quot; di halaman utama</li>
                        <li>Upload desain frame Anda (format PNG, max 5MB)</li>
                        <li>Atur thumbnail dan preview</li>
                        <li>Isi detail kampanye (judul, deskripsi, link)</li>
                        <li>Klik &quot;Publikasikan&quot; untuk membuat twibbon</li>
                      </ol>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Cara Menggunakan Twibbon</h3>
                      <ol className="text-gray-700 space-y-1 list-decimal list-inside">
                        <li>Pilih twibbon dari galeri atau hasil pencarian</li>
                        <li>Klik &quot;Gunakan Twibbon&quot;</li>
                        <li>Upload foto Anda</li>
                        <li>Atur posisi dan ukuran foto</li>
                        <li>Klik &quot;Download&quot; untuk menyimpan hasil</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Spesifikasi Teknis */}
                <div className="bg-yellow-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">⚙️ Spesifikasi Teknis</h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Format File yang Didukung</h3>
                      <ul className="text-gray-700 space-y-1">
                        <li>
                          • <strong>Upload Frame:</strong> PNG (rekomendasi)
                        </li>
                        <li>
                          • <strong>Upload Foto:</strong> JPG, PNG
                        </li>
                        <li>
                          • <strong>Ukuran Maksimum:</strong> 5 MB per file
                        </li>
                        <li>
                          • <strong>Resolusi Rekomendasi:</strong> 1080x1080px
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Browser yang Didukung</h3>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Chrome (versi terbaru)</li>
                        <li>• Firefox (versi terbaru)</li>
                        <li>• Safari (versi terbaru)</li>
                        <li>• Edge (versi terbaru)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Troubleshooting */}
                <div className="bg-red-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">🔧 Troubleshooting</h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Upload File Gagal</h3>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Pastikan ukuran file tidak melebihi 5 MB</li>
                        <li>• Gunakan format PNG untuk frame</li>
                        <li>• Periksa koneksi internet Anda</li>
                        <li>• Coba refresh halaman dan upload ulang</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">Download Tidak Berfungsi</h3>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Pastikan browser mengizinkan download</li>
                        <li>• Coba gunakan browser lain</li>
                        <li>• Disable ad blocker sementara</li>
                        <li>• Untuk iOS Safari: gunakan &quot;Save to Photos&quot;</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Kontak Support */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">💬 Butuh Bantuan Lebih Lanjut?</h2>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-700 mb-4">Jika masalah Anda belum terpecahkan, jangan ragu untuk menghubungi tim support kami:</p>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <strong>Email:</strong> support@frameid.com
                      </p>
                      <p className="text-gray-700">
                        <strong>Live Chat:</strong> Tersedia di pojok kanan bawah
                      </p>
                      <p className="text-gray-700">
                        <strong>Response Time:</strong> 1-24 jam
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-8">
                <Link href="/" className="inline-block bg-[#0268f8] text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
