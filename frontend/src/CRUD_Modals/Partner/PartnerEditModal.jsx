import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/mst_logo1.png';

function PartnerEditModal({ showEditModal, setShowEditModal, selectedPartner, setSelectedPartner, partnerTiers, availableCategories, handleEditPartner }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (selectedPartner?.logo) {
      if (typeof selectedPartner.logo === 'string' && !selectedPartner.logo.startsWith('http')) {
        // Existing image => add BASE_URL
        setPreviewUrl(`${BASE_URL}${selectedPartner.logo}`);
      } else {
        // New uploaded file => blob URL
        const objectUrl = URL.createObjectURL(selectedPartner.logo);
        setPreviewUrl(objectUrl);
      }
    } else {
      setPreviewUrl(null);
    }
  }, [selectedPartner]);

  // Memory cleanup
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (file) => {
    if (file) {
      setSelectedPartner({ ...selectedPartner, logo: file });
      // The useEffect above will handle updating the previewUrl
    }
  };

  const removeImage = () => {
    setSelectedPartner({ ...selectedPartner, logo: null });
    setPreviewUrl(null);
  };

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  if (!showEditModal || !selectedPartner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* header section */}
        <div className="flex justify-between items-center mb-4 sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-300">
          <div className="flex gap-3 items-center">
            <img
              src={logo}
              alt="MST Logo"
              className="w-14 h-14 rounded-full border-2 border-[var(--accent-yellow)] object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
              <p className="text-sm text-gray-500">Edit Partner</p>
            </div>
          </div>
          <button 
            onClick={() => setShowEditModal(false)} 
            className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-times text-md"></i>
          </button>
        </div>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleEditPartner(); }}
          encType="multipart/form-data" 
          className="p-6"
        >
          <div className="grid grid-cols-2 gap-4">
            
            {/* Partner Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name *</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={selectedPartner.name}
                onChange={(e) => setSelectedPartner({...selectedPartner, name: e.target.value})}
              />
            </div>

            {/* Logo Preview & Upload */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Partner Logo</label>
              <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#FFC53A] transition cursor-pointer group overflow-hidden bg-gray-50">
                
                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="logo preview"
                      className="absolute inset-0 w-full h-full object-contain p-4 bg-white"
                    />
                    <div className="absolute inset-0 bg-black/30 bg-opacity-0 group-hover:bg-opacity-20 transition-all pointer-events-none z-20" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full cursor-pointer hover:bg-red-600 transition shadow-lg z-30 flex items-center justify-center"
                    >
                      <i className="fas fa-times text-sm"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-4xl text-gray-400 group-hover:scale-110 group-hover:text-[#FFC53A] transition duration-300">
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 font-medium px-4">
                      Click or drag logo to change
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageChange(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            {/* Website URL */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={selectedPartner.url || ''}
                onChange={(e) => setSelectedPartner({...selectedPartner, url: e.target.value})}
              />
            </div>
            
            {/* Featured Checkbox */}
            <div className="col-span-2 flex items-center">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#FFC53A] focus:ring-[#FFC53A] cursor-pointer"
                  checked={selectedPartner.featured || false}
                  onChange={(e) => setSelectedPartner({...selectedPartner, featured: e.target.checked})}
                />
                Featured Partner
              </label>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={selectedPartner.description || ''}
                onChange={(e) => setSelectedPartner({...selectedPartner, description: e.target.value})}
              ></textarea>
            </div>

          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedPartner.name}
              className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PartnerEditModal;
