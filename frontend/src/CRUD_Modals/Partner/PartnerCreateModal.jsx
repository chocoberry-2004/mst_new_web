// import React, { useState } from 'react';
// import logo from '../../assets/images/mst_logo1.png';

// function PartnerCreateModal({ showAddModal, setShowAddModal, newPartner, setNewPartner, handleAddPartner }) {
//   if (!showAddModal) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">

//         {/* header section */}
//         <div className="flex justify-between items-center mb-4 sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-300">
//           {/* Left Section */}
//           <div className="flex gap-3 items-center">
//             <img
//               src={logo}
//               alt="MST Logo"
//               className="w-14 h-14 rounded-full border-2 border-[var(--accent-yellow)] object-cover"
//             />
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
//               <p className="text-sm text-gray-500">Add New Partner</p>
//             </div>
//           </div>
//           <button 
//             onClick={() => setShowAddModal(false)} 
//             className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 ease-in-out"
//           >
//             <i className="fas fa-times text-md"></i>
//           </button>
//         </div>


//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleAddPartner();
//           }}
//           encType="multipart/form-data"
//           className='p-6'
//         >

//         <div className="grid grid-cols-2 gap-4">
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name *</label>
//             <input
//               type="text"
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//               value={newPartner.name}
//               onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
//               placeholder="e.g., Microsoft"
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
//             <input
//               type="file"
//               accept='image/*'
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//               onChange={(e) => setNewPartner({...newPartner, logo: e.target.files[0]})}
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//               value={newPartner.url}
//               onChange={(e) => setNewPartner({...newPartner, url: e.target.value})}
//               placeholder="https://www.example.com"
//             />
//           </div>
          
//           <div className="flex items-center">
//             <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//               <input
//                 type="checkbox"
//                 className="rounded border-gray-300 text-[#FFC53A] focus:ring-[#FFC53A]"
//                 checked={newPartner.featured}
//                 onChange={(e) => setNewPartner({...newPartner, featured: e.target.checked})}
//               />
//               Featured Partner
//             </label>
//           </div>
//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               required
//               rows="3"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//               value={newPartner.description}
//               onChange={(e) => setNewPartner({...newPartner, description: e.target.value})}
//               placeholder="Describe the partnership and expertise..."
//             ></textarea>
//           </div>
          
//         </div>
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={() => setShowAddModal(false)}
//             className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={!newPartner.name}
//             className="cursor-pointer px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Add Partner
//           </button>
//         </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PartnerCreateModal;


import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/mst_logo1.png';

function PartnerCreateModal({ showAddModal, setShowAddModal, newPartner, setNewPartner, handleAddPartner }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  // Clean up the memory when modal closes or image changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageChange = (file) => {
    if (file) {
      setNewPartner({ ...newPartner, logo: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setNewPartner({ ...newPartner, logo: null });
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">
        
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
              <p className="text-sm text-gray-500">Add New Partner</p>
            </div>
          </div>
          <button 
            onClick={() => {
              removeImage();
              setShowAddModal(false);
            }} 
            className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-times text-md"></i>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddPartner();
            setPreviewUrl(null); // Reset preview after successful add
          }}
          encType="multipart/form-data"
          className='p-6'
        >
          <div className="grid grid-cols-2 gap-4">
            
            {/* Partner Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={newPartner.name}
                onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
                placeholder="e.g., Microsoft"
              />
            </div>

            {/* Styled Logo Upload & Preview */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Partner Logo *</label>
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
                      Click or drag logo to upload
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG or SVG (Max 1MB)</p>
                  </>
                )}

                <input
                  type="file"
                  accept='image/*'
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
                value={newPartner.url}
                onChange={(e) => setNewPartner({...newPartner, url: e.target.value})}
                placeholder="https://www.example.com"
              />
            </div>
            
            {/* Featured Checkbox */}
            <div className="col-span-2 flex items-center">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#FFC53A] focus:ring-[#FFC53A] cursor-pointer"
                  checked={newPartner.featured}
                  onChange={(e) => setNewPartner({...newPartner, featured: e.target.checked})}
                />
                Featured Partner
              </label>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                value={newPartner.description}
                onChange={(e) => setNewPartner({...newPartner, description: e.target.value})}
                placeholder="Describe the partnership and expertise..."
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                removeImage();
                setShowAddModal(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newPartner.name}
              className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Add Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PartnerCreateModal;