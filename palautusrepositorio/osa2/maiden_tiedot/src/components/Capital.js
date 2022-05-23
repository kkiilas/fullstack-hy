import React from 'react'

const Capital = ({ i, capital, handleNonsingularCapitalClick }) => (
  <li>
    {capital}
    <button
      value={i}
      onClick={handleNonsingularCapitalClick}
      className="btn btn-success ms-1 mb-1"
    >
      show weather
    </button>
  </li>
)

export default Capital
