import React, { useState } from 'react';
import { useFaculty } from "../providers/FacultyProvider";

import Loading from '../pages/Loading';
import SearchNotFound from '../components/SearchNotFound';

// CRUD modals
import FacultyCreateModal from '../CRUD_Modals/Faculty/FacultyCreateModal';
import FacultyEditModal from '../CRUD_Modals/Faculty/FacultyEditModal';
import FacultyViewModal from '../CRUD_Modals/Faculty/FacultyViewModal';
import FacultyDeleteModal from '../CRUD_Modals/Faculty/FacultyDeleteModal';

// CRUD handlers
import { createFaculty } from '../CRUD_handlers/Faculty/CreateFaculty';
import { updateFaculty } from '../CRUD_handlers/Faculty/UpdateFaculty';
import { deleteFaculty } from '../CRUD_handlers/Faculty/DeleteFaculty';

function ManageFaculty() {
  const { facultyList, facultyLoading, facultyError, refetchFaculties } = useFaculty();

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for new faculty
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    status: 'active'
  });

  // Filter courses/programs based on search and filters
  const filteredFaculties = facultyList?.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.overview?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.career_paths?.some(path => 
                           path.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesStatus = filterStatus === 'all' || faculty.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalFaculties = facultyList?.length || 0;
  const activeFaculties = facultyList?.filter(f => f.status === "active").length || 0;
  const inactiveFaculties = facultyList?.filter(f => f.status == "inactive").length || 0;

  // Handle create faculty
  const handleCreateFaculty = async () => {
    setIsSubmitting(true);
    try {
      const result = await createFaculty(newFaculty);
      if (result.success) {
        await refetchFaculties();
        setShowAddModal(false);
        resetNewFacultyForm();
      } else {
        alert("Failed: " + result.message);
      }
    } catch (error) {
      console.error('Error creating faculty:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle update faculty
  const handleUpdateFaculty = async () => {
    if (!selectedFaculty?._id) return; 
    
    setIsSubmitting(true);
    try {
      const result = await updateFaculty(selectedFaculty._id, selectedFaculty); 
      
      if (result.success) {
        await refetchFaculties();
        setShowEditModal(false);
        setSelectedFaculty(null);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error('Error updating faculty:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete faculty
  const handleDeleteFaculty = async () => {
    if (!selectedFaculty?._id) return;
    
    setIsSubmitting(true);
    try {
      const result = await deleteFaculty(selectedFaculty._id);
      
      if (result.success) {
        await refetchFaculties(); // Refresh the list
        setShowDeleteModal(false); // Close modal
        setSelectedFaculty(null);  // Clear selection
      } else {
        alert("Delete failed: " + result.message);
      }
    } catch (error) {
      console.error('Error deleting faculty:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetNewFacultyForm = () => {
    setNewFaculty({
      name: '',
      code: '',
      head: '',
      headEmail: '',
      established: '',
      description: '',
      status: 'active'
    });
  };

  const colorClasses = {
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-50",
  },
  green: {
    text: "text-green-600",
    bg: "bg-green-50",
  },
  purple: {
    text: "text-purple-600",
    bg: "bg-purple-50",
  },
};

  // Show loading state
  if (facultyLoading) return <Loading/>

  // Show error state
  if (facultyError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <i className="fas fa-exclamation-circle text-3xl text-red-500 mb-4"></i>
          <p className="text-gray-600">Error loading faculty departments</p>
          <p className="text-sm text-gray-500 mt-2">{facultyError}</p>
          <button 
            onClick={refetchFaculties}
            className="mt-4 px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Faculty Departments</h1>
          <p className="text-gray-600 mt-1">View and manage all faculty departments in the institution</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <i className={`fas fa-${viewMode === 'grid' ? 'list' : 'th-large'} text-gray-600`}></i>
          </button>
         
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] transition-colors font-medium cursor-pointer"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Faculty
          </button>
        </div>
      </div>

      {/* stata cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Faculties", value: totalFaculties, icon: "fa-building", color: "blue" },
          { label: "Active Faculties", value: activeFaculties, icon: "fa-check-circle", color: "green" },
          { label: "Inactive Faculties", value: inactiveFaculties, icon: "fa-times-circle", color: "purple" }
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className={`text-2xl font-bold ${colorClasses[item.color].text}`}>
                  {item.value}
                </p>
              </div>
              <div className={`${colorClasses[item.color].bg} p-3 rounded-lg`}>
                <i className={`fas ${item.icon} ${colorClasses[item.color].text} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search departments by name, code, or head of department..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <i className="fas fa-flag absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {filteredFaculties?.length === 0 && (
        <SearchNotFound searchType={'Faculty'}/>
      )}

      {/* Faculty Grid/List View */}
      {filteredFaculties?.length > 0 && (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculties?.map(course => (
              <div key={course._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{course.name}</h3>
                       
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Duration: {course.duration}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      course.status === "active" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {course.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.overview}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex flex-wrap gap-1">
                      {course.levels?.map((level, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded border border-blue-100">
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 mt-auto">
                      <p className="text-xs font-medium text-gray-400 uppercase mb-2">Career Paths</p>
                      <p className="text-sm text-gray-700 truncate">
                          {course.career_paths?.join(", ")}
                      </p>
                  </div>

                  <div className="mt-4 mb-5 flex items-center justify-end gap-2">
                    <button 
                      onClick={() => { setSelectedFaculty(course); setShowViewModal(true); }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      onClick={() => { setSelectedFaculty(course); setShowEditModal(true); }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => { setSelectedFaculty(course); setShowDeleteModal(true); }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Levels</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFaculties.map(course => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{course.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {course.levels?.join(", ")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.duration}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => { setSelectedFaculty(course); setShowViewModal(true); }} className="text-blue-600 hover:text-blue-800 cursor-pointer"><i className="fas fa-eye"></i></button>
                        <button onClick={() => { setSelectedFaculty(course); setShowEditModal(true); }} className="text-green-600 hover:text-green-800 cursor-pointer"><i className="fas fa-edit"></i></button>
                        <button onClick={() => { setSelectedFaculty(course); setShowDeleteModal(true); }} className="text-red-600 hover:text-red-800 cursor-pointer"><i className="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Add Faculty Modal */}
      <FacultyCreateModal
        newFaculty={newFaculty}
        handleAddFaculty={handleCreateFaculty}
        setNewFaculty={setNewFaculty}
        show={showAddModal}
        setShowAddModal={setShowAddModal}
        isSubmitting={isSubmitting}
      />

      {/* Edit Faculty Modal */}
      <FacultyEditModal
        setSelectedFaculty={setSelectedFaculty}
        show={showEditModal}
        setShowEditModal={setShowEditModal}
        selectedFaculty={selectedFaculty}
        handleEditFaculty={handleUpdateFaculty}
        isSubmitting={isSubmitting}
      />

      {/* View Faculty Modal */}
      <FacultyViewModal 
        show={showViewModal}
        setShowViewModal={setShowViewModal}
        selectedFaculty={selectedFaculty}
      />
      
      {/* Delete Confirmation Modal */}
      <FacultyDeleteModal
        show={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        selectedFaculty={selectedFaculty}
        handleDelete={handleDeleteFaculty}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default ManageFaculty;