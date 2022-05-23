import React from 'react'

const PersonForm = ({
  addPerson,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber
}) => (
  <div>
    <form onSubmit={addPerson}>
      <div>
        Name:
        <input
          value={newName}
          onChange={handleNameChange}
          className="bg-dark border-warning text-light ms-1 mb-1"
        />
      </div>
      <div>
        Number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
          className="bg-dark border-warning text-light ms-1"
        />
      </div>
      <div>
        <button className="btn btn-warning" type="submit">
          Add
        </button>
      </div>
    </form>
  </div>
)

export default PersonForm
