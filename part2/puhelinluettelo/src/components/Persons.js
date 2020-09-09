import React from 'react'

const filterFunc = ({ filter, persons, deletePerson }) => {
    const copy = filter.toLowerCase()
    const filtered = 
    persons.map(person => 
        person.name.toLowerCase().includes(copy) ? 
            <div key={person.id}>
                <p key={person.id} data-key={person.name}>{person.name}   {person.number}</p>
                <button onClick={() => deletePerson(person.id, person.name)}>delete</button> 
            </div>
            : ''
        )
    return filtered
  }

const Persons = (props) => {
    return (
        <div>
            {filterFunc(props)}
        </div>
    )
}

export default Persons