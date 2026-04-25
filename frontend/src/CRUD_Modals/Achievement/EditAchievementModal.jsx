// import React, { useState, useEffect } from 'react';
// import logo from '../../assets/images/mst_logo1.png';
// import { updateAchievement } from '../../CRUD_handlers/Achievement/updateAchievement';
// import { useCountry } from '../../providers/CountryProvider';


// function EditAchievementModal({ isOpen, onClose, onSave, achievement, categories }) {
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { countries, countryLoading, countryErr } = useCountry();

//   // ... inside EditAchievementModal
//   const [previewUrl, setPreviewUrl] = useState(null);

//   console.log(achievement);

//   useEffect(() => {
//     if (achievement) {
//       setFormData(achievement);
//       setPreviewUrl(achievement.imageUrl); 
//     }
//   }, [achievement]);

//   // Cleanup local object URLs to prevent memory leaks
//   useEffect(() => {
//     return () => {
//       if (previewUrl) {
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//   }, [previewUrl]);

//   const handleChange = (field, value) => {
//     if (field === 'imageUrl') {
//       const file = value;
//       if (file) {
//         setFormData(prev => ({ ...prev, imageUrl: file }));
//         const localUrl = URL.createObjectURL(file);
//         setPreviewUrl(localUrl);
//       }
//     } else {
//       setFormData(prev => ({ ...prev, [field]: value }));
//     }
//   };

//   const removeImage = () => {
//     setFormData(prev => ({ ...prev, imageUrl: null }));
//     setPreviewUrl(null);
//   };

//   useEffect(() => {
//     if (achievement) {
//       setFormData(JSON.parse(JSON.stringify(achievement)));
//     }
//   }, [achievement]);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!formData) return;

//     try {
//       const data = new FormData();

//       data.append("title", formData.title);
//       data.append("category", formData.category);
//       data.append("organization", formData.organization);
//       data.append("country", formData.country);
//       data.append("location", formData.location);
//       data.append("date", formData.date);
//       data.append("description", formData.description);
//       // image (URL or file)
//       if (formData.imageUrl) {
//         data.append("imageUrl", formData.image);
//       }

//       // call API (IMPORTANT)
//       const result = await updateAchievement(formData._id, data);

//       if (result.success) {
//         console.log(result);
//         setLoading(false);
//         onSave({
//           ...formData,
//           ...result.achievement,
//           _id: formData._id,
//           imageUrl: result.achievement.imageUrl || formData.imageUrl
//         });
//         onClose();
//       } else {
//         setLoading(false);
//         console.error(result.message);
//         alert("Update failed");
//       }

//     } catch (error) {
//       setLoading(false);
//       console.error(error);
//       alert("Something went wrong");
//     }
//   };

//   if (!isOpen || !formData) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
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
//               <p className="text-sm text-gray-500">Edit Achievement</p>
//             </div>
//           </div>
//           <button 
//             onClick={onClose} 
//             className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 ease-in-out"
//           >
//             <i className="fas fa-times text-md"></i>
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} className='p-6'>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//                 value={formData.title}
//                 onChange={(e) => handleChange('title', e.target.value)}
//               />
//             </div>

//             <div className="">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Achievement Image <span className="text-red-500">*</span>
//               </label>

//               <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#FFC53A] transition cursor-pointer group overflow-hidden bg-gray-50">
                
//                 {previewUrl ? (
//                   <>
//                     <img
//                       src={previewUrl}
//                       alt="preview"
//                       className="absolute inset-0 w-full h-full object-cover"
//                     />
//                     {/* Dark overlay on hover */}
//                     <div className="absolute inset-0 bg-black/30 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 pointer-events-none z-20" />
                    
//                     {/* Remove Button */}
//                     <button
//                       type="button"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         removeImage();
//                       }}
//                       className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full cursor-pointer hover:bg-red-600 transition shadow-lg z-30 flex items-center justify-center"
//                     >
//                       <i className="fas fa-times text-sm"></i>
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <div className="text-4xl text-gray-400 group-hover:scale-110 group-hover:text-[#FFC53A] transition duration-300">
//                       <i className="fa-solid fa-cloud-arrow-up"></i>
//                     </div>
//                     <p className="text-sm text-gray-500 mt-2 font-medium px-4">
//                       Click or drag image to upload
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       PNG, JPG (Max 2MB)
//                     </p>
//                   </>
//                 )}

//                 {/* Hidden Input */}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   required
//                   className="absolute inset-0 opacity-0 cursor-pointer z-10"
//                   onChange={(e) => {
//                     if (e.target.files && e.target.files[0]) {
//                       handleChange('imageUrl', e.target.files[0]);
//                     }
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="grid gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//                   value={formData.category}
//                   onChange={(e) => handleChange('category', e.target.value)}
//                 >
//                   {categories?.map((category) => (
//                     <option key={category._id} value={category._id}>{category.name}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Organization <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//                   value={formData.organization}
//                   onChange={(e) => handleChange('organization', e.target.value)}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Location <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//                   value={formData.location}
//                   onChange={(e) => handleChange('location', e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Country <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//                 value={formData.country}
//                 onChange={(e) => handleChange('country', e.target.value)}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Date <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//                 value={new Date(formData.date).toLocaleDateString()}
//                 onChange={(e) => handleChange('date', e.target.value)} 
//               />
//             </div>


