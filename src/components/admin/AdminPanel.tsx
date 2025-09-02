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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
        setTwibbons(twibbonsData.data || []);
      }

      if (feedbacksData.success) {
        setFeedbacks(feedbacksData.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Set empty arrays on error
      setTwibbons([]);
      setFeedbacks([]);
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-[#0268f8] text-white transition-all duration-300 ease-in-out ${sidebarCollapsed ? "w-16" : "w-64"}`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-blue-600">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center">
                <Image src="/images/Logo Frameid White.png" alt="Frame ID Logo" width={100} height={32} className="h-6 w-auto" />
              </div>
            )}
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 rounded-lg hover:bg-blue-600 transition-colors">
              {sidebarCollapsed ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-2">
          <button onClick={() => setActiveTab("twibbons")} className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === "twibbons" ? "bg-blue-600 text-white" : "text-blue-100 hover:bg-blue-600 hover:text-white"}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {!sidebarCollapsed && <span className="ml-3">Twibbons</span>}
          </button>

          <button onClick={() => setActiveTab("feedback")} className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === "feedback" ? "bg-blue-600 text-white" : "text-blue-100 hover:bg-blue-600 hover:text-white"}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {!sidebarCollapsed && <span className="ml-3">Feedback</span>}
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-600">
          <Link href="/" className="flex items-center p-3 rounded-lg text-blue-100 hover:bg-blue-600 hover:text-white transition-colors">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {!sidebarCollapsed && <span className="ml-3">Kembali ke Beranda</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{activeTab === "twibbons" ? "Kelola Twibbon" : "Feedback dari User"}</h1>
                <p className="text-sm text-gray-600 mt-1">{activeTab === "twibbons" ? `Total: ${twibbons.length} twibbon` : `Total: ${feedbacks.length} feedback`}</p>
              </div>

              {activeTab === "twibbons" && (
                <button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Tambah Twibbon
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
          {/* Twibbons Tab */}
          {activeTab === "twibbons" && (
            <div>
              {/* Add Twibbon Form */}
              {showAddForm && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Tambah Twibbon Baru</h3>
                    <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleAddTwibbon} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Judul Twibbon</label>
                        <input
                          type="text"
                          value={newTwibbon.title}
                          onChange={(e) => setNewTwibbon({ ...newTwibbon, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar Frame</label>
                        <input
                          type="url"
                          value={newTwibbon.imageUrl}
                          onChange={(e) => setNewTwibbon({ ...newTwibbon, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                          placeholder="https://example.com/frame.png"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                      <textarea
                        value={newTwibbon.description}
                        onChange={(e) => setNewTwibbon({ ...newTwibbon, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                        rows={3}
                      />
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Simpan
                      </button>
                      <button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Twibbons List */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
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
                      {twibbons.length > 0 ? (
                        twibbons.map((twibbon) => (
                          <tr key={twibbon.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-12 w-12">
                                  {twibbon.imageUrl ? (
                                    <Image className="h-12 w-12 rounded-lg object-cover" src={twibbon.imageUrl} alt={twibbon.title || "Twibbon Image"} width={48} height={48} />
                                  ) : (
                                    <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                      <span className="text-gray-400 text-xs">No Image</span>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{twibbon.title || "Untitled"}</div>
                                  {twibbon.description && <div className="text-sm text-gray-500 truncate max-w-xs">{twibbon.description}</div>}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{twibbon.downloads || 0}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{twibbon.shares || 0}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{twibbon.createdAt ? new Date(twibbon.createdAt).toLocaleDateString("id-ID") : "N/A"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                            Belum ada twibbon. Tambahkan twibbon pertama!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden p-4 space-y-4">
                  {twibbons.length > 0 ? (
                    twibbons.map((twibbon) => (
                      <div key={twibbon.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 h-16 w-16">
                            {twibbon.imageUrl ? (
                              <Image className="h-16 w-16 rounded-lg object-cover" src={twibbon.imageUrl} alt={twibbon.title || "Twibbon Image"} width={64} height={64} />
                            ) : (
                              <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 mb-1">{twibbon.title || "Untitled"}</div>
                            {twibbon.description && <div className="text-sm text-gray-500 mb-2 line-clamp-2">{twibbon.description}</div>}
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                              <div>Downloads: {twibbon.downloads || 0}</div>
                              <div>Shares: {twibbon.shares || 0}</div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{twibbon.createdAt ? new Date(twibbon.createdAt).toLocaleDateString("id-ID") : "N/A"}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">Belum ada twibbon. Tambahkan twibbon pertama!</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === "feedback" && (
            <div>
              <div className="space-y-4">
                {feedbacks.length > 0 ? (
                  feedbacks.map((feedback) => (
                    <div key={feedback.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-1 sm:space-y-0">
                        <div className="font-medium text-gray-900 flex items-center">
                          <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {feedback.from_name || "Anonymous"}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString("id-ID") : "N/A"}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{feedback.message || "No message"}</p>
                    </div>
                  ))
                ) : (
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
    </div>
  );
}
