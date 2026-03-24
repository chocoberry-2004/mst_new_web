import React from 'react'

function SearchNotFound({searchType}) {
  return (
    <div>
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
          <i className="fas fa-search text-4xl text-gray-400 mb-3"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No {searchType} found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
    </div>
  )
}

export default SearchNotFound