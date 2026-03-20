import React from 'react'
import logo from '../../assets/images/mst_logo1.png';


function LecturerCreateModal({
    show,
    onClose,
    onSubmit,
    createLoading,
    createErr,
    newLecturer,
    handleAddLecturer
}) {

  if (!show) return null;

  return (
    <div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto">
            
            {/* header section */}
            <div className="flex justify-between items-center mb-4 sticky top-0 z-50 bg-white px-6 pt-6 pb-4 border-b border-gray-300">
                {/* Left Section */}
                <div className="flex gap-3 items-center">
                    <img
                        src={logo}
                        alt="MST Logo"
                        className="w-14 h-14 rounded-full border-2 border-[var(--accent-yellow)] object-cover"
                    />
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">M.S.T</h1>
                        <p className="text-sm text-gray-500">Add New Lecturer</p>
                    </div>
                </div>
                <button 
                    onClick={onClose} 
                    className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center hover:rotate-45 transition-all duration-300 ease-in-out"
                    >
                    <i className="fas fa-times text-md leading-none"></i>
                </button>
            </div>

            <form action="" className='p-6'>
                <div className="grid grid-cols-2 gap-4 ">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                    value={newLecturer.name}
                    onChange={(e) => setNewLecturer({...newLecturer, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                    value={newLecturer.email}
                    onChange={(e) => setNewLecturer({...newLecturer, email: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                    value={newLecturer.phone}
                    onChange={(e) => setNewLecturer({...newLecturer, phone: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                    value={newLecturer.department}
                    onChange={(e) => setNewLecturer({...newLecturer, department: e.target.value})}
                    >
                    <option value="">Select Department</option>
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
                    value={newLecturer.specialization}
                    onChange={(e) => setNewLecturer({...newLecturer, specialization: e.target.value})}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                    <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                    value={newLecturer.qualifications}
                    onChange={(e) => setNewLecturer({...newLecturer, qualifications: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                    value={newLecturer.status}
                    onChange={(e) => setNewLecturer({...newLecturer, status: e.target.value})}
                    >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    </select>
                </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAddLecturer}
                    className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] cursor-pointer"
                >
                    Add Lecturer
                </button>
                </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default LecturerCreateModal