import React, { useState, useEffect } from 'react'
import noteService from './services/people'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber , setNewNumber] = useState('')
  const [ filter , setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initial => {
        setPersons(initial)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    e.target.value.split('').reduce((a,b) => b.match(/[a-z]/g) ? a : a + b, '')
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const addName = (e) => {
      e.preventDefault()
      let newNumtoAdd = newNumber.split('').reduce((a,b) => !b.match(/[a-z]/g) ? a + b : a, '')
      let newNumRF = newNumber.split('').reduce((a,b) => !isNaN(b) ? a + b : a, '')
      let numbersRF = persons.map(person => person.number.split('').reduce((a,b) => !isNaN(b) ? a + b : a, ''))
      let newNameTL = newName.toLowerCase().replace(/\s/g, '')
      let personsTL = persons.map(person => person.name.toLowerCase().replace(/\s/g, ''))
      if (personsTL.indexOf(newNameTL) > -1 || numbersRF.indexOf(newNumRF) > -1) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const nameToAdd = {
            name : newName,
            number : newNumtoAdd
          }
          const personId = personsTL.indexOf(newNameTL) + 1
          noteService
          .update(personId, nameToAdd)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personId ? person : returnedPerson))
            setErrorMessage(
              `Added ${newName}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Note '${newName}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })  
        }
      } else {const nameToAdd = {
          name : newName,
          number : newNumtoAdd
          }
          noteService
          .create(nameToAdd)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setErrorMessage(
              `Added ${newName}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Information of${newName} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)){
      noteService
        .remove(id)
      
      noteService
      .getAll()
      .then(initial => {
        setPersons(initial)
      })
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter text={'filter shown with:'} value={filter} handleClick={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm 
        name={newName} handleNameChange={handleNameChange} 
        number={newNumber} handleNumberChange={handleNumberChange} 
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} deletePerson={deletePerson} />
    </div>
  )

}

export default App