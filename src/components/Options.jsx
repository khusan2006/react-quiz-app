import React from 'react'

const Options = ({question, answer, dispatch}) => {
  const hasAnswered = answer !== null
  return (
    <div className='options'>
      {question.options.map((option, index) => (
        <button disabled={hasAnswered} key={option} onClick={() => dispatch({type: 'newAnswer', payload: index})} className={`btn btn-option ${index === answer ? 'answer': ''} ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`}>{option}</button>
      ))}
    </div>
  )
}

export default Options

