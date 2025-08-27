"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Twibbon {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  downloads: number;
  shares: number;
  createdAt: string;
}

export default function TwibbonDetail() {
  const params = useParams();
  const router = useRouter();
  const [twibbon, setTwibbon] = useState<Twibbon | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const createTwibbon = async () => {
    if (!twibbon || !userImage || !canvasRef.current) return;

    setProcessing(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size
      canvas.width = 800;
      canvas.height = 800;

      // Load twibbon frame
      const frameImg = new window.Image();
      frameImg.crossOrigin = "anonymous";
      frameImg.onload = () => {
        // Draw frame
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

        // Load user image
        const userImg = new window.Image();
        userImg.crossOrigin = "anonymous";
        userImg.onload = () => {
          // Calculate position for user image (center)
          const userSize = Math.min(canvas.width * 0.6, canvas.height * 0.6);
          const x = (canvas.width - userSize) / 2;
          const y = (canvas.height - userSize) / 2;

          // Draw user image
          ctx.drawImage(userImg, x, y, userSize, userSize);

          // Convert to blob and download
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `twibbon-${twibbon.title}.png`;
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
      frameImg.src = twibbon.imageUrl;
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
    const shareText = `Check out this awesome twibbon: ${twibbon?.title}`;

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!twibbon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Twibbon tidak ditemukan</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              TWIBON
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {twibbon.downloads} downloads • {twibbon.shares} shares
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Twibbon Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{twibbon.title}</h1>
            {twibbon.description && <p className="text-gray-600 mb-6">{twibbon.description}</p>}

            {/* Twibbon Frame Preview */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Frame Twibbon</h3>
              <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <Image src={twibbon.imageUrl} alt={twibbon.title} fill className="object-contain" />
              </div>
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Upload Foto Anda</h3>

              {!userImage ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Pilih Foto
                  </button>
                  <p className="text-gray-500 mt-2">Format: JPG, PNG, GIF (Max 5MB)</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                    <Image src={userImage} alt="User uploaded image" fill className="object-cover" />
                  </div>
                  <div className="flex space-x-3">
                    <button onClick={() => fileInputRef.current?.click()} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Ganti Foto
                    </button>
                    <button onClick={() => setUserImage(null)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Hapus
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview & Download */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <button onClick={createTwibbon} disabled={!userImage || processing} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors">
                {processing ? "Memproses..." : "Download Twibbon"}
              </button>
            </div>
          </div>
        </div>
      </div>

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
