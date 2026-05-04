import React, { useState } from 'react';
import { useUser } from '../providers/UserProvider';

import UserCreateModal from '../CRUD_Modals/User/UserCreateModal';
import UserEditModal from '../CRUD_Modals/User/UserEditModal';
import UserDeleteModal from '../CRUD_Modals/User/UserDeleteModal';

function ManageUser() {
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteErr, setDeleteErr] = useState(null); // Local error state for delete

  const { 
    users, 
    userLoading, 
    userError,
    createUser,
    updateUser,
    deleteUser,
    createLoading,
    updateLoading,
    deleteLoading,
    createError,
    updateError,
    deleteError
  } = useUser();

  // Statistics calculations
  const totaluser = users?.length || 0;
  const Totaladmin = users?.filter(u => u.role === 'admin').length || 0;
  const lecturerCount = users?.filter(u => u.role === 'lecturer').length || 0;
  const studentCount = users?.filter(u => u.role === 'student').length || 0;
  const otherUsers = users?.filter(u => u.role === 'user').length || 0;

  // Filter users based on search
  const filteredUsers = users?.filter(user => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      user.username?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.role?.toLowerCase().includes(search)
    );
  });

  // Handle create user
  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Handle update user
  const handleUpdateUser = async (userData) => {
    try {
      await updateUser({ id: selectedUser._id, userData });
      setShowEditModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    if (!selectedUser?._id) return;
    try {
      setDeleteErr(null);
      await deleteUser(selectedUser._id);
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      setDeleteErr(error.message);
      console.error('Error deleting user:', error);
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC53A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <i className="fas fa-exclamation-triangle text-4xl mb-4"></i>
          <p>Error loading users: {userError.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
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
          <h1 className="text-2xl font-bold text-gray-800">Manage Users Panel</h1>
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
            onClick={() => setShowAddModal(true)}
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
              <i className="fas fa-users text-blue-600 text-xl"></i>
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
              <i className="fas fa-shield-alt text-green-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lecturers</p>
              <p className="text-2xl font-bold text-orange-600">{lecturerCount}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <i className="fas fa-chalkboard-teacher text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Students</p>
              <p className="text-2xl font-bold text-purple-600">{studentCount}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <i className="fas fa-user-graduate text-purple-600 text-xl"></i>
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
              placeholder="Search users by name, email, or role..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Users Display */}
      {filteredUsers?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <i className="fas fa-user-slash text-4xl text-gray-400 mb-4"></i>
          <p className="text-gray-600 text-lg">
            {searchTerm ? 'No users match your search criteria' : 'No users found'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers?.map((user) => (
            <div key={user._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FFC53A] to-[#e6b234] rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {user.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.username}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full capitalize bg-gray-100 text-gray-700">
                    {user.role}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 text-blue-600">
                      <i className="fas fa-user-tag text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Role</p>
                      <p className="text-sm font-medium text-gray-700 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-100 text-green-600">
                      <i className="fas fa-calendar-alt text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Joined</p>
                      <p className="text-sm font-medium text-gray-700">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button 
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditModal(true);
                    }}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteModal(true);
                      setDeleteErr(null);
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers?.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FFC53A] to-[#e6b234] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.username}</div>
                        <div className="text-xs text-gray-500">ID: {user._id?.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full capitalize bg-gray-100 text-gray-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteModal(true);
                          setDeleteErr(null);
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

      {/* Create User Modal */}
      <UserCreateModal
        show={showAddModal}
        onClose={() => {
          setShowAddModal(false);
        }}
        onSubmit={handleCreateUser}
        createLoading={createLoading}
        createErr={createError?.message}
      />

      {/* Edit User Modal */}
      <UserEditModal 
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        onSubmit={handleUpdateUser}
        editLoading={updateLoading}
        editErr={updateError?.message}
        selectedUser={selectedUser}
      />

      {/* Delete User Modal */}
      <UserDeleteModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
          setDeleteErr(null);
        }}
        selectedUser={selectedUser}
        onSubmit={handleDeleteUser}
        deleteLoading={deleteLoading}
        deleteErr={deleteErr || deleteError?.message}
      />
    </div>
  );
}

export default ManageUser;