import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Total = (props) => {
  let totalExercises = 0;
  props.parts.map(part => totalExercises += part.exercises)
  return(
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props.parts)
  const newParts = props.parts.map(part => <Part part = {part.name} exercise={part.exercises} />)
  return(
    <div>
      {newParts}
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))