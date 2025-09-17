/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan eksperimen jika kamu membutuhkannya
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  // Konfigurasi untuk Next.js versi 13 ke atas
  // Tidak perlu lagi menulis "api" dan "bodyParser"
  // Next.js secara otomatis menangani ini
};

module.exports = nextConfig;
