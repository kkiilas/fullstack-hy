import React from 'react'

const Capital = ({ i, capital, handleNonsingularCapitalClick }) =>
  <li>
    {capital} <button
      value={i}
      onClick={handleNonsingularCapitalClick}>
      show weather</button>
  </li>


export default Capital