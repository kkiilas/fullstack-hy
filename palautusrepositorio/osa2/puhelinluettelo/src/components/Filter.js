import React from 'react'

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    Filter shown with
    <input
      value={filter}
      onChange={handleFilterChange}
      className="bg-dark border-warning text-light ms-1"
    />
  </div>
)

export default Filter
