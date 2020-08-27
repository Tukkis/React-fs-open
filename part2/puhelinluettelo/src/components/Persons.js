import React from 'react'

const filterFunc = ({ filter, persons }) => {
    const copy = filter.toLowerCase()
    const filtered = persons.map(person => person.name.toLowerCase().includes(copy) ? <p key={person.name}>{person.name}   {person.number}</p> : '')
    return filtered
  }

const Persons = (props) => {
    return (
        <div>{filterFunc(props)}</div>
    )
}

export default Persons