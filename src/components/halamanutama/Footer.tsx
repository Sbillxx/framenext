import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Main Footer Content - 2 Columns */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Branding */}
          <div className="flex flex-col space-y-3">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center">
                <Image src="/images/logobiru.png" alt="Frame ID Logo" width={120} height={40} className="h-25 w-auto" />
              </div>
            </Link>

            {/* Copyright */}
            <p className="text-xs text-gray-700">© 2025 Frame ID</p>
          </div>

          {/* Right Column - Language Selector and Links */}
          <div className="flex flex-col items-end space-y-4">
            {/* Language Selector */}
            <div className="flex items-center border border-gray-300 rounded-md py-2 px-3 bg-white cursor-pointer hover:border-gray-400 transition-colors">
              <span className="text-sm font-medium text-gray-700 mr-2">ID</span>
              <FaChevronDown className="w-3 h-3 text-gray-500" />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-end space-y-2">
              <Link href="#" className="text-sm text-[#0268f8] hover:underline transition-colors">
                Pusat Bantuan
              </Link>
              <Link href="#" className="text-sm text-[#0268f8] hover:underline transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="#" className="text-sm text-[#0268f8] hover:underline transition-colors">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
