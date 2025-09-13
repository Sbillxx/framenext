"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Cropper from "react-easy-crop";
import { downloadCanvasImage } from "@/lib/utils/download";

interface Twibbon {
  id: number;
  name: string;
  description: string;
  filename: string;
  url: string;
  downloads: number;
  shares: number;
  created_at: string;
  thumbnail: string;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function TwibbonDetail() {
  const params = useParams();
  const router = useRouter();
  const [twibbon, setTwibbon] = useState<Twibbon | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showShareLayout, setShowShareLayout] = useState(false);
  const [frameRatio, setFrameRatio] = useState<{
    width: number;
    height: number;
  }>({ width: 1, height: 1 });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchTwibbon = useCallback(async () => {
    try {
      const slug = params?.slug;
      if (!slug) return;

      const response = await fetch(`/api/twibbons/${slug}`);
      const data = await response.json();
      if (data.success) {
        setTwibbon(data.data);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error fetching twibbon:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }, [params?.slug, router]);

  useEffect(() => {
    if (params?.slug) {
      fetchTwibbon();
    }
  }, [params?.slug, fetchTwibbon]);

  // Calculate frame ratio when twibbon loads
  useEffect(() => {
    if (twibbon?.filename) {
      const img = new window.Image();
      img.onload = () => {
        setFrameRatio({ width: img.width, height: img.height });
      };
      img.onerror = (e) => {
        console.log("Failed to load image:", e);
        setFrameRatio({ width: 1, height: 1 }); // Default ratio
      };
      img.src = `/api/images/uploads/${twibbon.filename}`;
    }
  }, [twibbon?.filename]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
        // Reset crop and zoom when new image is uploaded
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_: unknown, areaPixels: CropArea) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const detectPhotoArea = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    // Get image data to analyze transparency
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let minX = canvas.width;
    let minY = canvas.height;
    let maxX = 0;
    let maxY = 0;

    // Scan for transparent areas (alpha < 255)
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const alpha = data[index + 3];

        // If pixel is transparent or very light
        if (alpha < 200) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }

    // If no transparent area found, use default area
    if (minX >= maxX || minY >= maxY) {
      return {
        x: canvas.width * 0.1,
        y: canvas.height * 0.2,
        width: canvas.width * 0.8,
        height: canvas.height * 0.6,
      };
    }

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  };

