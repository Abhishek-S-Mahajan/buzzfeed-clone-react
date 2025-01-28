import React, { useEffect, useState, forwardRef } from 'react'

//@desc: displays the result after the user has answered all questions
//@desc: Props: "answerOptions" is a list of possible answer combinations and their corresponding result - the image and the type of the cheese
//@desc: Props: "chosenAnswers" are the answers that the user has selected, passed down from the parent component (App.jsx)

const AnswerBlock = ({ answerOptions, chosenAnswers }, ref) => {

    //@desc: holds the final result (the matched combination answer)
    const [result, setResult] = useState(null)

    //@desc: checks whether user's "chosenAnswers" match the answer combinations in "answerOptions", if they do, update the "result" state with that answer
    //@desc: if no result is found, it sets the "result" to the first first available answer in the "answerOptions" array as a fallback
    useEffect(() => {
        answerOptions.forEach((answer) => {
            if (chosenAnswers.includes(answer.combination[0]) &&
                chosenAnswers.includes(answer.combination[1]) &&
                chosenAnswers.includes(answer.combination[2])
            ) {
                setResult(answer)
            } else if (!result) {
                setResult(answerOptions[0])
            }
        })
    }, [chosenAnswers, answerOptions])

    return (
        <div ref={ref} className='answer-block'>
            <h2>{result?.text}</h2>
            <img src={result?.image} alt={result?.alt} />
        </div>
    )
}

//@desc: forwardRef allows the "AnswerBlock" to be scrolled into view from the parent component (App.jsx), which uses "answerref"
export default forwardRef(AnswerBlock)