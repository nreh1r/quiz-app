


function Question(props) {
    
    const questionElements = props.questions.map(question => {
        const answerElements = question.answers.map(answer => {
            const styles = {
                backgroundColor: props.submitPressed ? (answer.isCorrect ? "#94D7A2" : (answer.isIncorrect ? "#F8BCBC" : "white")) : (answer.isChosen ? "#D6DBF5" : "white"),
                border: props.submitPressed ? (answer.isCorrect ? "none" : (answer.isIncorrect ? "none" : "")) : "",
                opacity: props.submitPressed ? (answer.isCorrect ? 1 : (answer.isIncorrect ? 0.5 : 0.5)) : 1
            }
            return (
                <p
                key={answer.id} 
                id={answer.id} 
                onClick={(event) => props.handleClick(event, answer.id)} 
                className="question"
                style={styles}
                >
                    {answer.answerChoice}
                </p>
            )
        })

        return (
            <div className="question-container">
                <h1>{question.question}</h1>
                <div className="answer-choices">
                    {answerElements}
                </div>
            
            </div>
        )
    })

    return (
        <div className='main-container-2'>
            {questionElements}
            <div className="submit-container">
                {props.submitPressed && <h1 className="submit-text">You scored {props.correctAnswers}/5 correct answers</h1>}
                <button className="submit-answers" onClick={props.handleSubmit}>{props.submitPressed ? "Play Again" : "Check Answers"}</button>
            </div>
            <div className='lower-left-circle'></div>
            <div className='upper-right-circle'></div>
        </div>
    )
}

export default Question