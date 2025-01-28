import React, { forwardRef } from 'react'
import QuestionBlock from './QuestionBlock'

//@desc: this component is used to display a question with its answer options
//@desc: Props: "quizItem" contains data for a single question, including its text and options
//@desc: Props: "setChosenAnswerItems" a function to update the selected answers
//@desc: Props: "chosenAnswerItems" an array of the selected answers
//@desc: Props: "setUnansweredQuesIDs" a function to update the list of unanswered questions
//@desc: Props: "unansweredQuesIDs" an array of question IDs that have not been answered yet

const QuestionsBlock = ({
    quizItem,
    setChosenAnswerItems,
    chosenAnswerItems,
    setUnansweredQuesIDs,
    unansweredQuesIDs
},
    ref
) => {
    return (
        <>
            <h2 ref={ref} className='question-title'>{quizItem.question}</h2>
            <div className='questions-container'>
                {quizItem.options.map((option, _index) => (
                    <QuestionBlock
                        key={_index}
                        quizItemID={quizItem.id}
                        option={option}
                        setChosenAnswerItems={setChosenAnswerItems}
                        chosenAnswerItems={chosenAnswerItems}
                        unansweredQuesIDs={unansweredQuesIDs}
                        setUnansweredQuesIDs={setUnansweredQuesIDs}
                    />
                ))}
            </div>
        </>
    )
}

//@desc: "ref" is passed down to the question title (h2), allowing the parent (App.jsx) to scroll to this specific question
export default forwardRef(QuestionsBlock)