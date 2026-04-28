import React from 'react'
import { useState } from 'react';
import { useUser } from '../providers/UserProvider';

import UserCreateModal from '../CRUD_Modals/User/UserCreateModal';

function ManageUser() {

  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Lecturers Panel</h1>
          <p className="text-gray-600 mt-1">View and manage all Users in M.S.T</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <i className={`fas fa-${viewMode === 'grid' ? 'list' : 'th-large'} text-gray-600`}></i>
          </button>
         
          <button 
            // onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] transition-colors font-medium cursor-pointer"
          >
            <i className="fas fa-plus mr-2"></i>
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-blue-600">{totaluser}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <i className="fas fa-chalkboard-teacher text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Admin Users</p>
              <p className="text-2xl font-bold text-green-600">{Totaladmin}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <i className="fas fa-map-marker-alt text-green-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lecturers</p>
              <p className="text-2xl font-bold text-orange-600">{mandalayCount}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <i className="fas fa-map-marker-alt text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Other Cities</p>
              <p className="text-2xl font-bold text-purple-600">{otherCitiesCount}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <i className="fas fa-city text-purple-600 text-xl"></i>
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
              placeholder="Search lecturers by name, position, expertise, or degree..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white cursor-pointer"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
              >
                <option value="all">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <i className="fas fa-city absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>


      {
        totalLecturer === 0 ? (
          <SearchNotFound searchType={'lecturer'}/>
        ) : filteredLecturers?.length === 0 ? (
          <SearchNotFound searchType={'lecturer'} message="No lecturers match your search criteria"/>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLecturers?.map((lecturer) => (
           
              <div key={lecturer._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {
                        console.log(lecturer?.profileImageURL)
                      }
                     
                      {lecturer.profileImageURL ? (
                        
                        <img 
                          src={`${import.meta.env.VITE_BASE_URL}${lecturer?.profileImageURL}`} 
                          alt={lecturer.name}
                          className="w-16 h-16 rounded-full object-cover border-3 border-[var(--primary-dark)]"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-[#FFC53A] to-[#e6b234] rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {lecturer.name?.split(' ').map(n => n[0]).join('') || 'L'}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{lecturer.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <i className="fas fa-map-marker-alt text-xs"></i>
                          <span>{lecturer.city || 'Unknown location'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  

                  <div className="mt-5 space-y-3">

                    {/* Position */}
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 text-blue-600">
                        <i className="fas fa-user-tie text-sm"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Position</p>
                        <p className="text-sm font-medium text-gray-700">
                          {lecturer.position?.join(', ') || 'No position'}
                        </p>
                      </div>
                    </div>

                    {/* Degree */}
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-100 text-green-600">
                        <i className="fas fa-graduation-cap text-sm"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Degree</p>
                        <p className="text-sm font-medium text-gray-700">
                          {lecturer.degree?.join(', ') || 'No degree'}
                        </p>
                      </div>
                    </div>

                    {/* Expertise */}
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-purple-100 text-purple-600">
                        <i className="fas fa-chalkboard-teacher text-sm"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Expertise</p>
                        <p className="text-sm font-medium text-gray-700">
                          {lecturer.expertise?.join(', ') || 'No expertise'}
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="mt-4 mb-5 pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleOpenEditModal(lecturer)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedLecturer(lecturer);
                        setShowDeleteModal(true);
                      }}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecturer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLecturers?.map((lecturer) => (
                  <tr key={lecturer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {lecturer.profileImageURL ? (
                          <img 
                            src={`${import.meta.env.VITE_BASE_URL}${lecturer.profileImageURL}`} 
                            alt={lecturer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-[#FFC53A] to-[#e6b234] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {lecturer.name?.split(' ').map(n => n[0]).join('') || 'L'}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{lecturer.name}</div>
                          <div className="text-xs text-gray-500">{lecturer._id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lecturer.position?.join(', ') || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lecturer.degree?.join(', ') || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lecturer.expertise?.join(', ') || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lecturer.city || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleOpenEditModal(lecturer)}
                          className="text-green-600 hover:text-green-800 cursor-pointer"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedLecturer(lecturer);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                          title="Delete"
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
        )
      }

      <UserCreateModal
        show={showAddModal}
        onClose={resetForm}
        onSubmit={handleCreateLecturer}
        createLoading={createLoading}
        createErr={createErr}
        newLecturer={newLecturer}
        setNewLecturer={setNewLecturer}
        handleImage={handleImage}
        profilePreview={profilePreview}
        removeImage={removeImage}
        profileImage={profileImage}
      />

      <LecturerEditModal 
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          resetForm();
        }}
        onSubmit={handleEditLecturer}
        editLoading={editLoading}
        editErr={editErr}
        newLecturer={newLecturer}
        setNewLecturer={setNewLecturer}
        selectedLecturer={selectedLecturer}
        handleImage={handleImage}
        profilePreview={profilePreview}
        removeImage={removeImage}
        profileImage={profileImage}
      />

      <LecturerDeleteModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedLecturer(null);
          setDeleteErr(null);
        }}
        selectedLecturer={selectedLecturer}
        onSubmit={() => handleDelete(selectedLecturer?._id)}
        deleteLoading={deleteLoading}
        deleteErr={deleteErr}
      />

    </div>
  )
}

export default ManageUser