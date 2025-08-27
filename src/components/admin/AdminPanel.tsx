"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Twibbon {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  downloads: number;
  shares: number;
  createdAt: string;
}

interface Feedback {
  id: number;
  message: string;
  from_name: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [twibbons, setTwibbons] = useState<Twibbon[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"twibbons" | "feedback">("twibbons");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTwibbon, setNewTwibbon] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [twibbonsRes, feedbacksRes] = await Promise.all([fetch("/api/twibbons"), fetch("/api/feedback")]);

      const twibbonsData = await twibbonsRes.json();
      const feedbacksData = await feedbacksRes.json();

      if (twibbonsData.success) {
        setTwibbons(twibbonsData.data);
      }

      if (feedbacksData.success) {
        setFeedbacks(feedbacksData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTwibbon = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/twibbons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTwibbon),
      });

      const data = await response.json();

      if (data.success) {
        setNewTwibbon({ title: "", description: "", imageUrl: "" });
        setShowAddForm(false);
        fetchData();
        alert("Twibbon berhasil ditambahkan!");
      } else {
        alert("Gagal menambahkan twibbon: " + data.error);
      }
    } catch (error) {
      console.error("Error adding twibbon:", error);
      alert("Terjadi kesalahan saat menambahkan twibbon");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0268f8] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <div className="flex items-center">
                  <Image src="/images/Logo Frameid White.png" alt="Frame ID Logo" width={120} height={40} className="h-8 w-auto" />
                </div>
              </Link>
              <span className="text-gray-500">|</span>
              <span className="text-lg font-medium text-gray-700">Admin Panel</span>
            </div>
            <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("twibbons")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "twibbons" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              Twibbons ({twibbons.length})
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "feedback" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              Feedback ({feedbacks.length})
            </button>
          </nav>
        </div>

        {/* Twibbons Tab */}
        {activeTab === "twibbons" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Kelola Twibbon</h2>
              <button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Tambah Twibbon
              </button>
            </div>

            {/* Add Twibbon Form */}
            {showAddForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Tambah Twibbon Baru</h3>
                <form onSubmit={handleAddTwibbon} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Twibbon</label>
                    <input
                      type="text"
                      value={newTwibbon.title}
                      onChange={(e) => setNewTwibbon({ ...newTwibbon, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea
                      value={newTwibbon.description}
                      onChange={(e) => setNewTwibbon({ ...newTwibbon, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar Frame</label>
                    <input
                      type="url"
                      value={newTwibbon.imageUrl}
                      onChange={(e) => setNewTwibbon({ ...newTwibbon, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/frame.png"
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Simpan
                    </button>
                    <button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Twibbons List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Twibbon</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {twibbons.map((twibbon) => (
                      <tr key={twibbon.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <Image className="h-12 w-12 rounded-lg object-cover" src={twibbon.imageUrl} alt={twibbon.title} width={48} height={48} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{twibbon.title}</div>
                              {twibbon.description && <div className="text-sm text-gray-500 truncate max-w-xs">{twibbon.description}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{twibbon.downloads}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{twibbon.shares}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(twibbon.createdAt).toLocaleDateString("id-ID")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Feedback dari User</h2>

            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-gray-900">{feedback.from_name}</div>
                    <div className="text-sm text-gray-500">{new Date(feedback.createdAt).toLocaleDateString("id-ID")}</div>
                  </div>
                  <p className="text-gray-700">{feedback.message}</p>
                </div>
              ))}

              {feedbacks.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada feedback</h3>
                  <p className="text-gray-600">Feedback dari user akan muncul di sini.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
