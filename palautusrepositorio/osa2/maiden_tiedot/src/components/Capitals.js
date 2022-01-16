import React from 'react'
import Capital from './Capital'

const Capitals = ({ capitals, handleNonsingularCapitalClick }) =>
  capitals === undefined
    ? <></>
    : capitals.length === 1
      ? <div>capital {capitals[0]}</div>
      : <div>
        <h3>Capitals</h3>
        <ul>
          {capitals.map((capital, i) => <Capital
            key={i}
            i={i}
            capital={capital}
            handleNonsingularCapitalClick={handleNonsingularCapitalClick} />)}
        </ul>
      </div>

export default Capitals