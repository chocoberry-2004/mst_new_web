import React, { useState, useEffect } from 'react';
import { useAchievement } from '../providers/AchievemetProvider';
import Loading from '../pages/Loading';

import CreateAchievementModal from '../CRUD_Modals/Achievement/CreateAchievementModal';
import ViewAchievementModal from '../CRUD_Modals/Achievement/ViewAchievementModal';
import EditAchievementModal from '../CRUD_Modals/Achievement/EditAchievementModal';
import DeleteAchievementModal from '../CRUD_Modals/Achievement/DeleteAchievementModal';

function ManageAchievement() {
  const { awards, awardLoading, awardErr,awardType, awardTypeLoading, awardTypeErr } = useAchievement();
  const [achievements, setAchievements] = useState([]);

  const placeholderImg = "https://t4.ftcdn.net/jpg/06/57/37/01/360_F_657370150_pdNeG5pjI976ZasVbKN9VqH1rfoykdYU.jpg";

  useEffect(() => {
    if (awards) {
      setAchievements(awards);
    }
  }, [awards]);

  // console.log(awards);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterCountry, setFilterCountry] = useState('All Countries');
  const [filterYear, setFilterYear] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const years = ['all', ...new Set(achievements.map(a => a.date))].sort();

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (achievement.description && achievement.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         achievement.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'All Categories' || achievement.category === filterCategory;
    const matchesCountry = filterCountry === 'All Countries' || achievement.country === filterCountry;
    const matchesYear = filterYear === 'all' || achievement.date === filterYear;
    
    return matchesSearch && matchesCategory && matchesCountry && matchesYear;
  });

  const totalAchievements = achievements.length;

  // countries in the response
  let achievedCountry = ["All Countries"];
  achievements.forEach((cou) => {
    if (cou.country && !achievedCountry.includes(cou.country)) {
      achievedCountry.push(cou.country);
    }
  });

  let achievedCategory = ['All Categories'];
  achievements.forEach((cat) => {
    if(cat.category && !achievedCategory.includes(cat.category)) {
      achievedCategory.push(cat.category);
    }
  })  

  const achievementsByYear = achievements.reduce((acc, curr) => {
    if (curr.date) {
      acc[curr.date] = (acc[curr.date] || 0) + 1;
    }
    return acc;
  }, {});
  
  const achievementsByCategory = achievements.reduce((acc, curr) => {
    if (curr.category) {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
    }
    return acc;
  }, {});

  const countriesWithAchievements = new Set(achievements.map(a => a.country).filter(Boolean)).size;

  const handleDelete = (id) => {
    setAchievements(prev =>
      prev.filter(a => a._id !== id)
    );
    setShowDeleteModal(false);
  };

  const handleAddAchievement = (newAchievement) => {
    setAchievements([...achievements, { 
      ...newAchievement, 
      metrics: newAchievement.metrics || {}
    }]);
    setShowAddModal(false);
  };

  const handleEditAchievement = (updatedAchievement) => {
    const normalized = {
      ...updatedAchievement,
      imageUrl: updatedAchievement.imageUrl || updatedAchievement.image
    };

    setAchievements(prev =>
      prev.map(a =>
        a._id === normalized._id ? normalized : a
      )
    );

    setShowEditModal(false);
    setSelectedAchievement(null);
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Academic Excellence':
        return 'bg-blue-100 text-blue-800';
      case 'Career Development':
        return 'bg-green-100 text-green-800';
      case 'International Collaboration':
        return 'bg-purple-100 text-purple-800';
      case 'Academic Performance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Innovation in Education':
        return 'bg-orange-100 text-orange-800';
      case 'Research Excellence':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Academic Excellence':
        return 'fa-trophy';
      case 'Career Development':
        return 'fa-briefcase';
      case 'International Collaboration':
        return 'fa-globe';
      case 'Academic Performance':
        return 'fa-graduation-cap';
      case 'Innovation in Education':
        return 'fa-lightbulb';
      case 'Research Excellence':
        return 'fa-flask';
      default:
        return 'fa-award';
    }
  };

  if (awardLoading) {
    return <Loading/>;
  }

  const categoriesWithoutAll = achievedCategory.filter(c => c !== 'All Categories');

  const currentYear = new Date().getFullYear();

  // Helper function to get image URL
  const getImageUrl = (achievement) => {
    if (achievement.imageUrl) {
      // Check if it's a full URL or needs BASE_URL prepended
      if (achievement?.imageUrl[0]?.startsWith('http')) {
        return achievement.imageUrl;
      }
      return `${import.meta.env.VITE_BASE_URL}${achievement.imageUrl}`;
    }
    return placeholderImg;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Achievements</h1>
          <p className="text-gray-600 mt-1">View and manage all institutional awards and recognitions</p>
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
            Add Achievement
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Achievements</p>
              <p className="text-2xl font-bold text-gray-900">{totalAchievements}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <i className="fas fa-award text-blue-600 text-xl"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Across {countriesWithAchievements} countries</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-purple-600">{Object.keys(achievementsByCategory).length}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <i className="fas fa-tags text-purple-600 text-xl"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Different achievement types</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Year</p>
              <p className="text-2xl font-bold text-green-600">
                {achievementsByYear[currentYear] || 0}
              </p>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <i className="fas fa-calendar-check text-green-600 text-xl"></i>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Achievements in {currentYear}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Top Category</p>
              <p className="text-2xl font-bold text-[#FFC53A]">
                {Object.entries(achievementsByCategory).sort((a, b) => b[1] - a[1])[0]?.[1] || 0}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <i className="fas fa-chart-bar text-[#FFC53A] text-xl"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {Object.entries(achievementsByCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
          </p>
        </div>

      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search achievements by title, organization, or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white cursor-pointer"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {achievedCategory.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <i className="fas fa-tag absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white cursor-pointer"
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
              >
                {achievedCountry.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <i className="fas fa-globe absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white cursor-pointer"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <option value="all">All Years</option>
                {years.filter(y => y !== 'all').map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <i className="fas fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => (
            <div key={achievement._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden relative bg-gray-100">
                <div className="flex justify-center items-center h-full">
                  <img 
                    src={getImageUrl(achievement)} 
                    alt={achievement.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholderImg;
                    }}
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(achievement.category)}`}>
                    <i className={`fas ${getCategoryIcon(achievement.category)} mr-1`}></i>
                    {achievement.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{achievement.organization}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-map-marker-alt w-5 text-gray-400"></i>
                    <span>{achievement.location}, {achievement.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-calendar w-5 text-gray-400"></i>
                    <span>{achievement.date}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{achievement.description}</p>

                {achievement.metrics && Object.keys(achievement.metrics).length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {Object.entries(achievement.metrics).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-lg px-3 py-2 flex-1 min-w-[80px]">
                        <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {Array.isArray(value) ? value.length : value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <i className="fas fa-building text-gray-400"></i>
                    <span className="text-sm text-gray-600">{achievement.organization}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setSelectedAchievement(achievement);
                        setShowViewModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedAchievement(achievement);
                        setShowEditModal(true);
                      }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedAchievement(achievement);
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
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achievement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metrics</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAchievements.map(achievement => (
                <tr key={achievement._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img 
                      src={getImageUrl(achievement)} 
                      alt={achievement.title}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImg;
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{achievement.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{achievement.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(achievement.category)}`}>
                      {achievement.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{achievement.organization}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{achievement.location}</div>
                    <div className="text-xs text-gray-500">{achievement.country}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{achievement.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {achievement.metrics && Object.entries(achievement.metrics).slice(0, 2).map(([key, value]) => (
                        <span key={key} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {key}: {Array.isArray(value) ? value.length : value}
                        </span>
                      ))}
                      {achievement.metrics && Object.keys(achievement.metrics).length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{Object.keys(achievement.metrics).length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedAchievement(achievement);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedAchievement(achievement);
                          setShowEditModal(true);
                        }}
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedAchievement(achievement);
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
      )}

      {/* Modals */}
      <CreateAchievementModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddAchievement}
        categories={awardType}
      />

      <EditAchievementModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedAchievement(null);
        }}
        onSave={handleEditAchievement}
        achievement={selectedAchievement}
        categories={awardType}
      />

      <ViewAchievementModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedAchievement(null);
        }}
        achievement={selectedAchievement}
        getCategoryColor={getCategoryColor}
        getCategoryIcon={getCategoryIcon}
      />

      <DeleteAchievementModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedAchievement(null);
        }}
        onConfirm={handleDelete}
        achievement={selectedAchievement}
      />
    </div>
  );
}

export default ManageAchievement;