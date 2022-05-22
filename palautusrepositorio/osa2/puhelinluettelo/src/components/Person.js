import React from 'react'

const Person = ({ person, handleDeleteClick }) => {
  return (
    <div>
      {person.name} {person.number}
      <button
        value={person.id}
        onClick={handleDeleteClick}
        className="btn btn-outline-primary ms-1 mb-1"
      >
        Delete
      </button>
    </div>
  )
}

export default Person
