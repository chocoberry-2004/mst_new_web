import React from 'react';

function EventDeleteModal({ show, onClose, onDelete, selectedEvent }) {
  if (!show || !selectedEvent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg text-center">

        <h2>Delete Event</h2>
        <p>Are you sure you want to delete "{selectedEvent.title}"?</p>

        <div className="flex gap-3 justify-center mt-4">
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onDelete(selectedEvent._id)}>
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default EventDeleteModal;