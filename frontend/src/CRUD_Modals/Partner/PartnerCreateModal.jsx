import React, { useState } from 'react';
import logo from '../../assets/images/mst_logo1.png';

function PartnerCreateModal({ showAddModal, setShowAddModal, newPartner, setNewPartner, handleAddPartner }) {
  if (!showAddModal) return null;

  return (
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
              <p className="text-sm text-gray-500">Add New Partner</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddModal(false)} 
            className="text-gray-500 cursor-pointer w-10 h-10 bg-gray-200 border border-gray-300 rounded-full flex justify-center items-center hover:rotate-45 transition-all duration-300 ease-in-out"
          >
            <i className="fas fa-times text-md"></i>
          </button>
        </div>


        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddPartner();
          }}
          encType="multipart/form-data"
          className='p-6'
        >

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name *</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
              value={newPartner.name}
              onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
              placeholder="e.g., Microsoft"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
            <input
              type="file"
              accept='image/*'
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
              onChange={(e) => setNewPartner({...newPartner, logo: e.target.files[0]})}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
              value={newPartner.url}
              onChange={(e) => setNewPartner({...newPartner, url: e.target.value})}
              placeholder="https://www.example.com"
            />
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#FFC53A] focus:ring-[#FFC53A]"
                checked={newPartner.featured}
                onChange={(e) => setNewPartner({...newPartner, featured: e.target.checked})}
              />
              Featured Partner
            </label>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
              value={newPartner.description}
              onChange={(e) => setNewPartner({...newPartner, description: e.target.value})}
              placeholder="Describe the partnership and expertise..."
            ></textarea>
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
            type="submit"
            disabled={!newPartner.name}
            className="cursor-pointer px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Partner
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default PartnerCreateModal;