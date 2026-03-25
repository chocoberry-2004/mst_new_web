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

    if (!show) return null;

    // Helper functions for dynamic positions and degrees
    const morePosition = () => {
        const currentPositions = newLecturer.positions || [];
        setNewLecturer({
            ...newLecturer,
            positions: [...currentPositions, '']
        });
    };

    const moreDegree = () => {
        const currentDegrees = newLecturer.degrees || [];
        setNewLecturer({
            ...newLecturer,
            degrees: [...currentDegrees, '']
        });
    };

    const updatePosition = (index, value) => {
        const updatedPositions = [...(newLecturer.positions || [])];
        updatedPositions[index] = value;
        setNewLecturer({
            ...newLecturer,
            positions: updatedPositions
        });
    };

    const updateDegree = (index, value) => {
        const updatedDegrees = [...(newLecturer.degrees || [])];
        updatedDegrees[index] = value;
        setNewLecturer({
            ...newLecturer,
            degrees: updatedDegrees
        });
    };

    const removePosition = (index) => {
        const updatedPositions = [...(newLecturer.positions || [])];
        updatedPositions.splice(index, 1);
        setNewLecturer({
            ...newLecturer,
            positions: updatedPositions
        });
    };

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
                        onSubmit();
                    }}>
                        <div className="space-y-4">
                            {/* Profile Image */}
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Image
                                </label>
                                <div className="relative w-full h-44 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#FFC53A] transition cursor-pointer group overflow-hidden">
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

                            {/* Full Name */}
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

                            {/* Expertise */}
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                                    value={newLecturer.expertise || ''}
                                    onChange={(e) => setNewLecturer({...newLecturer, expertise: e.target.value})}
                                />
                            </div>

                            {/* City - Dropdown */}
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

                            {/* Award */}
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Award (Optional)</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                                    value={newLecturer.award || ''}
                                    onChange={(e) => setNewLecturer({...newLecturer, award: e.target.value})}
                                />
                            </div>

                            {/* Bio */}
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio (Optional)</label>
                                <textarea
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                                    value={newLecturer.bio || ''}
                                    onChange={(e) => setNewLecturer({...newLecturer, bio: e.target.value})}
                                />
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