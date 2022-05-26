import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      const person = persons.find((person) => person.name === newName)
      const id = person.id
      if (
        window.confirm(
          `${person.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            )
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${person.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 2500)
          })
          .catch((error) => {
            error.response.status === 500
              ? setMessage(
                  `Information of ${person.name} has already been removed from server`
                )
              : setMessage(error.response.data.error)
            setIsError(true)
            setTimeout(() => {
              setMessage(null)
              setIsError(false)
            }, 2500)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2500)
        })
        .catch((error) => {
          setMessage(error.response.data.error)
          setIsError(true)
          setTimeout(() => {
            setMessage(null)
            setIsError(false)
          }, 4000)
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) =>
    setFilter(event.target.value.toLowerCase())

  const handleDeleteClick = (event) => {
    const id = event.target.value
    const person = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
        setMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 2500)
      })
    }
  }

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  return (
    <div className="container bg-warning bg-gradient">
      <div className="d-flex bg-dark bg-gradient p-5 min-vh-100">
        <div className="d-grid mw-100">
          <div>
            <h2>Phonebook</h2>
            <Notification message={message} isError={isError} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
          </div>
          <div>
            <h3>Add a new</h3>
            <PersonForm
              addPerson={addPerson}
              handleNameChange={handleNameChange}
              handleNumberChange={handleNumberChange}
              newName={newName}
              newNumber={newNumber}
            />
          </div>
          <div>
            <h3>Numbers</h3>
            <Persons
              persons={persons}
              filter={filter}
              handleDeleteClick={handleDeleteClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
