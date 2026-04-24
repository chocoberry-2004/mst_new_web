import React from "react";
import logo from "../../assets/images/mst_logo1.png";

function PartnerViewModal({
  showViewModal,
  setShowViewModal,
  selectedPartner,
}) {
  if (!showViewModal || !selectedPartner) return null;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      selectedPartner.name
    )}&background=FFC53A&color=000&size=128`;
  };

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-300">
          <div className="flex gap-3 items-center">
            <img
              src={logo}
              alt="MST Logo"
              className="w-14 h-14 rounded-full border-2 border-[var(--accent-yellow)] object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
              <p className="text-sm text-gray-500">Partner Details</p>
            </div>
          </div>

          <button
            onClick={() => setShowViewModal(false)}
            className="text-gray-500 w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">

          {/* Top Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center border border-gray-200">
              <img
                src={`${BASE_URL}${selectedPartner.logo}`}
                alt={selectedPartner.name}
                className="max-w-full max-h-full object-contain"
                onError={handleImageError}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedPartner.name}
              </h2>

              <div className="flex gap-2 mt-2">
               
                {selectedPartner.featured && (
                  <span className="px-2 py-1 bg-[#FFC53A]/20 text-[#B8860B] text-xs rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {selectedPartner.description && (
            <div className="border p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Description
              </p>
              <p className="text-gray-600">
                {selectedPartner.description}
              </p>
            </div>
          )}

          

          {/* Website */}
          {selectedPartner.url && selectedPartner.url !== "undefined" && (
            <div className="border p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Website
              </p>
              <a
                href={selectedPartner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                {selectedPartner.url}
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 pb-6">
          <button
            onClick={() => setShowViewModal(false)}
            className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default PartnerViewModal;