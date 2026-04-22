import React from 'react'
import logo from '../../assets/images/mst_logo1.png';

function FacultyEditModal({
    show,
    setShowEditModal,
    setSelectedFaculty,
    selectedFaculty,
    handleEditFaculty
}) {

    if (!show) return null;

    // --- Helper Logic for Dynamic Arrays ---

    const addField = (field) => {
        setSelectedFaculty({
            ...selectedFaculty,
            [field]: [...(selectedFaculty[field] || []), '']
        });
    };

    const updateField = (field, index, value) => {
        const updated = [...(selectedFaculty[field] || [])];
        updated[index] = value;
        setSelectedFaculty({ ...selectedFaculty, [field]: updated });
    };

    const removeField = (field, index) => {
        const updated = [...(selectedFaculty[field] || [])];
        updated.splice(index, 1);
        setSelectedFaculty({ ...selectedFaculty, [field]: updated });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden shadow-xl">
                
                {/* Header Section */}
                <div className="flex justify-between items-center sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-200">
                    <div className="flex gap-3 items-center">
                        <img
                            src={logo}
                            alt="MST Logo"
                            className="w-14 h-14 rounded-full border-2 border-yellow-400 object-cover"
                        />
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
                            <p className="text-sm text-gray-500">Edit Faculty</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowEditModal(false)}
                        className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex justify-center items-center hover:rotate-90 transition-all duration-300 ease-in-out"
                    >
                        <i className="fas fa-times text-md"></i>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[75vh]">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Course Name */}
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Faculty Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 "
                                value={selectedFaculty?.name || ''}
                                onChange={(e) => setSelectedFaculty({...selectedFaculty, name: e.target.value})}
                            />
                        </div>

                        
                        {/* Duration */}
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={selectedFaculty?.duration || ''}
                                onChange={(e) => setSelectedFaculty({...selectedFaculty, duration: e.target.value})}
                            />
                        </div>

                        {/* Status */}
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={selectedFaculty?.status || 'active'}
                                onChange={(e) => setSelectedFaculty({...selectedFaculty, status: e.target.value})}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="col-span-2 space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Levels</label>
                            {(selectedFaculty?.levels || []).map((level, index) => (
                                <div key={`level-${index}`} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        value={level}
                                        onChange={(e) => updateField('levels', index, e.target.value)}
                                        placeholder="e.g., Level 4"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => removeField('levels', index)} 
                                        className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                                    >
                                        <i className="fas fa-times text-sm"></i>
                                    </button>
                                </div>
                            ))}
                            <div className="flex justify-end">
                                <button 
                                    type="button" 
                                    onClick={() => addField('levels')} 
                                    className="bg-[var(--accent-yellow)] px-3 py-1 rounded-lg text-sm font-bold hover:bg-yellow-500 flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                    <i className="fas fa-plus"></i> Add
                                </button>
                            </div>
                        </div>

                        <div className="col-span-2 space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Career Paths</label>
                            {(selectedFaculty?.career_paths || []).map((path, index) => (
                                <div key={`path-${index}`} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        value={path}
                                        onChange={(e) => updateField('career_paths', index, e.target.value)}
                                        placeholder="e.g., UI/UX Designer"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => removeField('career_paths', index)} 
                                        className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                                    >
                                        <i className="fas fa-times text-sm"></i>
                                    </button>
                                </div>
                            ))}
                            <div className="flex justify-end">
                                <button 
                                    type="button" 
                                    onClick={() => addField('career_paths')} 
                                    className="bg-[var(--accent-yellow)] px-3 py-1 rounded-lg text-sm font-bold hover:bg-yellow-500 flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                    <i className="fas fa-plus"></i> Add
                                </button>
                            </div>
                        </div>

                        {/* Overview */}
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Course Overview</label>
                            <textarea
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={selectedFaculty?.overview || ''}
                                onChange={(e) => setSelectedFaculty({...selectedFaculty, overview: e.target.value})}
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button
                            type="button"
                            onClick={() => setShowEditModal(false)}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleEditFaculty}
                            className="px-6 py-2 bg-[var(--accent-yellow)] text-gray-900 rounded-lg hover:bg-yellow-500 font-bold shadow-sm cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacultyEditModal;