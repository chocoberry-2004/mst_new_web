// src/components/CRUD_Modals/User/UserDeleteModal.jsx
import React from 'react';

function UserDeleteModal({ 
  show, 
  onClose, 
  onSubmit, 
  deleteLoading, 
  deleteErr,
  selectedUser 
}) {
  if (!show) return null;

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'lecturer': return 'bg-orange-100 text-orange-700';
      case 'student': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <i className="fas fa-exclamation-triangle text-2xl text-red-600"></i>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Delete User
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
          </div>

          {/* Error Message */}
          {deleteErr && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <i className="fas fa-exclamation-circle"></i>
                {deleteErr}
              </p>
            </div>
          )}

          {/* User Info Card */}
          {selectedUser && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFC53A] to-[#e6b234] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedUser.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {selectedUser.username}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {selectedUser.email}
                  </p>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full capitalize ${getRoleColor(selectedUser.role)}`}>
                    {selectedUser.role}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Warning Message */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700 flex items-start gap-2">
              <i className="fas fa-info-circle mt-0.5"></i>
              <span>
                Deleting this user will remove all associated data and cannot be recovered.
                Please make sure you want to proceed.
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={deleteLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={deleteLoading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {deleteLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <i className="fas fa-trash"></i>
                  Delete User
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDeleteModal;