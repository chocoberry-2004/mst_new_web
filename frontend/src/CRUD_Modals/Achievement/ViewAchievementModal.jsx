import React from 'react';
import logo from '../../assets/images/mst_logo1.png';


function ViewAchievementModal({ isOpen, onClose, achievement, getCategoryColor, getCategoryIcon }) {
  const BASE_URL = "http://localhost:8000";
  const placeholderImg = "https://t4.ftcdn.net/jpg/06/57/37/01/360_F_657370150_pdNeG5pjI976ZasVbKN9VqH1rfoykdYU.jpg";

  if (!isOpen || !achievement) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        {/* header section */}
        <div className="flex justify-between items-center mb-4 sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-300">
          {/* Left Section */}
          <div className="flex gap-3 items-center">
            <img
              src={logo}
              alt="MST Logo"
              className="w-14 h-14 rounded-full border-2 border-[var(--accent-yellow)] object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
              <p className="text-sm text-gray-500">Achievement Details</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-times text-md"></i>
          </button>
        </div>
        
        <div className="space-y-6 p-6">
          {/* Header Image */}
          <div className="h-64 rounded-lg overflow-hidden flex items-center justify-center">
            <img 
              src={`${BASE_URL}${achievement.imageUrl}`} 
              alt={achievement.title}
              className="w-64 h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImg;
              }}
            />
          </div>

          {/* Title and Category */}
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
                {achievement.title}
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <p className="text-sm text-gray-500">Awarded by {achievement.organization}</p>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full border ${getCategoryColor(achievement.category)}`}>
              <i className={`fas ${getCategoryIcon(achievement.category)} text-[10px]`}></i>
              {achievement.category}
            </span>
          </div>

          {/* Location and Date */}
          <div className="flex flex-wrap items-center gap-6 px-5 py-3.5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100/80 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-50">
                <i className="fas fa-map-marker-alt text-rose-400 text-sm"></i>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Location</p>
                <span className="text-sm font-medium text-gray-700">{achievement.location}, {achievement.country}</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50">
                <i className="fas fa-calendar text-blue-400 text-sm"></i>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Date</p>
                <span className="text-sm font-medium text-gray-700">{new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {achievement.description && (
            <div className="relative p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="absolute top-0 left-5 -translate-y-1/2 px-3 py-0.5 bg-white border border-gray-100 rounded-full">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Description</span>
              </div>
              <p className="text-gray-600 leading-relaxed mt-2">{achievement.description}</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default ViewAchievementModal;