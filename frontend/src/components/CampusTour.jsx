import React from "react";
import { useContext } from "react";
import { AppContext } from "../providers/AppContextProvider";

function CampusTour({ onClose }) {

    let {showCampusTour, CampusTourHandler} = useContext(AppContext);

    return (
    <div 
    onClick={() => CampusTourHandler()}
    className={`fixed inset-0 z-[100] items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 p-4 ${showCampusTour ? `flex` : `hidden`}`}>

      {/* Modal Box */}
      <div 
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-4xl bg-[var(--primary-dark)] rounded-xl shadow-2xl overflow-hidden animate-scaleIn">

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            🎓 Campus Tour
          </h2>
          <button
            onClick={() => CampusTourHandler()}
            className="text-gray-600 hover:text-red-500 hover:rotate-90 text-xl font-bold transition-all duration-300 ease-in-out cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Video */}
        <div className="w-full aspect-video bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/UerPUy4qZbs"
            title="Campus Tour Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default CampusTour;