//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 required
//                 rows="2"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//                 value={formData.description}
//                 onChange={(e) => handleChange('description', e.target.value)}
//               ></textarea>
//             </div>
            
//           </div>
          
//           <div className="flex justify-end gap-3 mt-6">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
//                     Saving...
//                   </>
//                 ) : (
//                   "Save Changes"
//                 )}
//               </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditAchievementModal;

import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/mst_logo1.png';
import { updateAchievement } from '../../CRUD_handlers/Achievement/updateAchievement';
import { useCountry } from '../../providers/CountryProvider';

function EditAchievementModal({ isOpen, onClose, onSave, achievement, categories }) {
  const { countries, countryLoading, countryErr } = useCountry();
  const [formData, setFormData] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL=import.meta.env.VITE_BASE_URL

  // Sync formData with the achievement prop when it opens/changes
  useEffect(() => {
    if (achievement) {
      // Format the date to YYYY-MM-DD for the HTML5 date input
      const formattedDate = achievement.date ? new Date(achievement.date).toISOString().split('T')[0] : '';
      
      setFormData({
        ...achievement,
        date: formattedDate
      });
      setPreviewUrl(`${BASE_URL}${achievement.imageUrl}`); 
    }
  }, [achievement]);


  // Cleanup local object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (field, value) => {
    console.log(value);
    if (field === 'imageUrl') {
      const file = value;
      if (file) {
        // 1. Update the form data with the actual File object
        setFormData(prev => ({ ...prev, imageUrl: file }));
        
        // 2. Create a temporary URL for the browser to display
        const localUrl = URL.createObjectURL(file);
        
        // 3. Clean up the OLD preview URL if it was a blob to save memory
        if (previewUrl && previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(previewUrl);
        }
        
        setPreviewUrl(localUrl);

        console.log("I am working");
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: null }));
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData) return;

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("organization", formData.organization);
      data.append("country", formData.country);
      data.append("location", formData.location);
      data.append("date", formData.date);
      data.append("description", formData.description);

      if (formData.imageUrl instanceof File) {
        data.append("imageUrl", formData.imageUrl);
      }

      const result = await updateAchievement(formData._id, data);

      if (result.success) {
        setLoading(false);
        onSave(result.achievement);
        onClose();
      } else {
        setLoading(false);
        alert(result.message || "Update failed");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-300">
          <div className="flex gap-3 items-center">
            <img
              src={logo}
              alt="MST Logo"
              className="w-14 h-14 rounded-full border-2 border-[#FFC53A] object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
              <p className="text-sm text-gray-500">Edit Achievement</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300"
          >
            <i className="fas fa-times text-md"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className='p-6'>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC53A] outline-none"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>

            {/* Image Section */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievement Image <span className="text-red-500">*</span>
              </label>

              <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#FFC53A] transition cursor-pointer group overflow-hidden bg-gray-50">
                
                {previewUrl ? (
                  <>
                    {/* Image Preview */}
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        removeImage();
                      }}
                      className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full cursor-pointer hover:bg-red-600 transition shadow-lg z-30 flex items-center justify-center"
                    >
                      <i className="fas fa-times text-sm"></i>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Empty State UI */}
                    <div className="text-4xl text-gray-400 group-hover:scale-110 group-hover:text-[#FFC53A] transition duration-300">
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 font-medium px-4">
                      Click or drag image to upload
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG (Max 2MB)
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className={`absolute inset-0 opacity-0 cursor-pointer ${previewUrl ? 'z-0' : 'z-20'}`}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleChange('imageUrl', e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC53A] outline-none"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC53A] outline-none"
                  value={formData.organization}
                  onChange={(e) => handleChange('organization', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC53A] outline-none"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
              {countryLoading ? (
                <div className="px-3 py-2 bg-gray-50 border rounded-lg text-sm text-gray-500 animate-pulse">Loading...</div>
              ) : countryErr ? (
                <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">Error loading countries</div>
              ) : (
                <div className="relative">
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC53A] outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Country</option>
                    {countries.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
                    {formData.country && (
                      <img
                        src={countries.find(c => c.name === formData.country)?.flag}
                        alt="flag"
                        className="w-5 h-5 rounded-full object-cover border border-gray-200"
                      />
                    )}
                    <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC53A] outline-none cursor-pointer"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)} 
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                required
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC53A] outline-none"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] transition-colors flex items-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span> Saving...</>
              ) : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAchievementModal;