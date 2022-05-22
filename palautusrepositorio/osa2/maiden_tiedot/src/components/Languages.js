import React from 'react'
import Language from './Language'

const Languages = ({ languages }) => (
  <div>
    <ul>
      {languages.map((language, i) => (
        <Language key={i} language={language} />
      ))}
    </ul>
  </div>
)

export default Languages
