import React, { useState, useEffect } from 'react';
import { usePartner } from '../providers/PartnerProvider';

import SearchNotFound from '../components/SearchNotFound';

// CRUD modals
import PartnerCreateModal from '../CRUD_Modals/Partner/PartnerCreateModal';
import PartnerEditModal from '../CRUD_Modals/Partner/PartnerEditModal';
import PartnerDeleteModal from '../CRUD_Modals/Partner/PartnerDeleteModal';
import PartnerViewModal from '../CRUD_Modals/Partner/PartnerViewModal';


// CRUD handlers
import { createPartner } from '../CRUD_handlers/Partner/createPartner';
import { updatePartner } from '../CRUD_handlers/Partner/updatePartner';
import { deletePartner } from '../CRUD_handlers/Partner/deletePartner';

function ManagePartner() {
  const { partners, partnerLoading, partnerError } = usePartner();

  // console.log("i am partner", partners);

  // Fix: Extract partners data correctly based on your API response
  const partnersData = Array.isArray(partners) ? partners : (partners?.partners || []);
  

  // State for managing partners data locally
  const [localPartners, setLocalPartners] = useState(partnersData);

  // Sync localPartners when partners data loads
  useEffect(() => {
    const updatedPartnersData = Array.isArray(partners) ? partners : (partners?.partners || []);
    setLocalPartners(updatedPartnersData);
  }, [partners]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [filterFeatured, setFilterFeatured] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  // Form state for new partner
  const [newPartner, setNewPartner] = useState({
    name: '',
    logo: '',
    url: '',
    description: '',
    featured: false
  });

 
  // Filter partners based on search and filters
  const filteredPartners = localPartners.filter(partner => {
    const matchesSearch = searchTerm === '' || 
      partner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (partner.description && partner.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (partner.categories && partner.categories.some(cat => 
        cat && cat.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    
    const matchesFeatured = filterFeatured === 'all' || 
      (filterFeatured === 'featured' && partner.featured) ||
      (filterFeatured === 'non-featured' && !partner.featured);
    
    return matchesSearch && matchesFeatured;
  });

  // Calculate statistics
  const totalPartners = localPartners.length;
 
  const featuredPartners = localPartners.filter(p => p.featured).length;

  // Handle add partner
  const handleAddPartner = async () => {
    try {
      console.log("Creating partner:", newPartner);
      const result = await createPartner(newPartner);
      console.log("Create result:", result);

      if (result.success) {
        const addedPartner = result.partner;
        setLocalPartners([...localPartners, addedPartner]);
        setShowAddModal(false);
        // Reset form
        setNewPartner({
          name: '',
          logo: '',
          url: '',
          description: '',
          featured: false
        });
      } else {
        alert("Failed to create partner: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error in handleAddPartner:", error);
      alert("Error creating partner: " + error.message);
    }
  };

  // Handle edit partner
  const handleEditPartner = async () => {
    try {
      const result = await updatePartner(selectedPartner._id, selectedPartner);
      console.log("Update result:", result);

      if (result.success) {
        setLocalPartners(localPartners.map(partner => 
          partner._id === selectedPartner._id ? result.partner : partner
        ));
        setShowEditModal(false);
        setSelectedPartner(null);
      } else {
        alert("Failed to update partner: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error in handleEditPartner:", error);
      alert("Error updating partner: " + error.message);
    }
  };

  // Handle delete partner
  const handleDelete = async (id) => {
    try {
      const result = await deletePartner(id);
      console.log("Delete result:", result);

      if (result.success) {
        setLocalPartners(localPartners.filter(partner => partner._id !== id));
        setShowDeleteModal(false);
        setSelectedPartner(null);
      } else {
        alert("Failed to delete partner: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
      alert("Error deleting partner: " + error.message);
    }
  };

  // Handle image error with fallback
  const handleImageError = (e, partnerName) => {
    e.target.onerror = null;
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partnerName)}&background=FFC53A&color=000&size=128`;
  };

 
  if (partnerLoading) return <div>Loading...</div>;
  if (partnerError) return <div>Error loading partners: {partnerError.message || "Unknown error"}</div>;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Technology Partners</h1>
          <p className="text-gray-600 mt-1">Manage your strategic technology partnerships</p>
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
            Add Partner
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Partners</p>
              <p className="text-2xl font-bold text-gray-900">{totalPartners}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <i className="fas fa-handshake text-blue-600 text-xl"></i>
            </div>
          </div>
          {/* <p className="text-xs text-gray-500 mt-2">Across {stats.countries || 0} countries</p> */}
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Platinum Partners</p>
              {/* <p className="text-2xl font-bold text-gray-900">{platinumPartners}</p> */}
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <i className="fas fa-crown text-gray-600 text-xl"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Strategic partners</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gold Partners</p>
              {/* <p className="text-2xl font-bold text-yellow-600">{goldPartners}</p> */}
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <i className="fas fa-medal text-yellow-600 text-xl"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Certified partners</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Featured Partners</p>
              <p className="text-2xl font-bold text-[#FFC53A]">{featuredPartners}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <i className="fas fa-star text-[#FFC53A] text-xl"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Premium technology providers</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search partners by name, description, or categories..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
           
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] appearance-none bg-white"
                value={filterFeatured}
                onChange={(e) => setFilterFeatured(e.target.value)}
              >
                <option value="all">All Partners</option>
                <option value="featured">Featured Only</option>
                <option value="non-featured">Non-Featured</option>
              </select>
              <i className="fas fa-star absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {filteredPartners.length === 0 && searchTerm !== '' && (
        <SearchNotFound searchType={"partner"}/>
      )}

      {/* Partners Grid/List View */}
      {filteredPartners.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map(partner => (
              <div key={partner._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {/* <div className={`h-2 ${getTierColor(partner.tier)}`}></div> */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-200">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => handleImageError(e, partner.name)}
                      />
                    </div>
                    <div className="flex gap-1">
                      {partner.featured && (
                        <span className="px-2 py-1 bg-[#FFC53A] bg-opacity-20 text-[#B8860B] text-xs font-medium rounded-full">
                          <i className="fas fa-star mr-1 text-xs"></i>
                          Featured
                        </span>
                      )}
                     
                    </div>
                  </div>

                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">{partner.name}</h3>
                    {partner.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{partner.description}</p>
                    )}
                  </div>

                

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    {partner.url && partner.url !== "undefined" && (
                      <a 
                        href={partner.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <i className="fas fa-external-link-alt text-xs"></i>
                        Website
                      </a>
                    )}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedPartner(partner);
                          setShowViewModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedPartner(partner);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedPartner(partner);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPartners.map(partner => (
                  <tr key={partner._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg p-1 flex items-center justify-center border border-gray-200">
                          <img 
                            src={partner.logo} 
                            alt={partner.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => handleImageError(e, partner.name)}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{partner.name}</div>
                          {partner.description && (
                            <div className="text-sm text-gray-500 line-clamp-1">{partner.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    
                    <td className="px-6 py-4">
                      {partner.featured ? (
                        <span className="text-[#FFC53A]">
                          <i className="fas fa-star"></i>
                        </span>
                      ) : (
                        <span className="text-gray-300">
                          <i className="far fa-star"></i>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {partner.url && partner.url !== "undefined" && (
                        <a href={partner.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedPartner(partner);
                            setShowViewModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedPartner(partner);
                            setShowEditModal(true);
                          }}
                          className="text-green-600 hover:text-green-800 cursor-pointer"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedPartner(partner);
                            setShowDeleteModal(true);
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
        )
      ) : (
        !partnerLoading && <SearchNotFound searchType={"partner"} />
      )}

      {/* Add Partner Modal */}
      <PartnerCreateModal 
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        newPartner={newPartner}
        setNewPartner={setNewPartner}
        handleAddPartner={handleAddPartner}
      />

      {/* Edit Partner Modal */}
      <PartnerEditModal 
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        selectedPartner={selectedPartner}
        setSelectedPartner={setSelectedPartner}
        handleEditPartner={handleEditPartner}
      />

      {/* Delete Confirmation Modal */}
      <PartnerDeleteModal 
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        selectedPartner={selectedPartner}
        handleDelete={handleDelete}
      />

      {/* View Partner Modal */}
      <PartnerViewModal
        showViewModal={showViewModal}
        setShowViewModal={setShowViewModal}
        selectedPartner={selectedPartner}
      />


    </div>
  );
}

export default ManagePartner;