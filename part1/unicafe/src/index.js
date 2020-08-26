import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <br></br>
      <h1>{props.text}</h1>
      <br></br>
    </div>
  )
}

const Button = (props) => {
  return (
  <button onClick = {props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0){
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <table>
        <tbody>
          <Stats text = {'good '} value = {props.good} />
          <Stats text = {'neutral '} value = {props.neutral} />
          <Stats text = {'bad '} value = {props.bad} />
          <Stats text = {'all '} value = {props.bad + props.good + props.neutral} />
          <Stats text = {'average '} value = {((props.bad * -1) + props.good+(props.neutral * 0)) / (props.bad + props.good + props.neutral)} />
          <Stats text = {'positive '} value = {(props.good / (props.bad + props.neutral+props.good)) * 100} extra = {'%'} />
        </tbody>
      </table>
    )
  }
}

const Stats = (props) => {
  return (
    <tr>
      <th>{props.text}</th>
      <th>{props.value}{props.extra}</th>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={'give feedback'} />
      <Button handleClick = {() => setGood(good + 1)} text = {'good'} />
      <Button handleClick = {() => setNeutral(neutral+ 1)} text = {'neutral'} />
      <Button handleClick = {() => setBad(bad + 1)} text = {'bad'} />
      <Header text={'statistics'} />
      <Statistics good = {good} bad = {bad} neutral = {neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)