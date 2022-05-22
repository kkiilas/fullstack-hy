import React from 'react'

const Country = ({ name, handleShowClick }) => (
  <div>
    {name}
    <button
      value={name}
      onClick={handleShowClick}
      className="btn btn-success ms-1 mb-1"
    >
      Show
    </button>
  </div>
)

export default Country
