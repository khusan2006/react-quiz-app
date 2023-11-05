import React from 'react'

const Progress = ({currentQUestion, numQuestions, points, maxPossiblePoints, answer}) => {
  return (
    <header className='progress'>
        <progress max={numQuestions} value={currentQUestion + Number(answer !== null)} />
        <p> Question <strong>{currentQUestion}</strong>/{numQuestions}</p>
        <p><strong>{points}</strong>/{maxPossiblePoints}</p>
    </header>
  ) 
}

export default Progress
