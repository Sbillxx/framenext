/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Increase to 10MB for twibbon uploads
    },
  },
  // Also configure API routes body size limit
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
