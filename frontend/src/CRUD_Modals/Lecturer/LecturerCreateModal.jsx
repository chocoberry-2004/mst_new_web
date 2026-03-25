// import React, { useState, useEffect } from 'react';
// import logo from '../../assets/images/mst_logo1.png';
// import { createLecturer } from '../../CRUD_handlers/Lecturer/createLecturer';

// function LecturerCreateModal({
//     show,
//     onClose,
//     newLecturer,
//     setNewLecturer,
//     handleImage,
//     profilePreview,
//     removeImage
// }) {

//     const [createLoading, setCreateLoading] = useState(false);

//     // Handle add lecturer
//     const handleAddLecturer = async () => {
//         try {
//           setCreateLoading(true);
//           setCreateErr(null);
          
//           const formData = new FormData();
          
//           // Append all fields
//           Object.keys(newLecturer).forEach(key => {
//             if (key === 'degree') {
//               // Handle degree array
//               if (Array.isArray(newLecturer.degree) && newLecturer.degree.length > 0) {
//                 newLecturer.degree.forEach(degree => {
//                   formData.append('degree[]', degree);
//                 });
//               }
//             } else if (key !== 'profileImageURL') {
//               formData.append(key, newLecturer[key] || '');
//             }
//           });
          
//           // Append profile image if exists
//           if (profileImage) {
//             formData.append('profileImage', profileImage);
//           }
          
//           const response = await createLecturer(formData);
          
//           if(response.success) {
//             await refreshLecturers(); // Refresh the list
//             setShowAddModal(false);
//             resetForm();
//           } else {
//             setCreateErr(response.error || 'Failed to create lecturer');
//           }
//         } catch (error) {
//           console.error('Error creating lecturer:', error);
//           setCreateErr('An error occurred while creating the lecturer');
//         } finally {
//           setCreateLoading(false);
//         }
//     };

//     // Initialize with one position and one degree when modal opens
//     useEffect(() => {
//         if (show) {
//         if (!newLecturer.positions || newLecturer.positions.length === 0) {
//             setNewLecturer(prev => ({
//             ...prev,
//             positions: ['']
//             }));
//         }
//         if (!newLecturer.degrees || newLecturer.degrees.length === 0) {
//             setNewLecturer(prev => ({
//             ...prev,
//             degrees: ['']
//             }));
//         }
//         }
//     }, [show, setNewLecturer]);

//     if (!show) return null;

//     // Helper function to add new position field
//     const morePosition = () => {
//         const currentPositions = newLecturer.positions || [];
//         setNewLecturer({
//         ...newLecturer,
//         positions: [...currentPositions, '']
//         });
//     };

//     // Helper function to add new degree field
//     const moreDegree = () => {
//         const currentDegrees = newLecturer.degrees || [];
//         setNewLecturer({
//         ...newLecturer,
//         degrees: [...currentDegrees, '']
//         });
//     };

//     // Helper function to update position at specific index
//     const updatePosition = (index, value) => {
//         const updatedPositions = [...(newLecturer.positions || [])];
//         updatedPositions[index] = value;
//         setNewLecturer({
//         ...newLecturer,
//         positions: updatedPositions
//         });
//     };

//     // Helper function to update degree at specific index
//     const updateDegree = (index, value) => {
//         const updatedDegrees = [...(newLecturer.degrees || [])];
//         updatedDegrees[index] = value;
//         setNewLecturer({
//         ...newLecturer,
//         degrees: updatedDegrees
//         });
//     };

//     // Helper function to remove position at specific index
//     const removePosition = (index) => {
//         const updatedPositions = [...(newLecturer.positions || [])];
//         updatedPositions.splice(index, 1);
//         setNewLecturer({
//         ...newLecturer,
//         positions: updatedPositions
//         });
//     };

//     // Helper function to remove degree at specific index
//     const removeDegree = (index) => {
//         const updatedDegrees = [...(newLecturer.degrees || [])];
//         updatedDegrees.splice(index, 1);
//         setNewLecturer({
//         ...newLecturer,
//         degrees: updatedDegrees
//         });
//     };

//     return (
//     <div>
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">
            
