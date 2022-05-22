import React from 'react'

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    Find countries
    <input
      value={filter}
      onChange={handleFilterChange}
      className="bg-dark text-light mt-1 ms-2 mb-3 border-success"
    />
  </div>
)

export default Filter
