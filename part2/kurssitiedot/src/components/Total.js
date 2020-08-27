import React from 'react'

const Total = (props) => {
    let totalExercises = props.parts.reduce((total, part) => total + part.exercises, 0)
    return(
      <div>
        <p>Number of exercises {totalExercises}</p>
      </div>
    )
}

export default Total  
