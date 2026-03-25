import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/mst_logo1.png';

function LecturerEditModal({
    show,
    onClose,
    onSubmit,
    editLoading,
    editErr,
    newLecturer,
    setNewLecturer,
    selectedLecturer,
    handleImage,
    profilePreview,
    removeImage,
    profileImage
}) {

    // Initialize with arrays when modal opens (matching CreateModal pattern)
    useEffect(() => {
        if (show && selectedLecturer) {
            // Ensure positions is an array
            if (!newLecturer.position || newLecturer.position.length === 0) {
                setNewLecturer(prev => ({
                    ...prev,
                    position: selectedLecturer.position || ['']
                }));
            }

            // Ensure degrees is an array
            if (!newLecturer.degree || newLecturer.degree.length === 0) {
                setNewLecturer(prev => ({
                    ...prev,
                    degree: selectedLecturer.degree || ['']
                }));
            }

            // Ensure expertise is an array
            if (!newLecturer.expertise || newLecturer.expertise.length === 0) {
                setNewLecturer(prev => ({
                    ...prev,
                    expertise: selectedLecturer.expertise || ['']
                }));
            }
        }
    }, [show, selectedLecturer, setNewLecturer]);

    if (!show) return null;

    // Helper functions for dynamic fields (updated to use arrays)
    const morePosition = () => {
        setNewLecturer({
            ...newLecturer,
            position: [...(newLecturer.position || []), '']
        });
    };

    const moreDegree = () => {
        setNewLecturer({
            ...newLecturer,
            degree: [...(newLecturer.degree || []), '']
        });
    };

    const moreExpertise = () => {
        setNewLecturer({
            ...newLecturer,
            expertise: [...(newLecturer.expertise || []), '']
        });
    };

    const updatePosition = (index, value) => {
        const updated = [...(newLecturer.position || [])];
        updated[index] = value;
        setNewLecturer({ ...newLecturer, position: updated });
    };

    const updateDegree = (index, value) => {
        const updated = [...(newLecturer.degree || [])];
        updated[index] = value;
        setNewLecturer({ ...newLecturer, degree: updated });
    };

    const updateExpertise = (index, value) => {
        const updated = [...(newLecturer.expertise || [])];
        updated[index] = value;
        setNewLecturer({ ...newLecturer, expertise: updated });
    };

    const removePosition = (index) => {
        const updated = [...(newLecturer.position || [])];
        updated.splice(index, 1);
        setNewLecturer({ ...newLecturer, position: updated });
    };

    const removeDegree = (index) => {
        const updated = [...(newLecturer.degree || [])];
        updated.splice(index, 1);
        setNewLecturer({ ...newLecturer, degree: updated });
    };

    const removeExpertise = (index) => {
        const updated = [...(newLecturer.expertise || [])];
        updated.splice(index, 1);
        setNewLecturer({ ...newLecturer, expertise: updated });
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
                                <p className="text-sm text-gray-500">Edit Lecturer</p>
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
                    {editErr && (
                        <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{editErr}</p>
                        </div>
                    )}

                    <form className='p-6' encType='multipart/form-data' onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(); // Call parent's submit handler
                    }}>
                        <div className="space-y-4">

                            {/* Profile Image Section - Matching CreateModal layout */}
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Profile Image
                                    </label>

                                    <div className="relative w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#FFC53A] transition cursor-pointer group overflow-hidden">

                                        {/* Preview (if image selected) */}
                                        {profilePreview ? (
                                            <>
                                                <img
                                                    src={profilePreview}
                                                    alt="preview"
                                                    className="absolute inset-0 w-44 h-full object-cover"
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

                                <div className="space-y-4">
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
                            </div>

                            {/* Positions Section - Updated to use array */}
                            <div id="position-container">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Positions</label>
                                    {(newLecturer.position || []).map((position, index) => (
                                        <div key={`position-${index}`} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                                                value={position}
                                                onChange={(e) => updatePosition(index, e.target.value)}
                                                placeholder={`Position ${index + 1}`}
                                            />
                                            {(newLecturer.position.length > 1) && (
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
                                            <span className="text-gray-900 text-sm">Add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Degrees Section - Updated to use array */}
                            <div id="degree-container">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Degrees</label>
                                    {(newLecturer.degree || []).map((degree, index) => (
                                        <div key={`degree-${index}`} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                                                value={degree}
                                                onChange={(e) => updateDegree(index, e.target.value)}
                                                placeholder={`Degree ${index + 1}`}
                                            />
                                            {(newLecturer.degree.length > 1) && (
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
                                            <span className="text-gray-900 text-sm">Add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Expertise Section - Updated to use array and match CreateModal layout */}
                            <div id="expertise-container">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>

                                    {(newLecturer.expertise || []).map((exp, index) => (
                                        <div key={`expertise-${index}`} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                                                value={exp}
                                                onChange={(e) => updateExpertise(index, e.target.value)}
                                                placeholder={`Expertise ${index + 1}`}
                                            />

                                            {(newLecturer.expertise.length > 1) && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeExpertise(index)}
                                                    className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                                                >
                                                    <i className="fas fa-times text-white text-sm"></i>
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <div className="w-full flex justify-end">
                                        <button
                                            type="button"
                                            onClick={moreExpertise}
                                            className="bg-[#FFC53A] px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                                        >
                                            <i className="fas fa-plus text-gray-900"></i>
                                            <span className="text-gray-900 text-sm">Add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={editLoading}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type='submit'
                                className={`px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                                disabled={editLoading}
                            >
                                {editLoading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LecturerEditModal;