//             {/* header section */}
//             <div className="flex justify-between items-center mb-4 sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-300">
//                 {/* Left Section */}
//                 <div className="flex gap-3 items-center">
//                     <img
//                         src={logo}
//                         alt="MST Logo"
//                         className="w-14 h-14 rounded-full border-2 border-[var(--accent-yellow)] object-cover"
//                     />
//                     <div>
//                         <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
//                         <p className="text-sm text-gray-500">Add New Lecturer</p>
//                     </div>
//                 </div>
//                 <button 
//                     onClick={onClose} 
//                     className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center hover:rotate-45 transition-all duration-300 ease-in-out"
//                 >
//                     <i className="fas fa-times text-md leading-none"></i>
//                 </button>
//             </div>

//             <form className='p-6' encType='multipart/form-data' onSubmit={(e) => {
//                 e.preventDefault();
//                 handleAddLecturer();
//             }}>
//                 <div className="space-y-4">

//                 <div className="">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Profile Image
//                 </label>

//                 <div className="relative w-full h-44 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#FFC53A] transition cursor-pointer group overflow-hidden">

//                     {/* Preview (if image selected) */}
//                     {profilePreview ? (
//                     <img
//                         src={profilePreview}
//                         alt="preview"
//                         className="absolute inset-0 w-full h-full object-cover"
//                     />
//                     ) : (
//                     <>
//                         <div className="text-4xl text-gray-400 group-hover:scale-110 transition">
//                         <i className="fa-solid fa-cloud-arrow-up"></i>
//                         </div>
//                         <p className="text-sm text-gray-500 mt-2">
//                         Click or drag image to upload
//                         </p>
//                         <p className="text-xs text-gray-400">
//                         PNG, JPG (Max 2MB)
//                         </p>
//                     </>
//                     )}

