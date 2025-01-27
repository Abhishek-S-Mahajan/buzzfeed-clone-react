import React from 'react'

const QuestionBlock = ({
    option,
    quizItemID,
    setChosenAnswerItems,
    chosenAnswerItems,
    unansweredQuesIDs,
    setUnansweredQuesIDs
}) => {

    const handleClick = () => {
        setChosenAnswerItems((prevState) => [...prevState, option.text])
        setUnansweredQuesIDs(unansweredQuesIDs.filter((id) => id != quizItemID))
    }

    const validPick = !chosenAnswerItems?.includes(option.text) && !unansweredQuesIDs?.includes(quizItemID);

    return (
        <button
            className='option-block'
            onClick={() => handleClick()}
            disabled={validPick}
        >
            <img src={option.image} alt={option.alt} />
            <h3>{option.text}</h3>
            <p>
                <a href={option.image}>{option.credit}</a> from Unsplash
            </p>
        </button>
    )
}

export default QuestionBlock