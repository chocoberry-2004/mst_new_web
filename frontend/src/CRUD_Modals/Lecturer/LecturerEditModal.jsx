import React from 'react'

function LecturerEditModal({
    show,
    onClose,
    onSubmit,
    createLoading,
    createErr,
    newLecturer,
    handleEditLecturer,
    selectedLecturer
}) {

    if (!show) return null;

    return (
    <div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Lecturer</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedLecturer.name}
                  onChange={(e) => setSelectedLecturer({...selectedLecturer, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedLecturer.email}
                  onChange={(e) => setSelectedLecturer({...selectedLecturer, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedLecturer.phone}
                  onChange={(e) => setSelectedLecturer({...selectedLecturer, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedLecturer.department}
                  onChange={(e) => setSelectedLecturer({...selectedLecturer, department: e.target.value})}
                >
                  {/* {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))} */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedLecturer.specialization}
                  onChange={(e) => setSelectedLecturer({...selectedLecturer, specialization: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedLecturer.qualifications}
                  onChange={(e) => setSelectedLecturer({...selectedLecturer, qualifications: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedLecturer.status}
                  onChange={(e) => setSelectedLecturer({...selectedLecturer, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
                onClick={handleEditLecturer}
                className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LecturerEditModal