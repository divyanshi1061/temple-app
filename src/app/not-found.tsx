import Link from "next/link";
import { FaHome, FaArrowLeft } from "react-icons/fa";

export const metadata = {
  title: "404 Page Not Found | Pandit Maa Baglamukhi Nalkheda Dham",
  description: "The page you are looking for does not exist. Return to Pandit Maa Baglamukhi temple website home for booking Vedic Pujas and Havans.",
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-sacred-white flex flex-col items-center justify-center pt-28 pb-16 px-6 font-outfit text-gray-800 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full text-center bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden z-10">
        {/* Spiritual top gold stripe */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-600 via-gold to-amber-600" />
        
        {/* Sacred Om Symbol Icon container */}
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold text-4xl mx-auto mb-6 shadow-inner">
          <span className="font-cinzel select-none font-bold">ॐ</span>
        </div>
        
        {/* Error Code */}
        <span className="text-xs font-bold font-cinzel text-gold tracking-[0.25em] uppercase">
          त्रुटि / Error 404
        </span>
        
        {/* Title */}
        <h1 className="text-xl md:text-2xl font-black font-cinzel text-gray-900 mt-2 mb-4 uppercase tracking-tight">
          Page Not Found / अप्राप्य पृष्ठ
        </h1>
        
        {/* Details */}
        <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved. 
          <br />
          <span className="text-[11px] text-gray-400 mt-1 block">
            खोज गया पृष्ठ उपलब्ध नहीं है या हटा दिया गया है।
          </span>
        </p>

        {/* Action Button */}
        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-semibold text-xs md:text-sm tracking-wide shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
        >
          <FaHome size={15} />
          <span>Return to Home / मुख्य पृष्ठ</span>
        </Link>

        {/* Direct Subpages Links */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-5 text-xs font-bold text-gray-500">
          <Link href="/services" className="hover:text-gold transition-colors">
            Services / सेवाएं
          </Link>
          <span className="text-gray-200">|</span>
          <Link href="/about" className="hover:text-gold transition-colors">
            About / परिचय
          </Link>
          <span className="text-gray-200">|</span>
          <Link href="/gallery" className="hover:text-gold transition-colors">
            Gallery / गैलरी
          </Link>
        </div>
      </div>
    </main>
  );
}
