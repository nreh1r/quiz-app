import './App.css';
import React from "react"
import Question from "./Components/Question"
import { nanoid } from "nanoid"

function App() {
  const [quizStart, setQuizStart] = React.useState(false);
  const [questionObject, setQuestionObject] = React.useState([])
  const [correctAnswers, setCorrectAnswers] = React.useState(0)
  const [submitPressed, setSubmitPressed] = React.useState(false)
  const [playAgain, setPlayAgain] = React.useState(false)

  function handleClick(event, chosenId) {
    console.log(event, chosenId)
    setQuestionObject(oldQuestions => oldQuestions.map(question => {
      const newObj = {
        ...question,
        answers: (question.answers.map(answer => {
          return answer.id === chosenId ?
          {...answer, isChosen: !answer.isChosen} :
          answer
        })
        ),
        

    }
      return newObj
    }))
    
    setQuestionObject(oldQuestions => oldQuestions.map(question => {
      const newObj = {
        ...question,
        answers: (question.answers.map(answer => {
          if (answer.id === chosenId) {
            if (answer.answerChoice === question.correctAnswer) {
              return {...answer, isCorrect: true}
            } else {
              return {...answer, isIncorrect: true}
            }
          } else {
            return answer
          }
        })
        ) 
      }
      return newObj
    }))

  }

  function handleSubmit() {
    if (!submitPressed) {
      setSubmitPressed(true)
      let numCorrect = 0
      for (let i=0; i < questionObject.length; i++) {
        for(let j=0; j < questionObject[i].answers.length; j++) {
          if(questionObject[i].answers[j].isChosen) {
            questionObject[i].answers[j].answerChoice === questionObject[i].correctAnswer ?
            numCorrect += 1 :
            numCorrect += 0
          }
        }
      }
      setCorrectAnswers(numCorrect)
    } else {
      setSubmitPressed(false)
      setCorrectAnswers(0)
      setPlayAgain(prevState => !prevState)
    }
  }

  function startQuiz() {
    setQuizStart(prevState => !prevState)
  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const questionsArray =[]
        const correctAnswersArray =[]
        const incorrectAnswersArray = []
        for(let i=0; i < data.results.length; i++) {
          questionsArray.push(data.results[i].question)
          correctAnswersArray.push(data.results[i].correct_answer)
          incorrectAnswersArray.push(data.results[i].incorrect_answers)
        }

        const questionObj = []
        for (let i=0; i < data.results.length; i++) {
          questionObj.push({
            key: nanoid(),
            question: questionsArray[i], 
            correctAnswer: correctAnswersArray[i],
            incorrectAnswers: incorrectAnswersArray[i],
            answers: [ {
                id: nanoid(),
                answerChoice: correctAnswersArray[i],
                isChosen: false,
                isCorrect: false,
                isIncorrect: false
            },
              {
                id: nanoid(),
                answerChoice: incorrectAnswersArray[i][0],
                isChosen: false,
                isCorrect: false,
                isIncorrect: false
            },
              {
                id: nanoid(),
                answerChoice: incorrectAnswersArray[i][1],
                isChosen: false,
                isCorrect: false,
                isIncorrect: false
            },
              {
                id: nanoid(),
                answerChoice: incorrectAnswersArray[i][2],
                isChosen: false,
                isCorrect: false,
                isIncorrect: false
            }
            ]
          })
        }
        
        const randomizedQuestionObject = []
        for (let i=0; i < questionObj.length; i++) {
          randomizedQuestionObject[i] = questionObj[i].answers.map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

          questionObj[i].answers = randomizedQuestionObject[i]
        }

        console.log(randomizedQuestionObject)

        setQuestionObject(questionObj)
      })
  }, [playAgain])
  
  return (
    quizStart ? 
      <Question 
        questions={questionObject} 
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        correctAnswers={correctAnswers}
        submitPressed={submitPressed}
      />
    :
    <div className='main-container'>
      <div className="starting-flex-container">
        <h1>Quizzical</h1>
        <p className='description-text'>Some description if needed</p>
        <button className='start-button' onClick={startQuiz}>Start Quiz</button>
      </div>
      <div className='lower-left-circle'></div>
      <div className='upper-right-circle'></div>
    </div>
  );
}

export default App;
