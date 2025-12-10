import React, { useState } from 'react';
import { Copy, MessageCircle, Instagram, Send } from 'lucide-react';
import focasLogo from "../../../public/files/logos/focas.png"
import { PaymentContext } from '../../context/PaymentContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { loadMetaPixel } from '../../utils/metaPixel';

export default function PlannerSuccessPage() {
  const [popup, setPopup] = useState('');
  
 const { paymentData } = useContext(PaymentContext);

 useEffect(() => {
  // Load Meta Pixel script
  loadMetaPixel();

  // FIRE PURCHASE EVENT
  window.fbq("track", "Purchase", {
    value: paymentData?.amount || 0,   // Put your amount field
    currency: "INR",
    phone: paymentData?.phoneNumber,
  });
}, []);


  // Hardcoded content - customize here
  const content = {
    heading: '✅ Order Successful',
    subtitle1: "Thank you for your purchase!",
    subtitle2: "Your FOCAS Planner is officially on its way to you.You're one step closer to building clarity, consistency, and exam-ready confidence.",
    mainMessage: '🎯 You’re now on a Roadmap to Achievement!',
    contactPhone: `${paymentData.phoneNumber}`,
    level: `FOCAS Planner`,
    support1: '+91 63835 14285',
    support2: '+91 93615 37780',
    note: '📦 Order Details & Access We will share your planner shipment updates to your registered WhatsApp number shortly.',
    shareLink: 'https://kit.focasedu.com/planner'
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(content.shareLink).then(() => {
      setPopup('Link Copied!');
      setTimeout(() => setPopup(''), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-4 md:p-8">
      {/* Popup Notification */}
      {popup && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {popup}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Logo */}
       <div className="flex justify-center mb-8">
          <div className="bg-white px-8 py-3 rounded-b-2xl shadow-sm">
            <img 
              src={focasLogo}
              alt="FOCAS Logo"
              className="h-12"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="flex flex-col justify-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">{content.heading}</h2>
              <p className="text-gray-700">{content.subtitle1}</p>
              <p className="text-gray-700">{content.subtitle2}</p>
              <p className="text-gray-700 leading-relaxed">
                🎉 {content.mainMessage} 🎉
              </p>
              <hr className="my-4" />
              <p className="text-sm text-gray-600 italic">{content.note}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              {/* Phone and Level */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-900">{content.contactPhone}</p>
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.116-4.897 5.629-4.897 9.53 0 1.105.174 2.18.52 3.207l.853-4.73c.482-2.678-.045-4.486-1.511-5.946C2.924 10.487 3.35 5.58 7.522 3.22c.987-.588 2.06-.953 3.253-.953 4.487 0 8.139 3.447 8.139 7.675 0 3.563-2.747 6.435-6.148 6.9-.593.043-1.149.147-1.68.212l-.244-.383z" />
                  </svg>
                </div>
              </div>

              {/* Level */}
              <div className="flex justify-between items-center mb-6 pb-6 border-b">
                <span className="text-gray-700 flex items-center gap-2">
                  <span>📚</span> Product
                </span>
                <span className="font-semibold text-gray-900">{content.level}</span>
              </div>

              {/* Share Section */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Share with friends & family</h3>
                <div className="grid grid-cols-4 gap-4">
                  <button
                    onClick={handleCopyLink}
                    className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                      <Copy className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-xs text-gray-600 text-center">CopyLink</span>
                  </button>

                  <a
                    href={`https://api.whatsapp.com/send?text=${content.shareLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-600 text-center">Whatsapp</span>
                  </a>

                  <a
                    href={`https://www.instagram.com/send?text=${content.shareLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200">
                      <Instagram className="w-6 h-6 text-pink-600" />
                    </div>
                    <span className="text-xs text-gray-600 text-center">Instagram</span>
                  </a>

                  <a
                    href={`https://www.facebook.com/send?text=${content.shareLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200">
                      <Send className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-600 text-center">Messenger</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Focas Support</h3>
              <p className="text-gray-700 mb-4">24/7 Support Available (Except Government Holidays)</p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.116-4.897 5.629-4.897 9.53 0 1.105.174 2.18.52 3.207l.853-4.73c.482-2.678-.045-4.486-1.511-5.946C2.924 10.487 3.35 5.58 7.522 3.22c.987-.588 2.06-.953 3.253-.953 4.487 0 8.139 3.447 8.139 7.675 0 3.563-2.747 6.435-6.148 6.9-.593.043-1.149.147-1.68.212l-.244-.383z" />
                  </svg>
                  <a
                    href={`https://wa.me/+916383514285`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Whatsapp: <span className="font-medium">{content.support1}</span>
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.116-4.897 5.629-4.897 9.53 0 1.105.174 2.18.52 3.207l.853-4.73c.482-2.678-.045-4.486-1.511-5.946C2.924 10.487 3.35 5.58 7.522 3.22c.987-.588 2.06-.953 3.253-.953 4.487 0 8.139 3.447 8.139 7.675 0 3.563-2.747 6.435-6.148 6.9-.593.043-1.149.147-1.68.212l-.244-.383z" />
                  </svg>
                  <a
                    href={`https://wa.me/+919361537780`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Whatsapp: <span className="font-medium">{content.support2}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
          10% { opacity: 1; transform: translateX(-50%) translateY(0); }
          90% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 2s ease-in-out;
        }
      `}</style>
    </div>
  );
}