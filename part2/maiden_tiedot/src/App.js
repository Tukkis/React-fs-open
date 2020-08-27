import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = (props) => {
  return (
    <div>
      {props.text} 
      <input
        value={props.value}
        onChange={props.handler}
      />
    </div>
  )
}

/* function weatherAPI(props) {
  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current
    ? access_key = ${api_key}
    & query = ${props.country}
`)
    .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
    })
}, [])
} */

const List = ({ filter, countries, setFilter }) => {
  const filterTL = filter.toLowerCase()
  let filteredCountries = []
  countries === [] ? filteredCountries = [] : filteredCountries = countries.filter(country => country.name
  .toLowerCase().includes(filterTL))
  return filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p> : ( filteredCountries.length === 1 ? filteredCountries.map(country => <div key={country.name}>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>languages</h2>
    {country.languages.map(language => <p key={language.name}>{language.name}</p>)}
    <img src={country.flag} alt="x" width="500" height="400"></img>
    <h2>Weather in {country.capital}</h2>
    </div>
  )
   : <div>{filteredCountries.map(country => <div><p key={country.name}>{country.name}</p><button onClick={() => setFilter(country.name)}>show</button></div>)}</div>
  )
}


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            console.log('promise fulfilled')
            setCountries(response.data)
        })
    }, [])

    const onFilter = (e) => {
      setFilter(e.target.value)
    }

    return (
      <div>
        <Filter text={'find countries'} value={filter} handler={onFilter} />
        <List countries={countries} filter={filter} setFilter={setFilter} />
      </div>
    )
}

export default App