  const createTwibbon = async () => {
    if (!twibbon || !userImage || !canvasRef.current || !croppedAreaPixels) return;

    setProcessing(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size based on frame ratio
      const maxSize = 800;
      let canvasWidth, canvasHeight;

      if (frameRatio.width > frameRatio.height) {
        canvasWidth = maxSize;
        canvasHeight = (maxSize * frameRatio.height) / frameRatio.width;
      } else {
        canvasHeight = maxSize;
        canvasWidth = (maxSize * frameRatio.width) / frameRatio.height;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Load twibbon frame
      const frameImg = new window.Image();
      frameImg.crossOrigin = "anonymous";
      frameImg.onload = () => {
        // Detect the photo area in the twibbon
        const photoArea = detectPhotoArea(canvas, ctx);

        // Load user image
        const userImg = new window.Image();
        userImg.crossOrigin = "anonymous";
        userImg.onload = () => {
          // Draw the cropped user image first (as background)
          ctx.drawImage(userImg, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, photoArea.x, photoArea.y, photoArea.width, photoArea.height);

          // Then draw the twibbon frame on top (this will overlay the frame)
          ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

          // Download using Safari-friendly utility
          downloadCanvasImage(canvas, {
            filename: `twibbon-${twibbon.name}.png`,
            title: `Twibbon - ${twibbon.name}`,
            description: "Twibbon Anda berhasil dibuat! Simpan gambar ini ke galeri atau bagikan ke teman-teman.",
          });

          // Update download count
          updateDownloadCount();

          // Show share layout
          setShowShareLayout(true);
        };
        userImg.src = userImage;
      };
      frameImg.src = `/api/images/uploads/${twibbon.filename}`;
    } catch (error) {
      console.error("Error creating twibbon:", error);
    } finally {
      setProcessing(false);
    }
  };

  const updateDownloadCount = async () => {
    try {
      const slug = params?.slug;
      if (!slug) return;

      await fetch(`/api/twibbons/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "download" }),
      });
    } catch (error) {
      console.error("Error updating download count:", error);
    }
  };

  const shareTwibbon = async (platform: string) => {
    const slug = params?.slug;
    if (!slug) return;

    const shareUrl = `${window.location.origin}/twibbon/${slug}`;
    const shareText = twibbon?.description || `Check out this awesome twibbon: ${twibbon?.name}`;

    let shareLink = "";

    switch (platform) {
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "instagram":
        // Instagram doesn't support direct sharing, copy link
        navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank");
    }

    // Update share count
    try {
      const slug = params?.slug;
      if (!slug) return;

      await fetch(`/api/twibbons/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "share" }),
      });
    } catch (error) {
      console.error("Error updating share count:", error);
    }
  };

  const copyText = async () => {
    if (twibbon?.description) {
      try {
        await navigator.clipboard.writeText(twibbon.description);
        alert("Teks berhasil disalin!");
      } catch (error) {
        console.error("Error copying text:", error);
      }
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "today";
    if (diffInDays === 1) return "yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0268f8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!twibbon) {
    return (
      <div className="min-h-screen bg-[#0268f8] flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Twibbon tidak ditemukan</h2>
          <Link href="/" className="text-white hover:text-gray-200 underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0268f8]">
      {/* Main Content */}
      <div className="px-4 py-6 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg">
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
          <motion.div className="bg-white rounded-4xl p-8 shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Creator Info */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">Akun Creator</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-8 leading-tight text-center px-4">{twibbon.name}</h1>

            {/* Twibbon Frame with Cropper */}
            <div className="mb-8">
              <div
                className="relative rounded-xl overflow-hidden w-full bg-gray-100"
                style={{
                  aspectRatio: `${frameRatio.width} / ${frameRatio.height}`,
                  maxHeight: "500px",
                }}
              >
                {userImage ? (
                  <div className="relative w-full h-full">
                    <Cropper
                      image={userImage}
                      crop={crop}
                      zoom={zoom}
                      aspect={frameRatio.width / frameRatio.height}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                      showGrid={false}
                      style={{
                        containerStyle: {
                          width: "100%",
                          height: "100%",
                          backgroundColor: "transparent",
                        },
                        cropAreaStyle: {
                          border: "2px solid #fff",
                          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.3)",
                        },
                      }}
                    />
                    {/* Twibbon Frame Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <Image
                        src={`/api/images/uploads/${twibbon.filename}` || "/images/placeholder.png"}
                        alt={twibbon.name}
                        fill
                        className="object-contain"
                        onError={(e) => {
                          console.error("Image failed to load:", twibbon.url);
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/placeholder.png";
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src={`/api/images/uploads/${twibbon.filename}` || "/images/placeholder.png"}
                      alt={twibbon.name}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        console.error("Image failed to load:", twibbon.url);
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/placeholder.png";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Crop Controls */}
            {userImage && (
              <div className="mb-6 p-4  rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-center text-black">Atur Foto Anda</h3>

                {/* Zoom Slider */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zoom In/Out</label>
                  <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1x</span>
                    <span>{zoom.toFixed(1)}x</span>
                    <span>3x</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-center">Drag dan zoom foto untuk mengatur posisi di dalam frame</p>
              </div>
            )}

            {/* Engagement Stats */}
            <div className="flex justify-between items-center mb-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Image src="/images/orang2.png" alt="Dukungan" width={24} height={24} className="mr-2 w-6 h-5" />
                <span className="text-base">{(twibbon.downloads + twibbon.shares).toLocaleString()} dukungan</span>
              </div>
              <div className="flex items-center">
                <Image src="/images/jam.png" alt="Waktu" width={24} height={24} className="mr-2 w-6 h-6" />
                <span className="text-base">{formatTimeAgo(twibbon.created_at)}</span>
              </div>
            </div>

            {/* Upload Button */}
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-[#ff6600] hover:bg-[#ff6600] text-white py-4 px-6 rounded-4xl font-medium transition-colors flex items-center justify-center text-lg mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image src="/images/icon-foto.png" alt="Foto" width={24} height={24} className="mr-3 w-6 h-6" />
              {userImage ? "Ganti Foto" : "Pilih Foto"}
            </motion.button>

            {/* Create Twibbon Button */}
            {userImage && (
              <motion.button
                onClick={createTwibbon}
                disabled={processing}
                className="w-full bg-[#0268f8] hover:bg-[#0256d6] text-white py-4 px-6 rounded-4xl font-medium transition-colors flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: processing ? 1 : 1.02 }}
                whileTap={{ scale: processing ? 1 : 0.98 }}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Membuat Twibbon...
                  </>
                ) : (
                  "Buat Twibbon"
                )}
              </motion.button>
            )}

            {/* Language Selector */}
            <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
              <Image src="/images/globe.png" alt="Indonesia" width={20} height={20} className="mr-2" />
              Bahasa Indonesia
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      {/* Share Layout */}
      {showShareLayout && (
        <div className="fixed inset-0 bg-[#0268f8] z-50">
          <div className="px-4 py-6 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg">
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

              {/* Main Content */}
              <motion.div className="bg-white rounded-4xl p-6 sm:p-8 shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {/* Creator Info */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Akun Global</span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight text-center px-2 sm:px-4">{twibbon?.name}</h1>

                {/* Content Area */}
                <div className="mb-6 sm:mb-8">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 min-h-[100px] sm:min-h-[120px]">
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm sm:text-base">{twibbon?.description || "Mari Sukakan MUKERNAS 2025\n#Mukernas2025 #Idrisiyyah"}</div>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="flex justify-between items-center mb-6 sm:mb-8 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Image src="/images/orang2.png" alt="Dukungan" width={200} height={200} className="mr-2 w-5 h-5 sm:w-7 sm:h-6" />
                    <span className="text-sm sm:text-base">{(twibbon?.downloads + twibbon?.shares || 0).toLocaleString()} dukungan</span>
                  </div>
                  <div className="flex items-center">
                    <Image src="/images/jam.png" alt="Waktu" width={200} height={200} className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-sm sm:text-base">{twibbon ? formatTimeAgo(twibbon.created_at) : "a month ago"}</span>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <motion.button
                    onClick={() => setShowShareLayout(false)}
                    className="flex-1 bg-white border-2 border-orange-500 text-orange-500 py-2.5 sm:py-3 px-4 sm:px-6 rounded-4xl font-medium transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={copyText}
                    className="flex-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-4xl font-medium transition-colors flex items-center justify-center text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                    </svg>
                    Salin Teks
                  </motion.button>
                </div>

                {/* Share Buttons */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <motion.button
                    onClick={() => shareTwibbon("whatsapp")}
                    className="bg-green-500 hover:bg-green-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors flex items-center justify-center text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    WhatsApp
                  </motion.button>
                  <motion.button
                    onClick={() => shareTwibbon("facebook")}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors flex items-center justify-center text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </motion.button>
                  <motion.button
                    onClick={() => shareTwibbon("twitter")}
                    className="bg-blue-400 hover:bg-blue-500 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors flex items-center justify-center text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </motion.button>
                  <motion.button
                    onClick={() => shareTwibbon("instagram")}
                    className="bg-pink-600 hover:bg-pink-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl transition-colors flex items-center justify-center text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281H7.721c-.49 0-.89.4-.89.89v8.449c0 .49.4.89.89.89h8.449c.49 0 .89-.4.89-.89V8.597c0-.49-.4-.89-.89-.89z" />
                    </svg>
                    Instagram
                  </motion.button>
                </div>

                {/* Language Indicator */}
                <div className="flex items-center justify-center text-xs sm:text-sm text-gray-500">
                  <Image src="/images/globe.png" alt="Indonesia" width={16} height={16} className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Bahasa Indonesia
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
