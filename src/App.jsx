import { useEffect, useState } from 'react'
import './App.css'

const Result = Object.freeze({
  Correct: 'Correct',
  Wrong: 'Wrong'
})

const getRandomColor = () => {
  const randomHex = Math.floor(16**6 * Math.random())
    .toString(16)
    .padStart(6, '0')
    .toUpperCase();

  return `#${randomHex}`
}

function App() {
  const [correctColor, setCorrectColor] = useState(() => getRandomColor())
  const [guessResult, setGuessResult] = useState('')
  const [answers, setAnswers] = useState([])

  const verifyAnswer = (guess) => {
    if (guess === correctColor) {
      setGuessResult(Result.Correct)
      setCorrectColor(getRandomColor())
    } else {
      setGuessResult(Result.Wrong)
    }
  }

  useEffect(() => {
    setAnswers(
      [correctColor, getRandomColor(), getRandomColor()]
      .sort(() => Math.random() - 0.5)
    )
  }, [correctColor])

  return (
    <div className="game">
      <h1>Color Guessing Game</h1>
      <div className="color-container" style={{ backgroundColor: correctColor }}/>
      <div className="answer-buttons">
        {answers.map(color => (
          <button key={color} type="button" onClick={() => verifyAnswer(color)}>{color}</button>
        ))}
      </div>
      {guessResult === Result.Wrong && (
        <p className="result wrong">Wrong Answer</p>
      )}
    </div>
  )
}

export default App
