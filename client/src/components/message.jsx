import React from 'react'
import './message.css'

function Message({prop}) {
  return (
    <div className='container'>
        <div className="headers">
            <h3>From: </h3>
            <h3>Time: </h3>
        </div>
        <div className="message">
            <h2>Messages</h2>
        </div>
    </div>
    // <>
    // messages
    // </>
  )
}

export default Message