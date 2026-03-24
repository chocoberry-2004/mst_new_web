import React, { useState } from 'react';

function ManageFaculty() {
  // Mock faculty departments data
  const [faculties, setFaculties] = useState([
    {
      id: 1,
      name: 'Computer Science',
      code: 'CS',
      head: 'Dr. Sarah Johnson',
      headEmail: 'sarah.johnson@university.edu',
      established: '2010',
      lecturers: 24,
      students: 450,
      courses: 15,
      status: 'active',
      description: 'Department focused on computing, programming, and software development'
    },
    {
      id: 2,
      name: 'Engineering',
      code: 'ENG',
      head: 'Prof. Michael Chen',
      headEmail: 'michael.chen@university.edu',
      established: '2008',
      lecturers: 32,
      students: 580,
      courses: 20,
      status: 'active',
      description: 'Mechanical, Electrical, and Civil Engineering programs'
    },
    {
      id: 3,
      name: 'Mathematics',
      code: 'MATH',
      head: 'Dr. Emily Williams',
      headEmail: 'emily.williams@university.edu',
      established: '2012',
      lecturers: 18,
      students: 320,
      courses: 12,
      status: 'active',
      description: 'Pure and Applied Mathematics'
    },
    {
      id: 4,
      name: 'Physics',
      code: 'PHY',
      head: 'Prof. David Brown',
      headEmail: 'david.brown@university.edu',
      established: '2009',
      lecturers: 15,
      students: 280,
      courses: 10,
      status: 'inactive',
      description: 'Quantum Physics, Astrophysics, and Nuclear Physics'
    },
    {
      id: 5,
      name: 'Chemistry',
      code: 'CHEM',
      head: 'Dr. Lisa Anderson',
      headEmail: 'lisa.anderson@university.edu',
      established: '2011',
      lecturers: 20,
      students: 350,
      courses: 14,
      status: 'active',
      description: 'Organic, Inorganic, and Physical Chemistry'
    },
    {
      id: 6,
      name: 'Biology',
      code: 'BIO',
      head: 'Dr. Robert Wilson',
      headEmail: 'robert.wilson@university.edu',
      established: '2013',
      lecturers: 22,
      students: 400,
      courses: 16,
      status: 'active',
      description: 'Molecular Biology, Genetics, and Ecology'
    }
  ]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Form state for new faculty
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    code: '',
    head: '',
    headEmail: '',
    established: '',
    description: '',
    status: 'active'
  });

  // Filter faculties based on search and filters
  const filteredFaculties = faculties.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.head.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || faculty.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalFaculties = faculties.length;
  const activeFaculties = faculties.filter(f => f.status === 'active').length;
  const totalLecturers = faculties.reduce((sum, f) => sum + f.lecturers, 0);
  const totalStudents = faculties.reduce((sum, f) => sum + f.students, 0);

  // Handle delete faculty
  const handleDelete = (id) => {
    setFaculties(faculties.filter(faculty => faculty.id !== id));
    setShowDeleteModal(false);
  };

  // Handle add faculty
  const handleAddFaculty = () => {
    const newId = faculties.length + 1;
    setFaculties([...faculties, { 
      ...newFaculty, 
      id: newId, 
      lecturers: 0, 
      students: 0, 
      courses: 0 
    }]);
    setShowAddModal(false);
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

  // Handle edit faculty
  const handleEditFaculty = () => {
    setFaculties(faculties.map(faculty => 
      faculty.id === selectedFaculty.id ? selectedFaculty : faculty
    ));
    setShowEditModal(false);
    setSelectedFaculty(null);
  };

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
            Add Department
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Departments</p>
              <p className="text-2xl font-bold text-gray-900">{totalFaculties}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <i className="fas fa-building text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Departments</p>
              <p className="text-2xl font-bold text-green-600">{activeFaculties}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Lecturers</p>
              <p className="text-2xl font-bold text-gray-900">{totalLecturers}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <i className="fas fa-chalkboard-teacher text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <i className="fas fa-user-graduate text-orange-600 text-xl"></i>
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

      {/* Faculties Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculties.map(faculty => (
            <div key={faculty.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{faculty.name}</h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {faculty.code}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Est. {faculty.established}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    faculty.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {faculty.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{faculty.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <i className="fas fa-user-tie w-5 text-gray-400"></i>
                    <span className="text-gray-900 font-medium">{faculty.head}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="fas fa-envelope w-5 text-gray-400"></i>
                    <span>{faculty.headEmail}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">{faculty.lecturers}</p>
                    <p className="text-xs text-gray-500">Lecturers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">{faculty.students}</p>
                    <p className="text-xs text-gray-500">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">{faculty.courses}</p>
                    <p className="text-xs text-gray-500">Courses</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  <button 
                    onClick={() => {
                      setSelectedFaculty(faculty);
                      setShowViewModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedFaculty(faculty);
                      setShowEditModal(true);
                    }}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedFaculty(faculty);
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
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head of Dept</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecturers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFaculties.map(faculty => (
                <tr key={faculty.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{faculty.name}</div>
                      <div className="text-sm text-gray-500">{faculty.code}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{faculty.head}</div>
                      <div className="text-sm text-gray-500">{faculty.headEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{faculty.established}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{faculty.lecturers}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{faculty.students}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{faculty.courses}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      faculty.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {faculty.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedFaculty(faculty);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedFaculty(faculty);
                          setShowEditModal(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedFaculty(faculty);
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

      {/* Add Faculty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Department</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newFaculty.code}
                  onChange={(e) => setNewFaculty({...newFaculty, code: e.target.value})}
                  placeholder="e.g., CS, ENG"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Head of Department</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newFaculty.head}
                  onChange={(e) => setNewFaculty({...newFaculty, head: e.target.value})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Head Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newFaculty.headEmail}
                  onChange={(e) => setNewFaculty({...newFaculty, headEmail: e.target.value})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newFaculty.established}
                  onChange={(e) => setNewFaculty({...newFaculty, established: e.target.value})}
                  placeholder="e.g., 2010"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newFaculty.status}
                  onChange={(e) => setNewFaculty({...newFaculty, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newFaculty.description}
                  onChange={(e) => setNewFaculty({...newFaculty, description: e.target.value})}
                ></textarea>
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
                onClick={handleAddFaculty}
                className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234]"
              >
                Add Department
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Faculty Modal */}
      {showEditModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Department</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedFaculty.name}
                  onChange={(e) => setSelectedFaculty({...selectedFaculty, name: e.target.value})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedFaculty.code}
                  onChange={(e) => setSelectedFaculty({...selectedFaculty, code: e.target.value})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Head of Department</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedFaculty.head}
                  onChange={(e) => setSelectedFaculty({...selectedFaculty, head: e.target.value})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Head Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedFaculty.headEmail}
                  onChange={(e) => setSelectedFaculty({...selectedFaculty, headEmail: e.target.value})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedFaculty.established}
                  onChange={(e) => setSelectedFaculty({...selectedFaculty, established: e.target.value})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedFaculty.status}
                  onChange={(e) => setSelectedFaculty({...selectedFaculty, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedFaculty.description}
                  onChange={(e) => setSelectedFaculty({...selectedFaculty, description: e.target.value})}
                ></textarea>
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
                onClick={handleEditFaculty}
                className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Faculty Modal */}
      {showViewModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Department Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedFaculty.name}</h3>
                  <p className="text-sm text-gray-600">Code: {selectedFaculty.code}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  selectedFaculty.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {selectedFaculty.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">Head of Department</p>
                  <p className="font-semibold text-gray-900">{selectedFaculty.head}</p>
                  <p className="text-sm text-gray-600">{selectedFaculty.headEmail}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600">Established</p>
                  <p className="font-semibold text-gray-900">{selectedFaculty.established}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedFaculty.lecturers}</p>
                  <p className="text-sm text-gray-600">Lecturers</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-orange-600">{selectedFaculty.students}</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-yellow-600">{selectedFaculty.courses}</p>
                  <p className="text-sm text-gray-600">Courses</p>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                <p className="text-gray-600">{selectedFaculty.description}</p>
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
      {showDeleteModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Department</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {selectedFaculty.name} department? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedFaculty.id)}
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

export default ManageFaculty;