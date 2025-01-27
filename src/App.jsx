import { useState, useEffect, createRef } from 'react'
import Title from './components/Title'
import QuestionsBlock from './components/QuestionsBlock'
import AnswerBlock from './components/AnswerBlock'

const App = () => {

  const [quiz, setQuiz] = useState(null)
  const [chosenAnswerItems, setChosenAnswerItems] = useState([])
  const [unansweredQuesIDs, setUnansweredQuesIDs] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const refs = unansweredQuesIDs?.reduce((acc, id) => {
    acc[id] = createRef()
    return acc
  }, {})

  const answerRef = createRef()

  console.log("Refs:", refs)


  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/quiz")
      const data = await res.json()
      setQuiz(data)

    } catch (error) {
      console.error("Error...", error.message)

    }
  }



  useEffect(() => {
    fetchData()
  }, [])



  useEffect(() => {
    const unansweredIDs = quiz?.questionsContent?.map(({ id }) => id)
    setUnansweredQuesIDs(unansweredIDs)
  }, [quiz])



  useEffect(() => {
    if (chosenAnswerItems.length > 0) {

      if (showAnswer) {
        //scroll to answer block
        answerRef.current.scrollIntoView({ behavior: 'smooth' })
      }

      if (unansweredQuesIDs.length <= 0 && chosenAnswerItems.length >= 1) {
        setShowAnswer(true)
      } else {
        //scroll to highest unanswered question
        const highestID = Math.min(...unansweredQuesIDs)
        refs[highestID].current.scrollIntoView({ behavior: 'smooth' })

      }
    }
  }, [unansweredQuesIDs, showAnswer, chosenAnswerItems, answerRef, refs])


  console.log("chosenAnswerItems:", chosenAnswerItems)
  console.log("unansweredQuesIDs:", unansweredQuesIDs)



  return (
    <div className='app'>
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />

      {refs && quiz?.questionsContent?.map((contentItem) => (
        <QuestionsBlock
          key={contentItem.id}
          quizItem={contentItem}
          setChosenAnswerItems={setChosenAnswerItems}
          chosenAnswerItems={chosenAnswerItems}
          unansweredQuesIDs={unansweredQuesIDs}
          setUnansweredQuesIDs={setUnansweredQuesIDs}
          ref={refs[contentItem.id]}
        />
      ))}

      {showAnswer && (
        <AnswerBlock
          answerOptions={quiz?.answersContent}
          chosenAnswers={chosenAnswerItems}
          ref={answerRef}
        />
      )}

    </div>
  )
}

export default App