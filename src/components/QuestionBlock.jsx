import React from 'react'

//@desc: this component represents a single answer option for a question
//@desc: Props: "option" contains data about the individual option (text, image, credit)
//@desc: Props: "quizItemID" the ID of the question this option belongs to
//@desc: Props: "setChosenAnswerItems" a function to update the selected answers
//@desc: Props: "chosenAnswers" an array of selcted answers
//@desc: Props: "unansweredQuesIDs" an array of question IDs that have not been answered yet
//@desc: Props: "setunansweredQuesIDs" a function to update the unanswered question list

const QuestionBlock = ({
    option,
    quizItemID,
    setChosenAnswerItems,
    chosenAnswerItems,
    unansweredQuesIDs,
    setUnansweredQuesIDs
}) => {

    //@desc: when the user clicks on the option, the option's text is added to the "chosenAnswerItems" array, and the question ID is removed from "unansweredQuesIDs" to indicate that the question has been answered
    const handleClick = () => {
        setChosenAnswerItems((prevState) => [...prevState, option.text])
        setUnansweredQuesIDs(unansweredQuesIDs.filter((id) => id != quizItemID))
    }

    //@desc: this condition ensures that user cannot pick the same option twice and also cannot pick other options for the same question that has already been answered
    //@desc: it also disables the button if the option has already been selcted or if the question has already been answered
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