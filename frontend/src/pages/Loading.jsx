import React from "react";
import Mst_logo from "../assets/images/mst_logo1.png";

function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--primary-dark)]">
      
      <div className="flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-white flex items-center justify-center shadow-2xl z-10">
            <img
              src={Mst_logo}
              alt="MST Logo"
              className="w-24 md:w-28 object-contain"
            />
        </div>

        <div className="flex gap-5">
            <div className="w-5 h-5 rounded-full bg-white dot transition-all duration-300 ease-in-out"></div>
            <div className="w-5 h-5 rounded-full bg-yellow-500 dot transition-all duration-300 ease-in-out"></div>
            <div className="w-5 h-5 rounded-full bg-[var(--secondary-dark)] dot transition-all duration-300 ease-in-out"></div>
        </div>

        {/* Loading Text */}
        <p className="text-white/90 text-sm md:text-base tracking-wide animate-pulse">
          Loading, please wait…
        </p>

      </div>

    </div>
  );
}

export default Loading;
