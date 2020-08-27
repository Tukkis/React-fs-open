import React from 'react'
import Filter from './Filter'

const PersonForm = (props) => {
    return (
      <form>
        <Filter text={'name:'} value={props.name} handleClick={props.handleNameChange} />
        <Filter text={'number:'} value={props.number} handleClick={props.handleNumberChange} />
        <div>
          <button type="submit" onClick={props.addName}>add</button>
        </div>
      </form>
    )
}

export default PersonForm