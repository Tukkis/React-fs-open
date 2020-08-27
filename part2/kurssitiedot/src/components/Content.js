import React from 'react'
import Part from './Part'

const Content = (props) => {
    console.log(props.parts)
    const newParts = props.parts.map(part => <Part key={part.id} part = {part.name} exercise={part.exercises} />)
    return(
      <div>
        {newParts}
      </div>
    )
}

export default Content