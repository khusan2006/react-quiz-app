import React from 'react'

const Button = ({dispatch, answer, currentQuestion, numQuestions}) => {

    if(answer === null) return
    

    if(currentQuestion === numQuestions -1) {
    return (
     <button className='btn btn-ui' onClick={() => dispatch({type: 'finish'})}>
      Finsh
    </button>
    )
    }
    return (
      <button className='btn btn-ui' onClick={() => dispatch({type: 'nextQuestion'})}>
       Next
     </button>
     )

}

export default Button
