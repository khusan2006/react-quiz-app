import React, { useEffect } from 'react'

const Timer = ({dispatch, secondsRemaining}) => {
    const minutes = Math.floor(secondsRemaining /60);
    const seconds = Math.floor(secondsRemaining % 60)

  useEffect(() => {
    const timerID = setInterval(() => {
        dispatch({type: 'tick'})
    }, 1000)

    return function() {
        clearInterval(timerID)
    }
  }, [dispatch])  
  return (
    <div className='timer'>
      {minutes < 10 && '0'}{minutes}:{seconds < 10 && '0'}{seconds}
    </div>
  )
}

export default Timer
