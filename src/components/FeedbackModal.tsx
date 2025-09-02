"use client";

import { useState } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [formData, setFormData] = useState({
    message: "",
    from: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.message.trim() || !formData.from.trim()) {
      alert("Mohon isi semua field yang diperlukan");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ message: "", from: "" });
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      } else {
        alert("Gagal mengirim feedback: " + data.error);
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      alert("Terjadi kesalahan saat mengirim feedback");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Kirim Feedback</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="p-6 bg-green-50 border-b border-green-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-800 font-medium">Feedback berhasil dikirim!</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Anda</label>
              <input
                type="text"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                placeholder="Masukkan nama Anda"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pesan Feedback</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                rows={4}
                placeholder="Tulis feedback Anda di sini..."
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
              Batal
            </button>
            <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md font-medium transition-colors">
              {loading ? "Mengirim..." : "Kirim Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
