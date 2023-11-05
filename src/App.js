import React, { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Erorr from './components/Erorr';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import Button from './components/Button';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';
import Footer from './components/Footer';
const initialState = {
  questions: [],
  status: 'loading',
  currentQuestion: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null
};
const SECS_PER_QUESTIONS = 30
const reducer = function(state, action) {
  switch(action.type) {
    case 'dataRecieved':
      return{
        ...state,
        questions: action.payload,
        status: 'ready'
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTIONS
      }
    case 'newAnswer':
      const question = state.questions.at(state.currentQuestion)
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points+ question.points : state.points
      }
    case 'nextQuestion':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: null
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore: state.points > state.highScore ? state.points : state.highScore
      }
    case 'restart':
      return {
        ...state,
        status: 'active',
        currentQuestion: 0,
        answer: null,
        points: 0,
        secondsRemaining: null,
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining -1,
        status: state.secondsRemaining === 0 ? 'finished': state.status
      }
    default:
      throw new Error('Unkown action')     
  }
}
function App() {
  const [{questions, status, currentQuestion, answer, points, highScore, secondsRemaining}, dispatch] = useReducer(reducer,initialState)
  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, cur) => {
    return prev + cur.points
  }, 0)
  useEffect(() => {
    const fetchData = async () => {
     try{
      const res = await fetch('http://localhost:9000/questions')
      const data = await res.json()
      dispatch({type: 'dataRecieved', payload: data})
     }catch(err) {
      dispatch({type: 'dataFailed'})
     }
    }
    fetchData()
  }, [])
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Erorr />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && <>
        <Progress currentQUestion={currentQuestion} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
        <Question dispatch={dispatch} answer={answer} question={questions[currentQuestion]}/>
        <Footer>
        <Timer dispatch={dispatch}  secondsRemaining={secondsRemaining}/>
        <Button dispatch={dispatch} answer={answer} currentQuestion={currentQuestion} numQuestions={numQuestions} />
        </Footer>
        </>}
        {status === 'finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highScore={highScore} dispatch={dispatch} />}
      </Main>
    </div>
  );
}

export default App;
