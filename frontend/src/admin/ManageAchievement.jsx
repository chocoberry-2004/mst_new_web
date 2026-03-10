import React, { useState } from 'react';

function ManageAchievement() {
  // Achievements data from JSON
  const [achievements, setAchievements] = useState([
    {
      id: "1",
      title: "Highest Student Enrollment Award",
      category: "Academic Excellence",
      organization: "Myanmar Higher Education Council",
      country: "Myanmar",
      location: "Yangon",
      date: "2023",
      how: "Achieved through expanded IT programs, scholarships, and modern teaching methods.",
      why: "Recognized for attracting the highest number of IT students among regional colleges.",
      impact: "Increased student intake by 35% compared to previous years.",
      metrics: {
        totalStudents: 3200,
        growthRate: "35%"
      },
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      description: "Ranked first in student enrollment among regional IT colleges."
    },
    {
      id: "2",
      title: "Top Graduate Placement Rate Award",
      category: "Career Development",
      organization: "Asia-Pacific Education Forum",
      country: "Singapore",
      location: "Singapore",
      date: "2022",
      how: "Strong industry collaboration, internship programs, and career guidance services.",
      why: "Recognized for achieving one of the highest graduate employment rates in the region.",
      impact: "Enhanced reputation and stronger partnerships with global IT companies.",
      metrics: {
        placementRate: "92%",
        partnerCompanies: 150
      },
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      description: "More than 90% of graduates successfully placed in jobs or internships."
    },
    {
      id: "3",
      title: "Global Industry Partnership Excellence Award",
      category: "International Collaboration",
      organization: "International IT Education Association (IIEA)",
      country: "United Kingdom",
      location: "London",
      date: "2024",
      how: "Established partnerships with multinational IT firms and global universities.",
      why: "Recognized for building extensive global industry and academic networks.",
      impact: "Expanded student exchange programs and joint research projects.",
      metrics: {
        globalPartners: 1000,
        countriesInvolved: 25
      },
      image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
      description: "Collaborations with over 1000 international companies and institutions."
    },
    {
      id: "4",
      title: "International Certification Exam Success Award",
      category: "Academic Performance",
      organization: "Global Certification Board",
      country: "United States",
      location: "California",
      date: "2023",
      how: "Advanced training programs and certified instructors for international exams.",
      why: "Recognized for exceptional student performance in global IT certifications.",
      impact: "Improved global recognition and graduate competitiveness.",
      metrics: {
        passRate: "88%",
        certifications: ["Cisco", "Microsoft", "AWS", "Oracle"]
      },
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      description: "High success rate in international certification and academic exams."
    },
    {
      id: "5",
      title: "Best IT Curriculum Innovation Award",
      category: "Innovation in Education",
      organization: "ASEAN Education Network",
      country: "Thailand",
      location: "Bangkok",
      date: "2021",
      how: "Introduced AI, Cloud Computing, and Cybersecurity into the core curriculum.",
      why: "Recognized for designing future-ready IT academic programs.",
      impact: "Modernized learning experience and improved student skill readiness.",
      metrics: {
        newCourses: 12,
        studentSatisfaction: "95%"
      },
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      description: "Awarded for developing innovative and industry-aligned IT curricula."
    },
    {
      id: "6",
      title: "Outstanding Research Contribution Award",
      category: "Research Excellence",
      organization: "Asian Research Council",
      country: "Japan",
      location: "Tokyo",
      date: "2024",
      how: "Published high-impact research papers in AI and Software Engineering.",
      why: "Recognized for significant contributions to IT research and innovation.",
      impact: "Strengthened academic reputation and international research collaboration.",
      metrics: {
        researchPapers: 45,
        internationalJournals: 18
      },
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      description: "Honored for outstanding research achievements in information technology."
    }
  ]);

  // Categories for filtering
  const categories = [
    "All Categories",
    "Academic Excellence",
    "Career Development",
    "International Collaboration",
    "Academic Performance",
    "Innovation in Education",
    "Research Excellence"
  ];

  // Countries for filtering
  const countries = [
    "All Countries",
    "Myanmar",
    "Singapore",
    "United Kingdom",
    "United States",
    "Thailand",
    "Japan"
  ];

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterCountry, setFilterCountry] = useState('All Countries');
  const [filterYear, setFilterYear] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Form state for new achievement
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    category: 'Academic Excellence',
    organization: '',
    country: '',
    location: '',
    date: '',
    how: '',
    why: '',
    impact: '',
    metrics: {},
    image: '',
    description: ''
  });

  // Get unique years for filter
  const years = ['all', ...new Set(achievements.map(a => a.date))].sort();

  // Filter achievements based on search and filters
  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'All Categories' || achievement.category === filterCategory;
    const matchesCountry = filterCountry === 'All Countries' || achievement.country === filterCountry;
    const matchesYear = filterYear === 'all' || achievement.date === filterYear;
    
    return matchesSearch && matchesCategory && matchesCountry && matchesYear;
  });

  // Calculate statistics
  const totalAchievements = achievements.length;
  const achievementsByYear = achievements.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + 1;
    return acc;
  }, {});
  
  const achievementsByCategory = achievements.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const countriesWithAchievements = new Set(achievements.map(a => a.country)).size;

  // Handle delete achievement
  const handleDelete = (id) => {
    setAchievements(achievements.filter(achievement => achievement.id !== id));
    setShowDeleteModal(false);
  };

  // Handle add achievement
  const handleAddAchievement = () => {
    const newId = (Math.max(...achievements.map(a => parseInt(a.id))) + 1).toString();
    setAchievements([...achievements, { 
      ...newAchievement, 
      id: newId,
      metrics: newAchievement.metrics || {}
    }]);
    setShowAddModal(false);
    setNewAchievement({
      title: '',
      category: 'Academic Excellence',
      organization: '',
      country: '',
      location: '',
      date: '',
      how: '',
      why: '',
      impact: '',
      metrics: {},
      image: '',
      description: ''
    });
  };

  // Handle edit achievement
  const handleEditAchievement = () => {
    setAchievements(achievements.map(achievement => 
      achievement.id === selectedAchievement.id ? selectedAchievement : achievement
    ));
    setShowEditModal(false);
    setSelectedAchievement(null);
  };

  // Get category color
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

  // Get category icon
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
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className={`fas fa-${viewMode === 'grid' ? 'list' : 'grid'} text-gray-600`}></i>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <i className="fas fa-download text-gray-600 mr-2"></i>
            Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] transition-colors font-medium"
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
              <p className="text-2xl font-bold text-green-600">{achievementsByYear['2024'] || 0}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <i className="fas fa-calendar-check text-green-600 text-xl"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Achievements in 2024</p>
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <i className="fas fa-tag absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white"
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <i className="fas fa-globe absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white"
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
            <div key={achievement.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={achievement.image} 
                  alt={achievement.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=400';
                  }}
                />
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

                {/* Metrics Display */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {Object.entries(achievement.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg px-3 py-2 flex-1 min-w-[80px]">
                      <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {Array.isArray(value) ? value.length : value}
                      </p>
                    </div>
                  ))}
                </div>

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
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedAchievement(achievement);
                        setShowEditModal(true);
                      }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedAchievement(achievement);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
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
                <tr key={achievement.id} className="hover:bg-gray-50">
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
                      {Object.entries(achievement.metrics).slice(0, 2).map(([key, value]) => (
                        <span key={key} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {key}: {Array.isArray(value) ? value.length : value}
                        </span>
                      ))}
                      {Object.keys(achievement.metrics).length > 2 && (
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
                        className="text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedAchievement(achievement);
                          setShowEditModal(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedAchievement(achievement);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800"
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

      {/* Add Achievement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Achievement</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newAchievement.category}
                  onChange={(e) => setNewAchievement({...newAchievement, category: e.target.value})}
                >
                  {categories.filter(c => c !== 'All Categories').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newAchievement.organization}
                  onChange={(e) => setNewAchievement({...newAchievement, organization: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newAchievement.country}
                  onChange={(e) => setNewAchievement({...newAchievement, country: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newAchievement.location}
                  onChange={(e) => setNewAchievement({...newAchievement, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newAchievement.date}
                  onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
                  placeholder="YYYY"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">How Achieved</label>
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newAchievement.how}
                  onChange={(e) => setNewAchievement({...newAchievement, how: e.target.value})}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Why Received</label>
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newAchievement.why}
                  onChange={(e) => setNewAchievement({...newAchievement, why: e.target.value})}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newAchievement.impact}
                  onChange={(e) => setNewAchievement({...newAchievement, impact: e.target.value})}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newAchievement.image}
                  onChange={(e) => setNewAchievement({...newAchievement, image: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAchievement}
                className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234]"
              >
                Add Achievement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Achievement Modal */}
      {showEditModal && selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Achievement</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedAchievement.title}
                  onChange={(e) => setSelectedAchievement({...selectedAchievement, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedAchievement.category}
                  onChange={(e) => setSelectedAchievement({...selectedAchievement, category: e.target.value})}
                >
                  {categories.filter(c => c !== 'All Categories').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedAchievement.organization}
                  onChange={(e) => setSelectedAchievement({...selectedAchievement, organization: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedAchievement.country}
                  onChange={(e) => setSelectedAchievement({...selectedAchievement, country: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedAchievement.location}
                  onChange={(e) => setSelectedAchievement({...selectedAchievement, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedAchievement.date}
                  onChange={(e) => setSelectedAchievement({...selectedAchievement, date: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedAchievement.description}
                  onChange={(e) => setSelectedAchievement({...selectedAchievement, description: e.target.value})}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">How Achieved</label>
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedAchievement.how}
                  onChange={(e) => setSelectedAchievement({...selectedAchievement, how: e.target.value})}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Why Received</label>
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedAchievement.why}
                  onChange={(e) => setSelectedAchievement({...selectedAchievement, why: e.target.value})}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedAchievement.impact}
                  onChange={(e) => setSelectedAchievement({...selectedAchievement, impact: e.target.value})}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedAchievement.image}
                  onChange={(e) => setSelectedAchievement({...selectedAchievement, image: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditAchievement}
                className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Achievement Modal */}
      {showViewModal && selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Achievement Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Header Image */}
              <div className="h-64 rounded-lg overflow-hidden">
                <img 
                  src={selectedAchievement.image} 
                  alt={selectedAchievement.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=400';
                  }}
                />
              </div>

              {/* Title and Category */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedAchievement.title}</h3>
                  <p className="text-gray-600 mt-1">{selectedAchievement.organization}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedAchievement.category)}`}>
                  <i className={`fas ${getCategoryIcon(selectedAchievement.category)} mr-1`}></i>
                  {selectedAchievement.category}
                </span>
              </div>

              {/* Location and Date */}
              <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-gray-400"></i>
                  <span className="text-gray-700">{selectedAchievement.location}, {selectedAchievement.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-calendar text-gray-400"></i>
                  <span className="text-gray-700">{selectedAchievement.date}</span>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                <p className="text-gray-600">{selectedAchievement.description}</p>
              </div>

              {/* How, Why, Impact */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-700 mb-2">How Achieved</p>
                  <p className="text-sm text-gray-700">{selectedAchievement.how}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-700 mb-2">Why Received</p>
                  <p className="text-sm text-gray-700">{selectedAchievement.why}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-700 mb-2">Impact</p>
                  <p className="text-sm text-gray-700">{selectedAchievement.impact}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-3">Key Metrics</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedAchievement.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Achievement</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedAchievement.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedAchievement.id)}
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

export default ManageAchievement;