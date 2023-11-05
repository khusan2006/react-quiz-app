import React from 'react'

const FinishScreen = ({points, maxPossiblePoints, highScore, dispatch}) => {
  const percentage = points / maxPossiblePoints * 100  
  return (
    <>
    <p className='result'>
      You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
    </p>
    <p className='highscore'>
        (High score: {highScore} points)
    </p>
    <button onClick={() => dispatch({type: 'restart'})} className='btn btn-ui'>Restart</button>
    </>
  )
}

export default FinishScreen
