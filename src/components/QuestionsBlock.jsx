import React, { forwardRef } from 'react'
import QuestionBlock from './QuestionBlock'

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

export default forwardRef(QuestionsBlock)