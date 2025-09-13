"use client";

import { useRef, useState, useEffect, ChangeEvent } from "react";
import { downloadCanvasImage } from "@/lib/utils/download";

type AnyTouch = Touch | React.Touch;

export default function TwibbonPage() {
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

  // load twibbon
  useEffect(() => {
    const img = new Image();
    img.src = "/uploads/CS_Teaser_Reels_18_Apr-1755153306963.png";
    img.onload = () => setOverlay(img);
  }, []);

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
      ctx.drawImage(foto, -w / 2, -h / 2, w, h);
      ctx.restore();
    }

    if (overlay) {
      ctx.drawImage(overlay, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  useEffect(() => {
    draw();
  });

  // upload foto
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        setFoto(img);
        setPos({
          x: 0,
          y: 0,
          scale: Math.min(500 / img.width, 500 / img.height),
          rotation: 0,
        });
      };
    };
    reader.readAsDataURL(file);
  };

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

  // ================= DOWNLOAD (Safari-friendly) =================
  const handleDownload = () => {
    if (!canvasRef.current) return;

    downloadCanvasImage(canvasRef.current, {
      filename: "hasil-twibbon.png",
      title: "Hasil Twibbon",
      description: "Hasil twibbon Anda berhasil dibuat! Simpan gambar ini ke galeri atau bagikan ke teman-teman.",
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Editor Twibbon (Desktop + Mobile)</h1>

      <input type="file" accept="image/*" onChange={handleUpload} />

      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border rounded shadow touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      <p className="text-sm text-gray-600">
        🖱 Drag = geser | Scroll = zoom | Shift+Scroll = rotate <br />
        📱 1 jari = drag | 2 jari pinch = zoom | 2 jari putar = rotate
      </p>

      <button onClick={handleDownload} className="px-4 py-2 bg-green-600 text-white rounded">
        Download
      </button>
    </div>
  );
}