//                     {/* Hidden Input */}
//                     <input
//                     type="file"
//                     accept="image/*"
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     onChange={(e) => {
//                         handleImage(e.target.files[0])
//                     }}
//                     />

//                     {/* Remove button */}
//                     {profilePreview && (
//                     <button
//                         type="button"
//                         onClick={(e) => {
//                         e.stopPropagation();
//                         removeImage();
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full cursor-pointer"
//                     >
//                         <i className="fas fa-times text-md leading-none"></i>
//                     </button>
//                     )}
//                 </div>
//                 </div>

//                 <div className="">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                     <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//                     value={newLecturer.name || ''}
//                     onChange={(e) => setNewLecturer({...newLecturer, name: e.target.value})}
//                     />
//                 </div>

//                 {/* Positions Section */}
//                 <div id="position-container">
//                     <div className="space-y-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Positions</label>
//                         {(newLecturer.positions || []).map((position, index) => (
//                             <div key={`position-${index}`} className="flex items-center gap-2">
//                                 <input
//                                     type="text"
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//                                     value={position}
//                                     onChange={(e) => updatePosition(index, e.target.value)}
//                                     placeholder={`Position ${index + 1}`}
//                                 />
//                                 {(newLecturer.positions.length > 1) && (
//                                     <button 
//                                         type="button"
//                                         onClick={() => removePosition(index)} 
//                                         className='bg-red-500 w-8 h-8 rounded-full cursor-pointer hover:bg-red-600 transition'
//                                     >
//                                         <i className="fas fa-times text-white"></i>
//                                     </button>
//                                 )}
//                             </div>
//                         ))}

//                         <div className="w-full flex justify-end">
//                             <button 
//                                 type="button"
//                                 onClick={() => morePosition()} 
//                                 className='bg-[var(--primary-dark)] px-4 py-2 rounded-lg cursor-pointer hover:bg-opacity-80 transition flex items-center gap-2'
//                             >
//                                 <i className="fas fa-plus text-white"></i>
//                                 <span className="text-white text-sm">Add Position</span>
//                             </button>
//                         </div>
                        
//                     </div>
//                 </div>

//                 {/* Degrees Section */}
//                 <div id="degree-container">
//                     <div className="space-y-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Degrees</label>
//                         {(newLecturer.degrees || []).map((degree, index) => (
//                             <div key={`degree-${index}`} className="flex items-center gap-2">
//                                 <input
//                                     type="text"
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
//                                     value={degree}
//                                     onChange={(e) => updateDegree(index, e.target.value)}
//                                     placeholder={`Degree ${index + 1}`}
//                                 />
//                                 {(newLecturer.degrees.length > 1) && (
//                                     <button 
//                                         type="button"
//                                         onClick={() => removeDegree(index)} 
//                                         className='bg-red-500 w-8 h-8 rounded-full cursor-pointer hover:bg-red-600 transition'
//                                     >
//                                         <i className="fas fa-times text-white"></i>
//                                     </button>
//                                 )}
//                             </div>
//                         ))}

//                         <div className="w-full flex justify-end">
//                             <button 
//                                 type="button"
//                                 onClick={() => moreDegree()} 
//                                 className='bg-[var(--primary-dark)] px-4 py-2 rounded-lg cursor-pointer hover:bg-opacity-80 transition flex items-center gap-2'
//                             >
//                                 <i className="fas fa-plus text-white"></i>
//                                 <span className="text-white text-sm">Add Degree</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
                
//                 </div>

//                 <div className="flex justify-end gap-3 mt-6">
//                     <button
//                         type="button"
//                         onClick={onClose}
//                         disabled={createLoading}
//                         className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
//                     >
//                         Cancel
//                     </button>

//                     <button
//                         type='submit'
//                         className={`px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
//                         disabled={createLoading}
//                     >
//                         {createLoading ? (
//                         <>
//                             <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
//                             Creating...
//                         </>
//                         ) : (
//                         "Add Lecturer"
//                         )}
//                     </button>
//                 </div>
//             </form>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default LecturerCreateModal;


import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/mst_logo1.png';

function LecturerCreateModal({
    show,
    onClose,
    onSubmit, // Now receiving onSubmit from parent
    createLoading,
    createErr,
    newLecturer,
    setNewLecturer,
    handleImage,
    profilePreview,
    removeImage,
    profileImage // Receive profileImage from parent
}) {

    // Initialize with one position and one degree when modal opens
    useEffect(() => {
        if (show) {
            if (!newLecturer.positions || newLecturer.positions.length === 0) {
                setNewLecturer(prev => ({
                    ...prev,
                    positions: ['']
                }));
            }
            if (!newLecturer.degrees || newLecturer.degrees.length === 0) {
                setNewLecturer(prev => ({
                    ...prev,
                    degrees: ['']
                }));
            }
        }
    }, [show, setNewLecturer]);

    if (!show) return null;

    // Helper function to add new position field
    const morePosition = () => {
        const currentPositions = newLecturer.positions || [];
        setNewLecturer({
            ...newLecturer,
            positions: [...currentPositions, '']
        });
    };

    // Helper function to add new degree field
    const moreDegree = () => {
        const currentDegrees = newLecturer.degrees || [];
        setNewLecturer({
            ...newLecturer,
            degrees: [...currentDegrees, '']
        });
    };

    // Helper function to update position at specific index
    const updatePosition = (index, value) => {
        const updatedPositions = [...(newLecturer.positions || [])];
        updatedPositions[index] = value;
        setNewLecturer({
            ...newLecturer,
            positions: updatedPositions
        });
    };

    // Helper function to update degree at specific index
    const updateDegree = (index, value) => {
        const updatedDegrees = [...(newLecturer.degrees || [])];
        updatedDegrees[index] = value;
        setNewLecturer({
            ...newLecturer,
            degrees: updatedDegrees
        });
    };

    // Helper function to remove position at specific index
    const removePosition = (index) => {
        const updatedPositions = [...(newLecturer.positions || [])];
        updatedPositions.splice(index, 1);
        setNewLecturer({
            ...newLecturer,
            positions: updatedPositions
        });
    };

    // Helper function to remove degree at specific index
    const removeDegree = (index) => {
        const updatedDegrees = [...(newLecturer.degrees || [])];
        updatedDegrees.splice(index, 1);
        setNewLecturer({
            ...newLecturer,
            degrees: updatedDegrees
        });
    };

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">
                    
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
                                <p className="text-sm text-gray-500">Add New Lecturer</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center hover:rotate-45 transition-all duration-300 ease-in-out"
                        >
                            <i className="fas fa-times text-md leading-none"></i>
                        </button>
                    </div>

                    {/* Error Message Display */}
                    {createErr && (
                        <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{createErr}</p>
                        </div>
                    )}

                    <form className='p-6' encType='multipart/form-data' onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(); // Call parent's submit handler
                    }}>
                        <div className="space-y-4">

                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Image
                                </label>

                                <div className="relative w-full h-44 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#FFC53A] transition cursor-pointer group overflow-hidden">

                                    {/* Preview (if image selected) */}
                                    {profilePreview ? (
                                        <>
                                            <img
                                                src={profilePreview}
                                                alt="preview"
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeImage();
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full cursor-pointer hover:bg-red-600 transition z-10"
                                            >
                                                <i className="fas fa-times text-md leading-none"></i>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-4xl text-gray-400 group-hover:scale-110 transition">
                                                <i className="fa-solid fa-cloud-arrow-up"></i>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Click or drag image to upload
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                PNG, JPG (Max 2MB)
                                            </p>
                                        </>
                                    )}

                                    {/* Hidden Input */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                handleImage(e.target.files[0]);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                                    value={newLecturer.name || ''}
                                    onChange={(e) => setNewLecturer({...newLecturer, name: e.target.value})}
                                />
                            </div>

                            {/* Positions Section */}
                            <div id="position-container">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Positions</label>
                                    {(newLecturer.positions || []).map((position, index) => (
                                        <div key={`position-${index}`} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                                                value={position}
                                                onChange={(e) => updatePosition(index, e.target.value)}
                                                placeholder={`Position ${index + 1}`}
                                            />
                                            {(newLecturer.positions.length > 1) && (
                                                <button 
                                                    type="button"
                                                    onClick={() => removePosition(index)} 
                                                    className='bg-red-500 w-8 h-8 rounded-full cursor-pointer hover:bg-red-600 transition flex items-center justify-center'
                                                >
                                                    <i className="fas fa-times text-white text-sm"></i>
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <div className="w-full flex justify-end">
                                        <button 
                                            type="button"
                                            onClick={morePosition} 
                                            className='bg-[#FFC53A] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#e6b234] transition flex items-center gap-2'
                                        >
                                            <i className="fas fa-plus text-gray-900"></i>
                                            <span className="text-gray-900 text-sm">Add Position</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Degrees Section */}
                            <div id="degree-container">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Degrees</label>
                                    {(newLecturer.degrees || []).map((degree, index) => (
                                        <div key={`degree-${index}`} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                                                value={degree}
                                                onChange={(e) => updateDegree(index, e.target.value)}
                                                placeholder={`Degree ${index + 1}`}
                                            />
                                            {(newLecturer.degrees.length > 1) && (
                                                <button 
                                                    type="button"
                                                    onClick={() => removeDegree(index)} 
                                                    className='bg-red-500 w-8 h-8 rounded-full cursor-pointer hover:bg-red-600 transition flex items-center justify-center'
                                                >
                                                    <i className="fas fa-times text-white text-sm"></i>
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <div className="w-full flex justify-end">
                                        <button 
                                            type="button"
                                            onClick={moreDegree} 
                                            className='bg-[#FFC53A] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#e6b234] transition flex items-center gap-2'
                                        >
                                            <i className="fas fa-plus text-gray-900"></i>
                                            <span className="text-gray-900 text-sm">Add Degree</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                                    value={newLecturer.expertise || ''}
                                    onChange={(e) => setNewLecturer({...newLecturer, expertise: e.target.value})}
                                />
                            </div>

                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                                    value={newLecturer.city || 'Yangon'}
                                    onChange={(e) => setNewLecturer({...newLecturer, city: e.target.value})}
                                >
                                    <option value="Yangon">Yangon</option>
                                    <option value="Mandalay">Mandalay</option>
                                </select>
                            </div>

                            
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={createLoading}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type='submit'
                                className={`px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                                disabled={createLoading}
                            >
                                {createLoading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                                        Creating...
                                    </>
                                ) : (
                                    "Add Lecturer"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LecturerCreateModal;