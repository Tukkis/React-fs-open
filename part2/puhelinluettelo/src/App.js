import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber , setNewNumber] = useState('')
  const [ filter , setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
      let newNameTL = newName.toLowerCase()
      let personsTL = persons.map(person => person.name.toLowerCase())
      if (personsTL.indexOf(newNameTL) > -1 || numbersRF.indexOf(newNumRF) > -1) {
        alert(`${newName} is already added to phonebook`)
      } else {const nameToAdd = {
        name : newName,
        number : newNumtoAdd
        }
        setPersons(persons.concat(nameToAdd))
        setNewName('')
        setNewNumber('')
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={'filter shown with:'} value={filter} handleClick={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange} addName={addName} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  )

}

export default App