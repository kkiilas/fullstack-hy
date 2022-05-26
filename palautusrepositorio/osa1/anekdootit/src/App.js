import React, { useState } from 'react'

const Header = (props) => (
  <div>
    <h1 className="text-warning">{props.text}</h1>
  </div>
)

const Display = (props) => (
  <div>
    <Header text={props.header} />
    <div>{props.anecdote}</div>
    <div>has {props.votes} votes</div>
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick} className="btn btn-outline-warning me-2">
    {props.text}
  </button>
)

const App = (props) => {
  const length = props.anecdotes.length
  const [selected, setSelected] = useState(0)
  const [allVotes, setAll] = useState(
    Array.apply(null, new Array(length)).map(Number.prototype.valueOf, 0)
  )

  const handleVoteClick = () => {
    const copy = [...allVotes]
    copy[selected] += 1
    setAll(allVotes.splice(0, length))
    setAll(allVotes.concat(copy))
  }

  const handleNextClick = () => {
    const random = Math.floor(Math.random() * length)
    setSelected(random)
  }

  const max = Math.max(...allVotes)

  const indicesOfMax = allVotes.reduce((indices, votes, index) => {
    if (votes === max) {
      return indices.concat(index)
    }
    return indices
  }, [])

  const random = Math.floor(Math.random() * indicesOfMax.length)
  const positionOfMax = indicesOfMax[random]

  return (
    <div className="container bg-warning bg-gradient">
      <div className="container bg-secondary bg-gradient">
        <div className="d-flex bg-dark bg-gradient p-5 min-vh-100">
          <div className="d-flex flex-column p-5 m-5">
            <Display
              header="Anecdote of the day"
              anecdote={props.anecdotes[selected]}
              votes={allVotes[selected]}
            />
            <div>
              <Button handleClick={handleVoteClick} text="vote" />
              <Button handleClick={handleNextClick} text="next anecdote" />
            </div>
            <Display
              header="Anecdote with most votes"
              anecdote={props.anecdotes[positionOfMax]}
              votes={allVotes[positionOfMax]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
