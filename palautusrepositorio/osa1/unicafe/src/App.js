import React, { useState } from 'react'

const Header = (props) => (
  <div>
    <h1>{props.text}</h1>
  </div>
)

const Button = (props) => (
  <button className={`btn btn-${props.color} me-2`} onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const positive = (props.good / all) * 100

  if (all === 0) {
    return <div>No feedback given</div>
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div className="container bg-light">
      <div className="container bg-secondary">
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
          <div>
            <Header text="give feedback" />
            <Button handleClick={handleGoodClick} text="good" color="success" />
            <Button
              handleClick={handleNeutralClick}
              text="neutral"
              color="warning"
            />
            <Button handleClick={handleBadClick} text="bad" color="danger" />
            <Header text="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
