import React, { useState } from 'react';
import { useLecturer } from '../providers/LecturerProvider';

// CRUD Modal
import LecturerCreateModal from '../CRUD_Modals/Lecturer/LecturerCreateModal';
import LecturerEditModal from '../CRUD_Modals/Lecturer/LecturerEditModal';

function ManageLecturer() {

  const { lecturers, lecturerLoading, lecturerError } = useLecturer();

  const [createLoading, setCreateLoading] = useState(false);
  const [createErr, setCreateErr] = useState(null);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // statis

  const totalLecturer = lecturers?.length || 0;
  const PHDs =lecturers.degrees.includes("PHD");
  const MSCs =lecturers.degrees.includes("MSC");
  const BSCs =lecturers.degrees.includes("BSC");

  // Form state for new lecturer
  const [newLecturer, setNewLecturer] = useState({
    name: '',
    positions:'',
    degrees:[],
    profileImage:''
  });

  // Departments list for filter
  const departments = ['Computer Science', 'Engineering', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

  // Filter lecturers based on search and filters
  const filteredLecturers = lecturers?.filter(lecturer => {
    const matchesSearch =
      lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.positions.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch;
  });

  // Handle delete lecturer
  const handleDelete = (id) => {
    setLecturers(lecturers.filter(lecturer => lecturer.id !== id));
    setShowDeleteModal(false);
  };

  // Handle add lecturer
  const handleAddLecturer = () => {
    const newId = lecturers.length + 1;
    setLecturers([...lecturers, { ...newLecturer, id: newId, courses: 0, rating: 0, joinDate: new Date().toISOString().split('T')[0] }]);
    setShowAddModal(false);
    setNewLecturer({
      name: '',
      positions:'',
      degrees:[],
      profileImage:''
    });
  };

  // Handle edit lecturer
  const handleEditLecturer = () => {
    setLecturers(lecturers.map(lecturer => 
      lecturer.id === selectedLecturer.id ? selectedLecturer : lecturer
    ));
    setShowEditModal(false);
    setSelectedLecturer(null);
  };

  const resetForm = () => {
      setShowAddModal(false);
      setCreateErr(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Lecturers</h1>
          <p className="text-gray-600 mt-1">View and manage all lecturers in the institution</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <i className={`fas fa-${viewMode === 'grid' ? 'list' : 'th-large'} text-gray-600`}></i>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <i className="fas fa-download text-gray-600 mr-2"></i>
            Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] transition-colors font-medium cursor-pointer"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Lecturer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Lecturers</p>
              <p className="text-2xl font-bold text-gray-900">{lecturers?.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <i className="fas fa-chalkboard-teacher text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {/* {lecturers?.filter(l => l.positions.includes('Lecturer')).length} */}
              </p>            
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              {/* <p className="text-2xl font-bold text-red-600">{lecturers.filter(l => l.status === 'inactive').length}</p> */}
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <i className="fas fa-times-circle text-red-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Departments</p>
              <p className="text-sm text-gray-600">
                {/* {lecturers?.positions.join(', ')} */}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <i className="fas fa-building text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search lecturers by name, email, or department..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white cursor-pointer"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <i className="fas fa-filter absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white cursor-pointer"
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

      {/* Lecturers Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLecturers?.map((lecturer,id) => (
            <div key={id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FFC53A] to-[#e6b234] rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {lecturer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{lecturer.name}</h3>
                      <p className="text-sm text-gray-600">{lecturer.department}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    lecturer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {lecturer.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-envelope w-4 text-gray-400"></i>
                    <span>{lecturer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-phone w-4 text-gray-400"></i>
                    <span>{lecturer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-graduation-cap w-4 text-gray-400"></i>
                    <span>{lecturer.specialization}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-book-open w-4 text-gray-400"></i>
                    <span>{lecturer.courses} Courses</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <i className="fas fa-star text-yellow-400"></i>
                    <span className="text-sm font-medium">{lecturer.rating}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedLecturer(lecturer);
                        setShowEditModal(true);
                      }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedLecturer(lecturer);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecturer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLecturers?.map((lecturer, id) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FFC53A] to-[#e6b234] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {lecturer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{lecturer.name}</div>
                        <div className="text-sm text-gray-500">{lecturer.specialization}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lecturer.department}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{lecturer.email}</div>
                    <div className="text-sm text-gray-500">{lecturer.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lecturer.courses}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      lecturer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {lecturer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedLecturer(lecturer);
                          setShowEditModal(true);
                        }}
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedLecturer(lecturer);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      <LecturerCreateModal
        show={showAddModal}
        onClose={resetForm}
        onSubmit={handleAddLecturer}
        createLoading={createLoading}
        createErr={createErr}
        newLecturer={newLecturer}
        handleAddLecturer={handleAddLecturer}
      />

      <LecturerEditModal 
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
        }}
        onSubmit={handleEditLecturer}
        createLoading={createLoading}
        createErr={createErr}
        newLecturer={newLecturer}
        handleEditLecturer={handleEditLecturer}
        selectedLecturer={selectedLecturer}
      />


      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedLecturer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Lecturer</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {selectedLecturer.name}? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedLecturer.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ManageLecturer;