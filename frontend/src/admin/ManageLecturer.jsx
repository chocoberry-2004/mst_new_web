import React, { useState, useMemo } from 'react';
import { useLecturer } from '../providers/LecturerProvider';

import SearchNotFound from '../components/SearchNotFound';
import NotFound from '../pages/NotFound';
import Loading from '../pages/Loading';

// CRUD Handlers
import { createLecturer } from '../CRUD_handlers/Lecturer/createLecturer';
import { updateLecturer } from '../CRUD_handlers/Lecturer/updateLecturer';
import { deleteLecturer } from '../CRUD_handlers/Lecturer/deleteLecturer';

// CRUD Modals
import LecturerCreateModal from '../CRUD_Modals/Lecturer/LecturerCreateModal';
import LecturerEditModal from '../CRUD_Modals/Lecturer/LecturerEditModal';
import LecturerDeleteModal from '../CRUD_Modals/Lecturer/LecturerDeleteModal';

function ManageLecturer() {
  const { lecturers, lecturerLoading, lecturerError, refreshLecturers } = useLecturer();

  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [createErr, setCreateErr] = useState(null);
  const [editErr, setEditErr] = useState(null);
  const [deleteErr, setDeleteErr] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Get unique cities for filter
  const cities = [...new Set(lecturers?.map(l => l.city).filter(Boolean))];

  // Stats
  const totalLecturer = lecturers?.length || 0;
  const yangonCount = lecturers?.filter(l => l.city === 'Yangon').length || 0;
  const mandalayCount = lecturers?.filter(l => l.city === 'Mandalay').length || 0;
  const otherCitiesCount = lecturers?.filter(l => l.city && l.city !== 'Yangon' && l.city !== 'Mandalay').length || 0;

  // Form state for new lecturer
  const [newLecturer, setNewLecturer] = useState({
    name: '',
    position: [], 
    degree: [],   
    expertise: [],
    city: 'Yangon',
    profileImageURL: ''
  });

  // Filter lecturers based on search and city filter
  const filteredLecturers = useMemo(() => {
    return lecturers?.filter(lecturer => {
      const matchesSearch = 
        lecturer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.expertise?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.degree?.some(deg => deg.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCity = filterCity === 'all' || lecturer.city === filterCity;
      
      return matchesSearch && matchesCity;
    });
  }, [lecturers, searchTerm, filterCity]);

  
  // Handle create lecturer
  const handleCreateLecturer = async () => {
    try {
      setCreateLoading(true);
      setCreateErr(null);
      
      const formData = new FormData();
      
      // Basic fields
      if (newLecturer.name) {
        formData.append('name', newLecturer.name);
      }
      
      // position
      if (newLecturer.position?.length > 0) {
        newLecturer.position
          .filter(p => p.trim())
          .forEach(p => formData.append('position[]', p));
      }

      // degree
      if (newLecturer.degree?.length > 0) {
        newLecturer.degree
          .filter(d => d.trim())
          .forEach(d => formData.append('degree[]', d));
      }

      // expertise
      if (newLecturer.expertise?.length > 0) {
        newLecturer.expertise
          .filter(e => e.trim())
          .forEach(e => formData.append('expertise[]', e));
      }

      if (newLecturer.city) {
        const validCities = ["Yangon", "Mandalay"];
        if (validCities.includes(newLecturer.city)) {
          formData.append('city', newLecturer.city);
        } else {
          formData.append('city', 'Yangon');
        }
      } else {
        formData.append('city', 'Yangon'); // Default city
      }
      
      if (profileImage) {
        formData.append('image', profileImage); // Changed from 'profileImage' to 'image'
      }
      
      // Log for debugging
      console.log('Sending FormData:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      
      const response = await createLecturer(formData);
      
      if (response.success) {
        await refreshLecturers();
        resetForm();
        // Optional: Show success message
        alert('Lecturer created successfully!');
      } else {
        setCreateErr(response.message || 'Failed to create lecturer');
      }
    } catch (error) {
      console.error('Error creating lecturer:', error);
      setCreateErr(error.message || 'An error occurred while creating the lecturer');
    } finally {
      setCreateLoading(false);
    }
  };

  
  // Handle edit lecturer
  const handleEditLecturer = async () => {
      try {
          setEditLoading(true);
          setEditErr(null);
          
          const formData = new FormData();
          
          // Basic fields
          if (newLecturer.name) formData.append('name', newLecturer.name);
          
          // position
          if (newLecturer.position?.length > 0) {
            newLecturer.position
              .filter(p => p.trim())
              .forEach(p => formData.append('position[]', p));
          }

          // degree
          if (newLecturer.degree?.length > 0) {
            newLecturer.degree
              .filter(d => d.trim())
              .forEach(d => formData.append('degree[]', d));
          }

          // expertise
          if (newLecturer.expertise?.length > 0) {
            newLecturer.expertise
              .filter(e => e.trim())
              .forEach(e => formData.append('expertise[]', e));
          }

          // City validation
          if (newLecturer.city && ["Yangon", "Mandalay"].includes(newLecturer.city)) {
              formData.append('city', newLecturer.city);
          } else {
              formData.append('city', 'Yangon');
          }
          
          // Image field must be 'image'
          if (profileImage) {
              formData.append('image', profileImage);
          }
          
          const response = await updateLecturer(selectedLecturer._id, formData);
          
          if(response.success) {
              await refreshLecturers();
              setShowEditModal(false);
              setSelectedLecturer(null);
              resetForm();
          } else {
              setEditErr(response.error || 'Failed to update lecturer');
          }
      } catch (error) {
          console.error('Error updating lecturer:', error);
          setEditErr('An error occurred while updating the lecturer');
      } finally {
          setEditLoading(false);
      }
  };

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      setDeleteErr(null);
      
      const response = await deleteLecturer(id);
      
      if(response.success) {
        await refreshLecturers(); // Refresh the list
        setShowDeleteModal(false);
        setSelectedLecturer(null);
      } else {
        setDeleteErr(response.error || 'Failed to delete lecturer');
      }
    } catch (error) {
      console.error('Error deleting lecturer:', error);
      setDeleteErr('An error occurred while deleting the lecturer');
    } finally {
      setDeleteLoading(false);
    }
  };

  const resetForm = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setCreateErr(null);
    setEditErr(null);
    setProfileImage(null);
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview);
    }
    setProfilePreview(null);
    setSelectedLecturer(null);
    setNewLecturer({
      name: '',
      position: [],
      degree: [],
      expertise: [],
      city: 'Yangon',
      profileImageURL: ''
    });
  };

  const handleImage = (file) => {
    if(file && file.type.startsWith("image/")) {
      // Create preview URLs
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }
      const profilePreviewUrl = URL.createObjectURL(file);
      setProfilePreview(profilePreviewUrl);
      setProfileImage(file);
      setNewLecturer({...newLecturer, profileImageURL: file.name});
    } else if(file) {
      setCreateErr("Please upload only image files");
    }
  };

  const removeImage = () => {
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview);
    }
    setProfileImage(null);
    setProfilePreview(null);
    setNewLecturer({...newLecturer, profileImageURL: ''});
  };

  if(lecturerLoading) return <Loading/>;
  
  if(lecturerError) return <NotFound message={`Error loading lecturers: ${lecturerError}`} />;

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
              <p className="text-2xl font-bold text-gray-900">{totalLecturer}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <i className="fas fa-chalkboard-teacher text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Yangon</p>
              <p className="text-2xl font-bold text-green-600">{yangonCount}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <i className="fas fa-map-marker-alt text-green-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mandalay</p>
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
                      {lecturer.profileImageURL ? (
                        <img 
                          src={`${import.meta.env.VITE_BASE_URL}${lecturer.profileImageURL}`} 
                          alt={lecturer.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-[#FFC53A] to-[#e6b234] rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {lecturer.name?.split(' ').map(n => n[0]).join('') || 'L'}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{lecturer.name}</h3>
                        <p className="text-sm text-gray-600">{lecturer.position?.join(', ') || 'No position'}</p>
                        <p className="text-xs text-gray-500 mt-1">{lecturer.city}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fas fa-graduation-cap w-4 text-gray-400"></i>
                      <span>{lecturer.degree?.join(', ') || 'No degree'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fas fa-chalkboard-teacher w-4 text-gray-400"></i>
                      <span>{lecturer.expertise?.join(', ') || 'No expertise'}</span>
                    </div>
                    {lecturer.award && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="fas fa-trophy w-4 text-gray-400"></i>
                        <span>{lecturer.award}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                    <button 
                      onClick={() => {
                        // Convert single position/degree to arrays for editing
                        const editData = {
                          ...lecturer,
                          position: lecturer.position || [],
                          degree: lecturer.degree || [],
                          expertise: lecturer.expertise || []
                        };
                        setSelectedLecturer(lecturer);
                        setNewLecturer(editData);
                        setShowEditModal(true);
                      }}
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
                          onClick={() => {
                            const editData = {
                              ...lecturer,
                              position: lecturer.position || [],
                              degree: lecturer.degree || [],
                              expertise: lecturer.expertise || []
                            };
                            setSelectedLecturer(lecturer);
                            setNewLecturer(editData);
                            setShowEditModal(true);
                          }}
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

      <LecturerCreateModal
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
  );
}

export default ManageLecturer;