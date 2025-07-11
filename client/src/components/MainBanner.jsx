// client/src/components/MainBanner.jsx
import React from "react";
import { Link } from "react-router-dom";
import mainBannerLG from "../assets/mainBannerLG.jpg";
import mainBannerSM from "../assets/mainBannerSM.jpg";

function MainBanner() {
  return (
    <div className="relative min-h-screen">
      {/* Background Images */}
      <img
        src={mainBannerLG}
        alt="Main Banner"
        className="w-full h-full object-cover hidden md:block absolute inset-0"
      />
      <img 
        src={mainBannerSM} 
        alt="Main Banner" 
        className="w-full h-full object-cover md:hidden absolute inset-0" 
      />
      
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        {/* Welcome Text */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Welcome to{" "}
            <span className="text-gray-200">Saman Stores</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white font-normal max-w-2xl mx-auto leading-relaxed">
            Freshness You Can Trust, Savings You Will Love!
          </p>
        </div>

        {/* Shop Now Button */}
        <div className="mt-10">
          <Link
            to={"/products"}
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Shop Now
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;