import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  const [max, setMax] = useState(0)

  const handleSelect = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    let largest = Math.max(...votes)
    let maxIndex = max
    for(let i = 0; i < copy.length; i++) {
      if(copy[i] > largest) {
        largest = copy[i]
        maxIndex = i
      }
    }
    setMax(maxIndex)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick = {handleSelect}>next anecdote</button>
      <button onClick = {handleVotes}>vote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[max]}</p>
      <p>has {votes[max]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)