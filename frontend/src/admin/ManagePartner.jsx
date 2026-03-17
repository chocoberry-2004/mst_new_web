import React, { useState } from 'react';
import { usePartner } from '../providers/PartnerProvider';

import { createPartner } from '../CRUD_handlers/Partner/createPartner';

function ManagePartner() {
  const { partners, partnerLoading, partnerError } = usePartner();


  // Safely access data with fallbacks
  const partnersData = partners?.partnersSection?.partners || [];
  const partnerTiers = partners?.partnersSection?.partnerTiers || [
    { level: 'platinum', label: 'Platinum' },
    { level: 'gold', label: 'Gold' },
    { level: 'silver', label: 'Silver' },
    { level: 'bronze', label: 'Bronze' }
  ];
  const benefits = partners?.partnersSection?.benefits || [];
  const stats = partners?.partnersSection?.stats || {
    totalPartners: partnersData.length,
    countries: 0
  };

  // State for managing partners data locally
  const [localPartners, setLocalPartners] = useState(partnersData);

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
    tier: 'bronze',
    description: '',
    categories: [],
    featured: false
  });

  // Available categories for selection
  const availableCategories = [
    "Cloud", "Productivity", "Enterprise Software", "Cloud Computing", 
    "Infrastructure", "AI/ML", "Networking", "Cybersecurity", "Communications",
    "CRM", "Sales", "Customer Service", "Virtualization", "Data Center",
    "Hardware", "Storage", "Data Analytics", "Digital Marketing", "Creative",
    "Document Cloud", "ITSM", "Workflow", "Enterprise", "Database", "ERP",
    "Cloud Applications"
  ];

  // Filter partners based on search and filters
  const filteredPartners = localPartners.filter(partner => {
    const matchesSearch = searchTerm === '' || 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (partner.description && partner.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (partner.categories && partner.categories.some(cat => 
        cat && cat.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    
    const matchesTier = filterTier === 'all' || partner.tier === filterTier;
    const matchesFeatured = filterFeatured === 'all' || 
      (filterFeatured === 'featured' && partner.featured) ||
      (filterFeatured === 'non-featured' && !partner.featured);
    
    return matchesSearch && matchesTier && matchesFeatured;
  });

  // Calculate statistics
  const totalPartners = localPartners.length;
  const platinumPartners = localPartners.filter(p => p.tier === "platinum").length;
  const goldPartners = localPartners.filter(p => p.tier === "gold").length;
  const featuredPartners = localPartners.filter(p => p.featured).length;

  // Generate a unique ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Handle delete partner
  const handleDelete = (id) => {
    setLocalPartners(localPartners.filter(partner => partner.id !== id));
    setShowDeleteModal(false);
    setSelectedPartner(null);
  };

  // Handle add partner
  const handleAddPartner = async () => {

    const result = await createPartner(newPartner);

    if (result.success) {
      setLocalPartners([...localPartners, result.partner]);
      setShowAddModal(false);
    } else {
      alert("Failed to create partner");
    }
  };

  // Handle edit partner
  const handleEditPartner = () => {
    setLocalPartners(localPartners.map(partner => 
      partner.id === selectedPartner.id ? selectedPartner : partner
    ));
    setShowEditModal(false);
    setSelectedPartner(null);
  };

  // Handle image error with fallback
  const handleImageError = (e, partnerName) => {
    e.target.onerror = null;
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partnerName)}&background=FFC53A&color=000&size=128`;
  };

  // Get tier color
  const getTierColor = (tier) => {
    switch(tier) {
      case 'platinum': return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900';
      case 'gold': return 'bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900';
      case 'silver': return 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700';
      case 'bronze': return 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get tier badge color
  const getTierBadgeColor = (tier) => {
    switch(tier) {
      case 'platinum': return 'bg-gray-200 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-600';
      case 'bronze': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (partnerLoading) return <div>Loading...</div>;
  if (partnerError) return <div>Error loading partners</div>;

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
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <i className="fas fa-download text-gray-600 mr-2"></i>
            Export
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
          <p className="text-xs text-gray-500 mt-2">Across {stats.countries || 0} countries</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Platinum Partners</p>
              <p className="text-2xl font-bold text-gray-900">{platinumPartners}</p>
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
              <p className="text-2xl font-bold text-yellow-600">{goldPartners}</p>
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

      {/* Benefits Cards */}
      {benefits.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#FFC53A] bg-opacity-10 p-2 rounded-lg">
                  <i className={`fas fa-${
                    benefit.icon === 'certification' ? 'certificate' : 
                    benefit.icon === 'integration' ? 'cogs' : 
                    benefit.icon === 'support' ? 'headset' : 
                    'rocket'
                  } text-[#FFC53A]`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-xs text-gray-500">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
              >
                <option value="all">All Tiers</option>
                {partnerTiers.map(tier => (
                  <option key={tier.level} value={tier.level}>{tier.label}</option>
                ))}
              </select>
              <i className="fas fa-layer-group absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
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
      {filteredPartners.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
          <i className="fas fa-search text-4xl text-gray-400 mb-3"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No partners found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Partners Grid/List View */}
      {filteredPartners.length > 0 && (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map(partner => (
              <div key={partner._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-2 ${getTierColor(partner.tier)}`}></div>
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
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTierBadgeColor(partner.tier)}`}>
                        {partner.tier}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">{partner.name}</h3>
                    {partner.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{partner.description}</p>
                    )}
                  </div>

                  {partner.categories && partner.categories.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {partner.categories.slice(0, 3).map((category, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {category}
                          </span>
                        ))}
                        {partner.categories.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{partner.categories.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    {partner.url && (
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
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedPartner(partner);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedPartner(partner);
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
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPartners.map(partner => (
                  <tr key={partner.id} className="hover:bg-gray-50">
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
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTierBadgeColor(partner.tier)}`}>
                        {partner.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {partner.categories && partner.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {partner.categories.slice(0, 2).map((cat, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {cat}
                            </span>
                          ))}
                          {partner.categories.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{partner.categories.length - 2}
                            </span>
                          )}
                        </div>
                      )}
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
                      {partner.url && (
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
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedPartner(partner);
                            setShowEditModal(true);
                          }}
                          className="text-green-600 hover:text-green-800"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedPartner(partner);
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
        )
      )}

      {/* Add Partner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Partner</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tier *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={newPartner.tier}
                  onChange={(e) => setNewPartner({...newPartner, tier: e.target.value})}
                >
                  {partnerTiers.map(tier => (
                    <option key={tier.level} value={tier.level}>{tier.label}</option>
                  ))}
                </select>
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
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                <select
                  multiple
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] h-32"
                  value={newPartner.categories}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setNewPartner({...newPartner, categories: selected});
                  }}
                >
                  {availableCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple categories</p>
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
                onClick={handleAddPartner}
                disabled={!newPartner.name}
                className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Partner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Partner Modal */}
      {showEditModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Partner</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedPartner.name}
                  onChange={(e) => setSelectedPartner({...selectedPartner, name: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedPartner.logo || ''}
                  onChange={(e) => setSelectedPartner({...selectedPartner, logo: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedPartner.url || ''}
                  onChange={(e) => setSelectedPartner({...selectedPartner, url: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tier *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedPartner.tier}
                  onChange={(e) => setSelectedPartner({...selectedPartner, tier: e.target.value})}
                >
                  {partnerTiers.map(tier => (
                    <option key={tier.level} value={tier.level}>{tier.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#FFC53A] focus:ring-[#FFC53A]"
                    checked={selectedPartner.featured || false}
                    onChange={(e) => setSelectedPartner({...selectedPartner, featured: e.target.checked})}
                  />
                  Featured Partner
                </label>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A]"
                  value={selectedPartner.description || ''}
                  onChange={(e) => setSelectedPartner({...selectedPartner, description: e.target.value})}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                <select
                  multiple
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC53A] h-32"
                  value={selectedPartner.categories || []}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setSelectedPartner({...selectedPartner, categories: selected});
                  }}
                >
                  {availableCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple categories</p>
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
                onClick={handleEditPartner}
                disabled={!selectedPartner.name}
                className="px-4 py-2 bg-[#FFC53A] text-gray-900 rounded-lg hover:bg-[#e6b234] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Partner Modal */}
      {showViewModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Partner Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center border border-gray-200">
                  <img 
                    src={selectedPartner.logo} 
                    alt={selectedPartner.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => handleImageError(e, selectedPartner.name)}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedPartner.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTierBadgeColor(selectedPartner.tier)}`}>
                      {selectedPartner.tier}
                    </span>
                    {selectedPartner.featured && (
                      <span className="px-2 py-1 bg-[#FFC53A] bg-opacity-20 text-[#B8860B] text-xs font-medium rounded-full">
                        <i className="fas fa-star mr-1 text-xs"></i>
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {selectedPartner.description && (
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                  <p className="text-gray-600">{selectedPartner.description}</p>
                </div>
              )}

              {selectedPartner.categories && selectedPartner.categories.length > 0 && (
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPartner.categories.map((category, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedPartner.url && (
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Website</p>
                  <a 
                    href={selectedPartner.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    {selectedPartner.url}
                    <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                </div>
              )}
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
      {showDeleteModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Partner</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedPartner.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedPartner.id)}
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

export default ManagePartner;