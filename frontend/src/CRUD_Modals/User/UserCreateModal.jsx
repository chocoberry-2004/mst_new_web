import React from 'react'

function UserCreateModal({
  show,
  onClose,
  onSubmit,
  createLoading,
  createErr,
  newLecturer,
  setNewLecturer,
  handleImage,
  profilePreview,
  removeImage,
  profileImage,
}) {
  if (!show) return null

  const handleArrayField = (field, value) => {
    // Splits comma-separated input into a clean array
    setNewLecturer(prev => ({
      ...prev,
      [field]: value.split(',').map(v => v.trim()).filter(Boolean)
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            <i className="fas fa-user-plus mr-2 text-[#FFC53A]"></i>
            Add New User
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3">
            {profilePreview ? (
              <div className="relative">
                <img
                  src={profilePreview}
                  alt="Profile Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#FFC53A]"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer hover:bg-red-600 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-[#FFC53A] to-[#e6b234] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {newLecturer?.name
                  ? newLecturer.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                  : <i className="fas fa-user"></i>
                }
              </div>
            )}
            <label className="cursor-pointer text-sm text-[#e6b234] hover:underline font-medium">
              <i className="fas fa-camera mr-1"></i>
              {profileImage ? 'Change Photo' : 'Upload Photo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="e.g. Dr. Jane Smith"
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent text-sm"
                value={newLecturer?.name || ''}
                onChange={e => setNewLecturer(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="email"
                placeholder="e.g. jane@university.edu"
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent text-sm"
                value={newLecturer?.email || ''}
                onChange={e => setNewLecturer(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <div className="relative">
              <i className="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="e.g. Yangon"
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent text-sm"
                value={newLecturer?.city || ''}
                onChange={e => setNewLecturer(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
          </div>

          {/* Position — comma-separated */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
              <span className="text-xs text-gray-400 ml-1">(comma-separated)</span>
            </label>
            <div className="relative">
              <i className="fas fa-user-tie absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="e.g. Professor, Head of Department"
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent text-sm"
                value={newLecturer?.position?.join(', ') || ''}
                onChange={e => handleArrayField('position', e.target.value)}
              />
            </div>
          </div>

          {/* Degree — comma-separated */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree
              <span className="text-xs text-gray-400 ml-1">(comma-separated)</span>
            </label>
            <div className="relative">
              <i className="fas fa-graduation-cap absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="e.g. PhD, MSc"
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent text-sm"
                value={newLecturer?.degree?.join(', ') || ''}
                onChange={e => handleArrayField('degree', e.target.value)}
              />
            </div>
          </div>

          {/* Expertise — comma-separated */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expertise
              <span className="text-xs text-gray-400 ml-1">(comma-separated)</span>
            </label>
            <div className="relative">
              <i className="fas fa-chalkboard-teacher absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="e.g. Machine Learning, Data Science"
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent text-sm"
                value={newLecturer?.expertise?.join(', ') || ''}
                onChange={e => handleArrayField('expertise', e.target.value)}
              />
            </div>
          </div>

          {/* Error message */}
          {createErr && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              <i className="fas fa-exclamation-circle"></i>
              <span>{createErr}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            disabled={createLoading}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={createLoading}
            className="px-5 py-2 text-sm bg-[#FFC53A] text-gray-900 font-medium rounded-lg hover:bg-[#e6b234] transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-2"
          >
            {createLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Creating...
              </>
            ) : (
              <>
                <i className="fas fa-plus"></i>
                Create User
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}

export default UserCreateModal