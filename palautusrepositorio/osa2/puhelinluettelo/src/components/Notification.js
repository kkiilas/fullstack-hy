import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes('Information')) {
    return (
      <div className="errorMessage">
        {message}
      </div>
    )
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

export default Notification