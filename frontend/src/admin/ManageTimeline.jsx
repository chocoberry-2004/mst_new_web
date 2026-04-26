import React, { useState } from 'react';
import Loading from '../pages/Loading';
import SearchNotFound from '../components/SearchNotFound';
import logo from '../assets/images/mst_logo1.png';
import { useTimeLine } from '../providers/TimeLineProvider';

function ManageTimeline() {
    const { timeLine, timeLineLoading, timeLineErr, refreshTimeLine } = useTimeLine();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingMilestone, setEditingMilestone] = useState(null);
    const [formData, setFormData] = useState({ year: '', title: '', description: '' });

    const apiUrl = import.meta.env.VITE_API_URL;

    // Helper to format ISO strings to YYYY-MM-DD for the date input
    const formatForInput = (isoString) => {
        if (!isoString) return '';
        return isoString.split('T')[0]; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingMilestone ? 'PUT' : 'POST';
        const url = editingMilestone ? `${apiUrl}/timeline/${editingMilestone._id}` : `${apiUrl}/timeline`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormData({ year: '', title: '', description: '' });
                setShowAddModal(false);
                setEditingMilestone(null);
                refreshTimeLine(); 
            }
        } catch (error) {
            console.error("Save operation failed:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${apiUrl}/timeline/${id}`, { method: 'DELETE' });
            if (res.ok && refreshTimeLine) refreshTimeLine();
        } catch (error) {
            console.error("Delete failed:", error);
        }
        setShowDeleteModal(false);
        setSelectedMilestone(null);
    };

    const filteredhistory = (timeLine || [])
        .filter(history => {
            if (!searchTerm) return true;
            const term = searchTerm.toLowerCase();
            const yearStr = new Date(history.year).getFullYear().toString();
            
            return (
                history.title.toLowerCase().includes(term) ||
                history.description.toLowerCase().includes(term) ||
                yearStr.includes(term)
            );
        })

        .sort((a, b) => new Date(b.year) - new Date(a.year)) 
        // Result: 2026, 2010, 2000

    if (timeLineLoading) return <Loading />;
    if (timeLineErr) return <div className="text-red-500 p-4">Error loading timeline: {timeLineErr}</div>;

    return (
        <div className='space-y-6'>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manage M.S.T History Panel</h1>
                    <p className="text-gray-600 mt-1">View and manage {timeLine?.length || 0} M.S.T History Timeline</p>
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
                            setEditingMilestone(null);
                            setFormData({ year: '', title: '', description: '' });
                            setShowAddModal(true);
                        }}
                        className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] transition-colors font-medium cursor-pointer"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add History
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Search by title, description or year..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Timeline List */}
            {filteredhistory.length === 0 ? (
                <SearchNotFound searchType={"History"} />
            ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
                    {filteredhistory.map((milestone) => (
                        <div key={milestone._id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                            
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-gray-800 pr-12">{milestone.title}</h3>

                                <div className="bg-gray-200 px-3 py-1 text-xs font-bold rounded-bl-lg text-[var(--primary-dark)]">
                                    {new Date(milestone.year).toLocaleDateString()}
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm whitespace-pre-wrap">{milestone.description}</p>

                            <div className="flex justify-end">
                                <div className="flex gap-2 mb-5">
                                    <button 
                                        onClick={() => {
                                            setEditingMilestone(milestone);
                                            setFormData({ 
                                                year: formatForInput(milestone.year), // FIX: Format for <input type="date">
                                                title: milestone.title, 
                                                description: milestone.description 
                                            });
                                            setShowAddModal(true);
                                        }}
                                        className="text-blue-500 hover:text-blue-700 p-1 cursor-pointer"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setSelectedMilestone(milestone);
                                            setShowDeleteModal(true);
                                        }}
                                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden shadow-xl">
                        <div className="flex justify-between items-center sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-200">
                            <div className="flex gap-3 items-center">
                                <img src={logo} alt="Logo" className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover" />
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">M.S.T Timeline</h1>
                                    <p className="text-sm text-gray-500">{editingMilestone ? 'Update Milestone' : 'Add New Milestone'}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input 
                                        type="date"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                        value={formData.year}
                                        onChange={e => setFormData({...formData, year: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-sm font-medium mb-1">Milestone Title</label>
                                    <input 
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                        placeholder="What happened?"
                                        value={formData.title}
                                        onChange={e => setFormData({...formData, title: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea 
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none h-32"
                                    placeholder="Provide some details..."
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 cursor-pointer">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[#FFC53A] rounded-lg font-bold hover:bg-yellow-500 cursor-pointer">
                                    {editingMilestone ? 'Update Milestone' : 'Save Milestone'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                            <i className="fas fa-trash-alt text-2xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Milestone?</h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to remove the history for <b>{new Date(selectedMilestone?.year).toLocaleDateString()}</b>?
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2 border border-gray-200 rounded-lg cursor-pointer">Cancel</button>
                            <button onClick={() => handleDelete(selectedMilestone._id)} className="flex-1 py-2 bg-red-600 text-white rounded-lg cursor-pointer">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageTimeline;