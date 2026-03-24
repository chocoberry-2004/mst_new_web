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

          {/* How, Why, Impact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievement.how && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-700 mb-2">How Achieved</p>
                <p className="text-sm text-gray-700">{achievement.how}</p>
              </div>
            )}
            {achievement.why && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-700 mb-2">Why Received</p>
                <p className="text-sm text-gray-700">{achievement.why}</p>
              </div>
            )}
            {achievement.impact && (
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-700 mb-2">Impact</p>
                <p className="text-sm text-gray-700">{achievement.impact}</p>
              </div>
            )}
          </div>

          {/* Metrics */}
          {achievement.metrics && Object.keys(achievement.metrics).length > 0 && (
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-3">Key Metrics</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(achievement.metrics).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-500 capitalize mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default ViewAchievementModal;