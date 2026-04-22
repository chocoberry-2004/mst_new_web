import React, { useState, useEffect } from 'react';
import Loading from '../pages/Loading';
import SearchNotFound from '../components/SearchNotFound';
import logo from '../assets/images/mst_logo1.png';
import { useFAQ } from '../providers/FAQprovider';


function ManageFAQ() {
    const { FAQ, FAQLoading, FAQErr,refreshFAQ } = useFAQ();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedFAQ, setSelectedFAQ] = useState(null);
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [formData, setFormData] = useState({ question: '', answer: '' });


    const apiUrl = import.meta.env.VITE_API_URL;


    // Create or Update FAQ
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingFaq ? 'PUT' : 'POST';
        const url = editingFaq ? `${apiUrl}${editingFaq._id}` : `${apiUrl}`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormData({ question: '', answer: '' });
                setShowAddModal(false);
                setEditingFaq(null);
                refreshFAQ();
            }
        } catch (error) {
            console.error("Operation failed:", error);
        }
    };

    // Delete FAQ
    const handleDelete = async (id) => {
            try {
                await fetch(`${apiUrl}${id}`, { method: 'DELETE' });
                refreshFAQ();
            } catch (error) {
                console.error("Delete failed:", error);
            }

            setShowDeleteModal(false);
            setSelectedFAQ(null);
    };


    // Filter FAQs based on search term
    const filteredFAQs = FAQ?.filter(faq => {
        const matchSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())

        return matchSearch;
    });

    if (FAQLoading && FAQ?.length === 0) return <Loading />;

    return (
        <div className='space-y-6'>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h1>
                    <p className="text-gray-600 mt-1">Manage {FAQ?.length} FAQs</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <i className={`fas fa-${viewMode === 'grid' ? 'list' : 'th-large'} text-gray-600`}></i>
                    </button>
                    
                    <button 
                        onClick={() => {
                            setEditingFaq(null);
                            setFormData({ question: '', answer: '' });
                            setShowAddModal(true);
                        }}
                        className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] transition-colors font-medium cursor-pointer"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add FAQ
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total FAQs</p>
                            <p className="text-2xl font-bold text-gray-900">{FAQ?.length}</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <i className="fas fa-question-circle text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Search by question or answer keywords..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Data Display */}
            {FAQ?.length === 0 || filteredFAQs?.length === 0 ? (
                <SearchNotFound searchType={"FAQs"} />
            ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
                    {filteredFAQs?.map((faq) => (
                        <div key={faq._id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-gray-800 pr-4">{faq.question}</h3>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => {
                                            setEditingFaq(faq);
                                            setFormData({ question: faq.question, answer: faq.answer });
                                            setShowAddModal(true);
                                        }}
                                        className="text-blue-500 hover:text-blue-700 p-1 cursor-pointer"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setSelectedFAQ(faq)
                                            setShowDeleteModal(true);
                                        }}
                                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm whitespace-pre-wrap">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Simple Modal for Add/Edit */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden shadow-xl">

                        {/* Header Section */}
                        <div className="flex justify-between items-center sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-200">
                            <div className="flex gap-3 items-center">
                                <img src={logo} alt="MST Logo" className="w-14 h-14 rounded-full border-2 border-yellow-400 object-cover" />
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
                                    <p className="text-sm text-gray-500">{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex justify-center items-center hover:rotate-90 transition-all duration-300 ease-in-out"
                            >
                                <i className="fas fa-times text-md"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 p-6">
                            <input 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-yellow)]"
                                placeholder="Question"
                                value={formData.question}
                                onChange={e => setFormData({...formData, question: e.target.value})}
                                required
                            />
                            <textarea 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-yellow)] h-32"
                                placeholder="Answer"
                                value={formData.answer}
                                onChange={e => setFormData({...formData, answer: e.target.value})}
                                required
                            />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 cursor-pointer">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[#FFC53A] rounded font-bold cursor-pointer">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* delete modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-full max-w-md p-6">
                    <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Delete FAQs</h2>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete {selectedFAQ?.question} ? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button
                        onClick={() => setShowDeleteModal(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                        Cancel
                        </button>
                        <button
                        onClick={() => handleDelete(selectedFAQ?._id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            )

            }
        </div>
    );
}

export default ManageFAQ;