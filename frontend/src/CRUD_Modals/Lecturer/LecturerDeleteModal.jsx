import React, { useState } from 'react'
import { deleteLecturer } from '../../CRUD_handlers/Lecturer/deleteLecturer';

function LecturerDeleteModal({
    show,
    onClose,
    onSubmit,
    selectedLecturer
}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleDelete = async () => {
      setLoading(true);
      setError('');
  
      try {
        const result = await deleteLecturer(selectedLecturer._id);
  
        if (!result.success) {
          setError(result.message || 'Delete failed');
          setLoading(false);
          return;
        }
  
        // notify parent to update UI
        onConfirm(achievement._id);
  
        setLoading(false);
        onClose();
  
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  

  if (!show) return null;

  return (
    <div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Lecturer</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {selectedLecturer.name}? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LecturerDeleteModal