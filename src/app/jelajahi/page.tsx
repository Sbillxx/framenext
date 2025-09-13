"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllTwibbon } from "@/lib/action";

interface Twibbon {
  id: number;
  name: string;
  description: string;
  filename: string;
  url: string;
  downloads: number;
  shares: number;
  created_at: string;
  slug: string;
  thumbnail: string;
  creator?: string;
}

export default function JelajahiPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [twibbons, setTwibbons] = useState<Twibbon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("trending");
  const [filteredTwibbons, setFilteredTwibbons] = useState<Twibbon[]>([]);

  // Get search query from URL
  useEffect(() => {
    const searchQuery = searchParams?.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchTwibbons();
  }, []);

  useEffect(() => {
    filterAndSortTwibbons();
  });

  const fetchTwibbons = async () => {
    try {
      console.log("🚀 Jelajahi: Fetching twibbons using server action...");
      setLoading(true);

      // Menggunakan server action getAllTwibbon
      const result = await getAllTwibbon();

      if (result.success && result.data) {
        console.log("✅ Jelajahi: Twibbons loaded successfully:", result.count);
        setTwibbons(result.data);
      } else {
        console.error("❌ Jelajahi: Failed to fetch twibbons:", result.error);
        setTwibbons([]);
      }
    } catch (error) {
      console.error("❌ Jelajahi: Error fetching twibbons:", error);
      setTwibbons([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTwibbons = () => {
    const filtered = twibbons.filter((twibbon) => twibbon.name.toLowerCase().includes(searchTerm.toLowerCase()) || twibbon.description?.toLowerCase().includes(searchTerm.toLowerCase()));

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "trending":
        case "newest":
        case "popular":
        case "most_shared":
          // Since we don't have downloads/shares, sort by newest
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    setFilteredTwibbons(sorted);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "baru saja";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} bulan yang lalu`;
    return `${Math.floor(diffInSeconds / 31536000)} tahun yang lalu`;
  };

  // const formatNumber = (num: number) => {
  //   if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  //   if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  //   return num.toString();
  // };

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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              TWIBON
            </Link>
            <nav className="flex items-center space-x-8">
              <Link href="/jelajahi" className="text-blue-600 font-medium">
                Jelajahi
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Beranda
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Sort Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Jelajahi Twibbon</h1>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Cari Campaign..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:w-64">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="trending">Urut berdasarkan: Trending</option>
                <option value="newest">Terbaru</option>
                <option value="popular">Terpopuler</option>
                <option value="most_shared">Terbanyak Dibagikan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">{filteredTwibbons.length} twibbon ditemukan</p>
        </div>

        {/* Twibbon Grid */}
        {filteredTwibbons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTwibbons.map((twibbon) => (
              <div key={twibbon.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(`/twibbon/${twibbon.slug}`)}>
                {/* Twibbon Image */}
                <div className="relative h-48 bg-gray-200">
                  <Image src={`/api/images/twibbons/thumbnail/${twibbon.thumbnail}`} alt={twibbon.name} fill className="object-contain" />
                </div>

                {/* Twibbon Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{twibbon.name}</h3>

                  {twibbon.description && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{twibbon.description}</p>}

                  {/* Creator */}
                  <div className="text-sm text-gray-500 mb-3">{twibbon.creator || "Anonymous"}</div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{(twibbon.downloads + twibbon.shares).toLocaleString()} dukungan</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{formatTimeAgo(twibbon.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada twibbon ditemukan</h3>
            <p className="text-gray-600">Coba ubah kata kunci pencarian atau filter yang Anda gunakan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
