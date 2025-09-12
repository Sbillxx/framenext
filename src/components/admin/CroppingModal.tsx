"use client";

import { useRef, useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnyTouch = Touch | React.Touch;

interface CroppingModalProps {
  twibbonFrame: string; // Bingkai twibbon yang sudah diupload
  onClose: () => void;
  onCropComplete: (croppedImageData: string) => void;
}

export default function CroppingModal({ twibbonFrame, onClose, onCropComplete }: CroppingModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [foto, setFoto] = useState<HTMLImageElement | null>(null);
  const [overlay, setOverlay] = useState<HTMLImageElement | null>(null);

  // posisi & transformasi foto
  const [pos, setPos] = useState({ x: 0, y: 0, scale: 1, rotation: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // untuk pinch zoom & rotate
  const [lastTouchDist, setLastTouchDist] = useState<number | null>(null);
  const [lastTouchAngle, setLastTouchAngle] = useState<number | null>(null);

  // upload foto pribadi
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        setFoto(img);
        // Hitung scale agar foto fit di dalam area frame twibbon
        const canvasSize = 500;

        // Jika ada overlay (frame twibbon), hitung area yang bisa digunakan
        if (overlay) {
          // Hitung area frame yang bisa digunakan (misalnya 60% dari canvas)
          const frameAreaSize = canvasSize * 0.6;
          const scaleX = frameAreaSize / img.width;
          const scaleY = frameAreaSize / img.height;
          const scale = Math.min(scaleX, scaleY) * 0.8; // 0.8 untuk margin

          // Center the image
          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;

          setPos({
            x: (canvasSize - scaledWidth) / 2,
            y: (canvasSize - scaledHeight) / 2,
            scale: scale,
            rotation: 0,
          });
        } else {
          // Fallback jika belum ada overlay
          const scaleX = canvasSize / img.width;
          const scaleY = canvasSize / img.height;
          const scale = Math.min(scaleX, scaleY) * 0.6;

          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;

          setPos({
            x: (canvasSize - scaledWidth) / 2,
            y: (canvasSize - scaledHeight) / 2,
            scale: scale,
            rotation: 0,
          });
        }
      };
    };
    reader.readAsDataURL(file);
  };

  // load twibbon frame as overlay
  useEffect(() => {
    const img = new Image();
    img.src = twibbonFrame;
    img.onload = () => {
      setOverlay(img);
      // Jika sudah ada foto, atur ulang posisinya agar fit di frame
      if (foto) {
        const canvasSize = 500;
        const frameAreaSize = canvasSize * 0.6;
        const scaleX = frameAreaSize / foto.width;
        const scaleY = frameAreaSize / foto.height;
        const scale = Math.min(scaleX, scaleY) * 0.8;

        const scaledWidth = foto.width * scale;
        const scaledHeight = foto.height * scale;

        setPos({
          x: (canvasSize - scaledWidth) / 2,
          y: (canvasSize - scaledHeight) / 2,
          scale: scale,
          rotation: 0,
        });
      }
    };
  }, [twibbonFrame, foto]);

  const draw = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (foto) {
      const w = foto.width * pos.scale;
      const h = foto.height * pos.scale;

      ctx.save();
      ctx.translate(pos.x + w / 2, pos.y + h / 2); // pindah ke tengah gambar
      ctx.rotate((pos.rotation * Math.PI) / 180); // rotasi
      // Draw image dengan aspect ratio yang benar - tidak stretch
      ctx.drawImage(foto, -w / 2, -h / 2, w, h);
      ctx.restore();
    }

    if (overlay) {
      // Draw overlay dengan aspect ratio yang benar - tidak stretch
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;

      // Hitung scale agar overlay fit tanpa stretch
      const scaleX = canvasWidth / overlay.width;
      const scaleY = canvasHeight / overlay.height;
      const scale = Math.min(scaleX, scaleY);

      // Hitung ukuran dan posisi yang benar
      const scaledWidth = overlay.width * scale;
      const scaledHeight = overlay.height * scale;
      const x = (canvasWidth - scaledWidth) / 2;
      const y = (canvasHeight - scaledHeight) / 2;

      ctx.drawImage(overlay, x, y, scaledWidth, scaledHeight);
    }
  };

  useEffect(() => {
    draw();
  });

  // ================= DESKTOP (mouse + scroll) =================
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!foto) return;
    setDragging(true);
    setOffset({
      x: e.nativeEvent.offsetX - pos.x,
      y: e.nativeEvent.offsetY - pos.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    setPos((prev) => ({
      ...prev,
      x: e.nativeEvent.offsetX - offset.x,
      y: e.nativeEvent.offsetY - offset.y,
    }));
  };

  const handleMouseUp = () => setDragging(false);

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!foto) return;
    e.preventDefault();

    if (e.shiftKey) {
      // rotate dengan shift + scroll
      setPos((prev) => ({
        ...prev,
        rotation: prev.rotation + (e.deltaY < 0 ? 5 : -5),
      }));
    } else {
      // zoom normal
      const scaleFactor = e.deltaY < 0 ? 1.05 : 0.95;
      setPos((prev) => ({
        ...prev,
        scale: Math.max(0.1, prev.scale * scaleFactor),
      }));
    }
  };

  // ================= MOBILE (touch gestures) =================
  const getDistance = (t1: AnyTouch, t2: AnyTouch) => Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

  const getAngle = (t1: AnyTouch, t2: AnyTouch) => (Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * 180) / Math.PI;

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!foto) return;
    if (e.touches.length === 1) {
      // drag
      const t = e.touches[0];
      setDragging(true);
      setOffset({ x: t.clientX - pos.x, y: t.clientY - pos.y });
    } else if (e.touches.length === 2) {
      // pinch & rotate
      const dist = getDistance(e.touches[0], e.touches[1]);
      const angle = getAngle(e.touches[0], e.touches[1]);
      setLastTouchDist(dist);
      setLastTouchAngle(angle);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!foto) return;
    if (e.touches.length === 1 && dragging) {
      const t = e.touches[0];
      setPos((prev) => ({
        ...prev,
        x: t.clientX - offset.x,
        y: t.clientY - offset.y,
      }));
    } else if (e.touches.length === 2 && lastTouchDist && lastTouchAngle !== null) {
      const newDist = getDistance(e.touches[0], e.touches[1]);
      const newAngle = getAngle(e.touches[0], e.touches[1]);

      setPos((prev) => ({
        ...prev,
        scale: Math.max(0.1, prev.scale * (newDist / lastTouchDist)),
        rotation: prev.rotation + (newAngle - lastTouchAngle),
      }));

      setLastTouchDist(newDist);
      setLastTouchAngle(newAngle);
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
    setLastTouchDist(null);
    setLastTouchAngle(null);
  };

  // ================= DOWNLOAD =================
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const croppedData = canvasRef.current.toDataURL("image/png");
    onCropComplete(croppedData);
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Atur Thumbnail</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Upload Photo Section */}
          {!foto && (
            <div className="mb-4 sm:mb-6">
              <label htmlFor="photo-upload" className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-8 text-center hover:border-[#0268f8] hover:bg-[#0268f8]/5 transition-all duration-300 cursor-pointer">
                  <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <div className="mb-3 sm:mb-4">
                    <svg className="w-8 h-8 sm:w-12 sm:h-12 text-[#0268f8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Upload Foto Pribadi</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Pilih foto yang akan dipasang di dalam bingkai twibbon</p>
                </div>
              </label>
            </div>
          )}

          {/* Canvas */}
          {foto && (
            <div className="flex flex-col items-center gap-4">
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="border rounded shadow touch-none w-full max-w-sm sm:max-w-md max-h-80 sm:max-h-96"
                style={{ aspectRatio: "1/1" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />

              <p className="text-xs sm:text-sm text-gray-600 text-center px-4">
                🖱 Drag = geser | Scroll = zoom | Shift+Scroll = rotate <br />
                📱 1 jari = drag | 2 jari pinch = zoom | 2 jari putar = rotate
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <button onClick={() => setFoto(null)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl transition-all duration-200 text-sm sm:text-base">
                  Upload Ulang
                </button>
                <button onClick={onClose} className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl transition-all duration-200 text-sm sm:text-base">
                  Batal
                </button>
                <button onClick={handleDownload} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm sm:text-base">
                  Simpan Thumbnail
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons when no photo uploaded */}
          {!foto && (
            <div className="flex gap-4 justify-center">
              <button onClick={onClose} className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl transition-all duration-200 text-sm sm:text-base w-full sm:w-auto">
                Batal
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
