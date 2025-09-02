"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Cropper from "react-easy-crop";

interface Twibbon {
  id: number;
  name: string;
  description: string;
  filename: string;
  url: string;
  downloads: number;
  shares: number;
  created_at: string;
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
  const [showShareModal, setShowShareModal] = useState(false);
  const [frameRatio, setFrameRatio] = useState<{ width: number; height: number }>({ width: 1, height: 1 });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchTwibbon = useCallback(async () => {
    try {
      const id = params?.id;
      if (!id) return;

      const response = await fetch(`/api/twibbons/${id}`);
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
  }, [params?.id, router]);

  useEffect(() => {
    if (params?.id) {
      fetchTwibbon();
    }
  }, [params?.id, fetchTwibbon]);

  // Calculate frame ratio when twibbon loads
  useEffect(() => {
    if (twibbon?.url) {
      const img = new window.Image();
      img.onload = () => {
        setFrameRatio({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        console.error("Failed to load image:", twibbon.url);
        setFrameRatio({ width: 1, height: 1 }); // Default ratio
      };
      img.src = twibbon.url;
    }
  }, [twibbon?.url]);

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

          // Convert to blob and download
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `twibbon-${twibbon.name}.png`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);

              // Update download count
              updateDownloadCount();

              // Show share modal
              setShowShareModal(true);
            }
          }, "image/png");
        };
        userImg.src = userImage;
      };
      frameImg.src = twibbon.url;
    } catch (error) {
      console.error("Error creating twibbon:", error);
    } finally {
      setProcessing(false);
    }
  };

  const updateDownloadCount = async () => {
    try {
      const id = params?.id;
      if (!id) return;

      await fetch(`/api/twibbons/${id}`, {
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
    const id = params?.id;
    if (!id) return;

    const shareUrl = `${window.location.origin}/twibbon/${id}`;
    const shareText = `Check out this awesome twibbon: ${twibbon?.name}`;

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
      const id = params?.id;
      if (!id) return;

      await fetch(`/api/twibbons/${id}`, {
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
                        src={twibbon.url || "/images/placeholder.png"}
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
                      src={twibbon.url || "/images/placeholder.png"}
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
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-center">Atur Foto Anda</h3>

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
                <Image src="/images/icon-orang.png" alt="Dukungan" width={24} height={24} className="mr-2 w-6 h-6" />
                <span className="text-base">{(twibbon.downloads + twibbon.shares).toLocaleString()} dukungan</span>
              </div>
              <div className="flex items-center">
                <Image src="/images/icon-jam.png" alt="Waktu" width={24} height={24} className="mr-2 w-6 h-6" />
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

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Bagikan Twibbon Anda!</h3>
            <p className="text-gray-600 mb-6">Twibbon berhasil didownload! Bagikan ke teman-teman Anda.</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button onClick={() => shareTwibbon("whatsapp")} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors">
                WhatsApp
              </button>
              <button onClick={() => shareTwibbon("facebook")} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Facebook
              </button>
              <button onClick={() => shareTwibbon("twitter")} className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors">
                Twitter
              </button>
              <button onClick={() => shareTwibbon("instagram")} className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg transition-colors">
                Instagram
              </button>
            </div>

            <button onClick={() => setShowShareModal(false)} className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors">
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
