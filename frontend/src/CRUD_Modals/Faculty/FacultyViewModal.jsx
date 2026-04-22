import React from 'react';
import logo from '../../assets/images/mst_logo1.png';

function FacultyViewModal({
    show,
    setShowViewModal,
    selectedFaculty, 
}) {

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">
                
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
                            <p className="text-sm text-gray-500">Faculty Details</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowViewModal(false)}
                        className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex justify-center items-center hover:rotate-90 transition-all duration-300 ease-in-out hover:bg-gray-200"
                    >
                        <i className="fas fa-times text-md"></i>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    <div className="space-y-6">
                        
                        {/* Title and Status */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div>
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedFaculty?.id}</span>
                                <h3 className="text-xl font-bold text-gray-900">{selectedFaculty?.name}</h3>
                            </div>
                            <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                                selectedFaculty?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {selectedFaculty?.status}
                            </span>
                        </div>

                        {/* Duration and Levels */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <i className="fas fa-clock text-blue-600"></i>
                                    <p className="text-sm font-semibold text-blue-600">Duration</p>
                                </div>
                                <p className="font-bold text-gray-900">{selectedFaculty?.duration}</p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <i className="fas fa-layer-group text-purple-600"></i>
                                    <p className="text-sm font-semibold text-purple-600">Available Levels</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedFaculty?.levels?.map((level, index) => (
                                        <span key={index} className="px-2 py-1 bg-white border border-purple-200 text-purple-700 text-xs font-medium rounded-md">
                                            {level}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Overview / Description */}
                        <div className="p-4 border border-gray-200 rounded-xl">
                            <p className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Course Overview</p>
                            <p className="text-gray-600 leading-relaxed italic">
                                "{selectedFaculty?.overview}"
                            </p>
                        </div>

                        {/* Career Paths */}
                        <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100">
                            <p className="text-sm font-bold text-emerald-700 mb-3 uppercase tracking-wide">Career Opportunities</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {selectedFaculty?.career_paths?.map((path, index) => (
                                    <div key={index} className="flex items-center gap-2 text-gray-700">
                                        <i className="fas fa-check-circle text-emerald-500 text-sm"></i>
                                        <span className="text-sm font-medium">{path}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

               
            </div>
        </div>
    );
}

export default FacultyViewModal;