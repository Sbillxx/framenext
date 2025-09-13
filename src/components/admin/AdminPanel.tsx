"use client";

// import { useState, useEffect } from "react";
import { useActionState, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// import Link from "next/link";
import Footer from "../halamanutama/Footer";
import CroppingModal from "./CroppingModal";
import { StateProps } from "@/lib/types";
import { SimpanTwibbon } from "@/lib/crud/twibbon/action";
import { useDynamicUrl } from "@/hooks/useDynamicUrl";

// Interface yang sama seperti TwibbonList
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
}

// Edit Twibbon Modal Component
const EditTwibbonModal = ({ twibbon, onClose, onSave }: { twibbon: Twibbon; onClose: () => void; onSave: (data: Partial<Twibbon>) => void }) => {
  const [name, setName] = useState(twibbon.name || "");
  const [description, setDescription] = useState(twibbon.description || "");
  const [slug, setSlug] = useState(twibbon.slug || "");
  const { getDisplayUrl } = useDynamicUrl();

  const handleSave = () => {
    onSave({ name, description, slug });
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Twibbon</h3>

        <div className="space-y-4">
          {/* Name/Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="Masukkan judul twibbon"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="Masukkan deskripsi twibbon"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">{getDisplayUrl()}</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="link-kampanye"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl font-medium transition-all duration-200">
            Batal
          </button>
          <button onClick={handleSave} className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg">
            Simpan
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const AdminPanel = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showNextStep, setShowNextStep] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignLink, setCampaignLink] = useState("");
  const { getDisplayUrl } = useDynamicUrl();

  // Cropping states
  const [showCroppingModal, setShowCroppingModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  // Success notification state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Error notification state
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Navigation state
  const [activeTab, setActiveTab] = useState<"upload" | "list">("upload");

  // List state - sama seperti TwibbonList
  const [twibbons, setTwibbons] = useState<Twibbon[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingTwibbon, setEditingTwibbon] = useState<Twibbon | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingTwibbon, setDeletingTwibbon] = useState<Twibbon | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setShowNextStep(false);
  };

  const handleNextStep = () => {
    if (imagePreview) {
      setShowNextStep(true);
    }
  };

  const handleBack = () => {
    setShowNextStep(false);
  };

  const handlePublish = () => {
    // Handle publish logic here
    console.log("Publishing campaign:", {
      campaignTitle,
      campaignDescription,
      campaignLink,
    });
  };

  const handleOpenCropping = () => {
    setShowCroppingModal(true);
  };

  const handleCloseCropping = () => {
    setShowCroppingModal(false);
  };

  const handleCropComplete = (croppedImageData: string) => {
    setCroppedImage(croppedImageData);
    setShowCroppingModal(false);
  };

  const handleSuccess = () => {
    setShowSuccessModal(false);
    // Reset semua state ke kondisi awal
    setImagePreview(null);
    setShowNextStep(false);
    setCampaignTitle("");
    setCampaignDescription("");
    setCampaignLink("");
    setCroppedImage(null);
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const handleLogout = () => {
    // Clear any stored session data
    localStorage.removeItem("adminToken");
    sessionStorage.clear();

    // Redirect to login page or home page
    window.location.href = "/adminlogin";
  };

  const handleGoHome = () => {
    // Redirect to home page
    window.location.href = "/";
  };

  // Fetch twibbons - sama seperti pattern TwibbonList
  const fetchTwibbons = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/twibbons");
      const data = await response.json();
      if (data.success) {
        setTwibbons(data.data);
      } else {
        handleError("Gagal mengambil data twibbon");
      }
    } catch {
      handleError("Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit twibbon
  const handleEditTwibbon = (twibbon: Twibbon) => {
    setEditingTwibbon(twibbon);
    setShowEditModal(true);
  };

  // Handle delete twibbon
  const handleDeleteTwibbon = (twibbon: Twibbon) => {
    setDeletingTwibbon(twibbon);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deletingTwibbon) return;

    try {
      // Update existing twibbon via API endpoint yang sudah ada
      const response = await fetch("/api/twibbons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delete",
          id: deletingTwibbon.id,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setShowSuccessModal(true);
        fetchTwibbons(); // Refresh list
      } else {
        handleError("Gagal menghapus twibbon");
      }
    } catch {
      handleError("Terjadi kesalahan saat menghapus twibbon");
    } finally {
      setShowDeleteModal(false);
      setDeletingTwibbon(null);
    }
  };

  // Save edit
  const saveEdit = async (editedData: Partial<Twibbon>) => {
    if (!editingTwibbon) return;

    try {
      // Update existing twibbon via API endpoint yang sudah ada
      const response = await fetch("/api/twibbons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          id: editingTwibbon.id,
          ...editedData,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setShowSuccessModal(true);
        fetchTwibbons(); // Refresh list
      } else {
        handleError("Gagal mengupdate twibbon");
      }
    } catch {
      handleError("Terjadi kesalahan saat mengupdate twibbon");
    } finally {
      setShowEditModal(false);
      setEditingTwibbon(null);
    }
  };

  const [state, formAction, isPending] = useActionState(async (prevState: StateProps | undefined, formData: FormData) => {
    if (!imagePreview) {
      handleError("Gambar twibbon belum diupload!");
      return prevState;
    }
    if (!croppedImage) {
      handleError("Thumbnail belum dibuat! Silakan klik tombol 'Atur Thumbnail' terlebih dahulu.");
      return prevState;
    }
    formData.append("image64", imagePreview);
    formData.append("thumbnail", croppedImage);
    return await SimpanTwibbon(prevState, formData);
  }, undefined);

  // Handle success state
  useEffect(() => {
    if (state?.status === 200) {
      setShowSuccessModal(true);
    }
  }, [state?.status]);

  // Fetch twibbons when list tab is active
  useEffect(() => {
    if (activeTab === "list") {
      fetchTwibbons();
    }
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(state?.status);
  const error = state && state.fields ? JSON.parse(state.fields) : null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Desktop Navbar */}
      <nav className="hidden sm:block w-full bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Left: Frame ID Logo + Navigation Tabs */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={handleGoHome} className="hover:opacity-80 transition-opacity duration-200">
              <Image src="/images/frameidbiru.png" alt="Frame ID Logo" width={120} height={40} className="h-6 sm:h-8 w-auto" />
            </button>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${activeTab === "upload" ? "bg-[#0268f8] text-white shadow-md" : "text-gray-600 hover:text-[#0268f8] hover:bg-gray-100"}`}
              >
                Upload
              </button>
              <button
                onClick={() => setActiveTab("list")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${activeTab === "list" ? "bg-[#0268f8] text-white shadow-md" : "text-gray-600 hover:text-[#0268f8] hover:bg-gray-100"}`}
              >
                List Twibbon
              </button>
            </div>
          </div>

          {/* Right: Logout Button */}
          <button onClick={handleLogout} className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-105 group">
            <svg className="w-5 h-5 text-red-500 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Top Navbar */}
      <nav className="sm:hidden w-full bg-white border-b border-gray-200 px-3 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Frame ID Logo */}
          <button onClick={handleGoHome} className="hover:opacity-80 transition-opacity duration-200">
            <Image src="/images/frameidbiru.png" alt="Frame ID Logo" width={120} height={40} className="h-6 w-auto" />
          </button>

          {/* Right: Logout Button */}
          <button onClick={handleLogout} className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-105 group">
            <svg className="w-5 h-5 text-red-500 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </nav>
      {/* Main Content Area */}
      <main className="flex-1 px-3 sm:px-4 py-4 sm:py-6 lg:py-8 pb-20 sm:pb-4">
        <div className="max-w-5xl mx-auto">
          {/* Upload Tab Content */}
          {activeTab === "upload" && (
            <>
              {!showNextStep ? (
                <>
                  {/* Upload Section / Frame Preview */}
                  <div className="mb-4 sm:mb-6 lg:mb-8">
                    {!imagePreview ? (
                      // Upload Area
                      <label htmlFor="image-upload" className="block">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl lg:rounded-4xl p-3 sm:p-4 md:p-6 lg:p-8 text-center hover:border-[#0268f8] hover:bg-[#0268f8]/5 transition-all duration-300 cursor-pointer w-full max-w-5xl mx-auto aspect-[16/9] flex flex-col justify-center transform hover:scale-[1.02] hover:shadow-lg">
                          <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                          {/* Cloud Upload Icon */}
                          <div className="mb-2 sm:mb-3 lg:mb-4">
                            <svg className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#0268f8] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          {/* Upload Text */}
                          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2">Upload desainmu disini</h3>
                          {/* Upload Specifications */}
                          <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                            <p>Tipe: PNG</p>
                            <p>Ukuran Maksimum: 5 MB</p>
                            <p>Rekomendasi: 1080x1080px</p>
                          </div>
                        </div>
                      </label>
                    ) : (
                      // Frame Preview Area
                      <div className="border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl lg:rounded-4xl p-3 sm:p-4 md:p-6 lg:p-8 text-center w-full max-w-5xl mx-auto aspect-[16/9] flex items-center justify-center relative bg-gray-50">
                        {/* Simple Image Preview */}
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image src={imagePreview} alt="Uploaded frame" width={800} height={600} className="max-w-full max-h-full object-contain rounded-lg" />

                          {/* Trash Button */}
                          <button
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                    <button className="w-full sm:w-auto px-3 sm:px-4 lg:px-6 py-2 border border-gray-300 rounded-xl sm:rounded-2xl lg:rounded-4xl text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:scale-105 hover:shadow-md transition-all duration-200 text-sm sm:text-base">
                      Batalkan
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={!imagePreview}
                      className={`w-full sm:w-auto px-3 sm:px-4 lg:px-6 py-2 rounded-xl sm:rounded-2xl lg:rounded-4xl text-sm sm:text-base transition-all duration-200 ${
                        imagePreview ? "bg-[#0268f8] text-white hover:bg-[#0256d6] hover:scale-105 hover:shadow-md" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Selanjutnya
                    </button>
                  </div>
                </>
              ) : (
                // Next Step: Campaign Details Form
                <div className="bg-white rounded-2xl lg:rounded-4xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                  <form action={formAction} className="space-y-4 sm:space-y-6 lg:space-y-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pb-4 sm:pb-6 border-b border-gray-100">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Rincian Kampanye</h1>
                      </div>
                      <button
                        onClick={handleBack}
                        type="button"
                        className="w-full sm:w-auto px-4 sm:px-6 lg:px-7 py-2 sm:py-3 bg-white border-2 border-gray-300 text-black hover:bg-gray-50 hover:border-gray-400 rounded-xl sm:rounded-2xl font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                      >
                        Kembali
                      </button>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                      {/* Left: Frame Preview */}
                      <div className="space-y-4 sm:space-y-5">
                        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8">
                          <div className="relative w-full flex items-center justify-center">
                            <Image
                              src={croppedImage || imagePreview!}
                              alt="Frame preview"
                              width={400}
                              height={400}
                              className="max-w-full max-h-64 sm:max-h-80 lg:max-h-96 object-contain rounded-lg shadow-sm"
                              style={{ width: "auto", height: "auto" }}
                            />
                          </div>
                        </div>

                        {/* Set Thumbnail Button */}
                        <button
                          onClick={handleOpenCropping}
                          type="button"
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl lg:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg text-sm sm:text-base font-medium"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Atur Thumbnail
                        </button>
                      </div>

                      {/* Right: Form */}
                      <div className="space-y-5 sm:space-y-6 lg:space-y-7">
                        {/* Campaign Title */}
                        <div>
                          <motion.label className="block text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            Judul Kampanye
                          </motion.label>
                          <motion.input
                            type="text"
                            value={campaignTitle}
                            name="title"
                            onChange={(e) => setCampaignTitle(e.target.value)}
                            placeholder="Dapat berupa angka, tulisan atau karakter special"
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base hover:border-gray-300 shadow-sm focus:shadow-md"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            whileFocus={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          />
                          {error && error?.title?.[0] && <span className="text-xs sm:text-sm text-red-500 mt-1 block">{error.title[0]}</span>}
                        </div>

                        {/* Campaign Description */}
                        <div>
                          <motion.label className="block text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
                            Deskripsi (Opsional)
                          </motion.label>
                          <div className="relative">
                            <motion.textarea
                              value={campaignDescription}
                              name="desc"
                              onChange={(e) => setCampaignDescription(e.target.value)}
                              placeholder="Bagikan rincian tentang kampanyemu untuk menarik dukungan"
                              rows={4}
                              maxLength={250}
                              className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-gray-900 placeholder-gray-500 text-sm sm:text-base hover:border-gray-300 shadow-sm focus:shadow-md"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.3 }}
                              whileFocus={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            />
                            {error && error?.desc?.[0] && <span className="text-xs sm:text-sm text-red-500 mt-1 block">{error.desc[0]}</span>}
                            <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-1 rounded">{campaignDescription.length}/250</div>
                          </div>
                        </div>

                        {/* Campaign Link */}
                        <div>
                          <motion.label className="block text-sm sm:text-base font-medium text-gray-900 mb-2 sm:mb-3" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
                            Link Kampanye
                          </motion.label>
                          <motion.div
                            className="flex rounded-xl lg:rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200 shadow-sm focus-within:shadow-md"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                          >
                            <span className="inline-flex items-center px-3 sm:px-4 lg:px-5 py-3 sm:py-4 bg-gray-50 text-gray-600 text-xs sm:text-sm font-medium border-r border-gray-200">{getDisplayUrl()}</span>
                            <motion.input
                              type="text"
                              value={campaignLink}
                              name="slug"
                              onChange={(e) => setCampaignLink(e.target.value)}
                              placeholder="link-kampanye"
                              className="flex-1 px-3 sm:px-4 py-3 sm:py-4 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:outline-none"
                              whileTap={{ scale: 0.99 }}
                            />
                          </motion.div>
                          {error && error?.slug?.[0] && <span className="text-xs sm:text-sm text-red-500 mt-1 block">{error.slug[0]}</span>}
                        </div>

                        {/* Publish Button */}
                        <div className="pt-3 sm:pt-5">
                          <button
                            onClick={handlePublish}
                            type="submit"
                            disabled={!campaignTitle.trim() || isPending}
                            className={`w-full px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl lg:rounded-2xl font-semibold transition-all duration-200 text-sm sm:text-base shadow-lg ${
                              campaignTitle.trim() ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-[1.02] hover:shadow-xl" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {isPending ? (
                              <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sedang dipublish...
                              </span>
                            ) : (
                              "Publikasikan"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}

          {/* List Twibbon Tab Content */}
          {activeTab === "list" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Daftar Twibbon</h1>
                <div className="text-sm text-gray-500">
                  Total: <span className="font-semibold">{twibbons.length} twibbon</span>
                </div>
              </div>

              {loading ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Memuat data...</h3>
                </div>
              ) : twibbons.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada twibbon</h3>
                  <p className="text-gray-600 mb-4">Mulai buat twibbon pertama Anda di tab Upload</p>
                  <button onClick={() => setActiveTab("upload")} className="px-6 py-3 bg-[#0268f8] hover:bg-[#0256d6] text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg">
                    Buat Twibbon
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {twibbons.map((twibbon) => (
                    <div key={twibbon.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
                      {/* Thumbnail - sama seperti TwibbonList */}
                      <div className="aspect-square bg-gray-100 relative">{twibbon.thumbnail && <Image src={`/api/images/twibbons/thumbnail/${twibbon.thumbnail}`} alt={twibbon.name} fill className="object-cover" />}</div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{twibbon.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{twibbon.description}</p>
                        <p className="text-xs text-gray-500 mb-2">
                          {getDisplayUrl()}
                          {twibbon.slug}
                        </p>
                        <div className="text-xs text-gray-400 mb-4">{(twibbon.downloads + twibbon.shares).toLocaleString()} dukungan</div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button onClick={() => handleEditTwibbon(twibbon)} className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors duration-200">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteTwibbon(twibbon)} className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors duration-200">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="flex items-center justify-around py-2">
          {/* Upload Tab */}
          <button onClick={() => setActiveTab("upload")} className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 ${activeTab === "upload" ? "text-[#0268f8]" : "text-gray-500"}`}>
            <div className={`w-6 h-6 mb-1 ${activeTab === "upload" ? "text-[#0268f8]" : "text-gray-500"}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <span className="text-xs font-medium">Upload</span>
          </button>

          {/* List Twibbon Tab */}
          <button onClick={() => setActiveTab("list")} className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 ${activeTab === "list" ? "text-[#0268f8]" : "text-gray-500"}`}>
            <div className={`w-6 h-6 mb-1 ${activeTab === "list" ? "text-[#0268f8]" : "text-gray-500"}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-xs font-medium">List</span>
          </button>
        </div>
      </div>

      {/* Cropping Modal */}
      {showCroppingModal && <CroppingModal twibbonFrame={imagePreview!} onClose={handleCloseCropping} onCropComplete={handleCropComplete} />}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 text-center">
            {/* Success Icon */}
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">Berhasil Dipublikasi!</h3>
            <p className="text-gray-600 mb-6">Twibbon kampanye Anda telah berhasil dipublikasi dan siap digunakan.</p>

            {/* Action Button */}
            <button onClick={handleSuccess} className="w-full px-6 py-3 bg-[#0268f8] hover:bg-[#0256d6] text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Buat Twibbon Baru
            </button>
          </motion.div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 text-center">
            {/* Error Icon */}
            <div className="mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">Perhatian!</h3>
            <p className="text-gray-600 mb-6">{errorMessage}</p>

            {/* Action Button */}
            <button onClick={closeErrorModal} className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Oke, Saya Mengerti
            </button>
          </motion.div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingTwibbon && <EditTwibbonModal twibbon={editingTwibbon} onClose={() => setShowEditModal(false)} onSave={saveEdit} />}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingTwibbon && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 text-center">
            {/* Warning Icon */}
            <div className="mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>

            {/* Confirmation Message */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">Hapus Twibbon</h3>
            <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus twibbon &quot;{deletingTwibbon.name}&quot;? Tindakan ini tidak dapat dibatalkan.</p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl font-medium transition-all duration-200">
                Batal
              </button>
              <button onClick={confirmDelete} className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg">
                Hapus
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
