import React from 'react'
import Options from './Options'

const Question = ({question, dispatch, answer}) => {
  return (
    <div>
      <h4>
        {question.question}
      </h4>
      <div className='options'>
         <Options question={question} answer={answer} dispatch={dispatch} />
      </div>
    </div>
  )
}

export default Question
