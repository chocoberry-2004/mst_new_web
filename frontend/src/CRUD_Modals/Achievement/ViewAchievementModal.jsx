import React from 'react';
import logo from '../../assets/images/mst_logo1.png';


function ViewAchievementModal({ isOpen, onClose, achievement, getCategoryColor, getCategoryIcon }) {
  const BASE_URL = "http://localhost:8000";
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
                e.target.src = 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=400';
              }}
            />
          </div>

          {/* Title and Category */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{achievement.title}</h3>
              <p className="text-gray-600 mt-1">{achievement.organization}</p>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(achievement.category)}`}>
              <i className={`fas ${getCategoryIcon(achievement.category)} mr-1`}></i>
              {achievement.category}
            </span>
          </div>

          {/* Location and Date */}
          <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-gray-400"></i>
              <span className="text-gray-700">{achievement.location}, {achievement.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-calendar text-gray-400"></i>
              <span className="text-gray-700">{achievement.date}</span>
            </div>
          </div>

          {/* Description */}
          {achievement.description && (
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
              <p className="text-gray-600">{achievement.description}</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default ViewAchievementModal;