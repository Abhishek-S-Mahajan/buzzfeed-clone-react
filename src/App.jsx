import { useState, useEffect, createRef } from 'react'
import Title from './components/Title'
import QuestionsBlock from './components/QuestionsBlock'
import AnswerBlock from './components/AnswerBlock'

const App = () => {

  //***** START OF STATE INITIALIZATION *****//
  //@desc: "quiz" stores the quiz end-point data such as questions, options, and answer combinations
  //@desc: an array "chosenAnswerItems" reflects the answer choices made by the user for each question
  //@desc: an array "unansweredQuesIDs" tracks the IDs of questions that are yet to be answered
  //@desc: a boolean "showAnswer" spins out the type of cheese that you're based on the combination of options the user has chosen
  const [quiz, setQuiz] = useState(null)
  const [chosenAnswerItems, setChosenAnswerItems] = useState([])
  const [unansweredQuesIDs, setUnansweredQuesIDs] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  //***** END OF STATE INITIALIZATION *****//


  //***** START OF REFS CREATION *****//
  //@desc: instead of using querySelector to select unanswered question blocks we create "refs" dynamically for each question, which can be used for scrolling to that question
  //@desc: unansweredQuesIDs is expected to be an array of question IDs
  const refs = unansweredQuesIDs?.reduce((acc, id) => {
    acc[id] = createRef()
    return acc
  }, {})

  //@desc: "answerRef" is a single ref for the Answer Block that will be used to scroll to that section when all the questions have been answered
  const answerRef = createRef()

  console.log("Refs:", refs)
  //***** END OF REFS CREATION *****//


  //***** START OF DATA FETCHING FROM LOCAL JSON SERVER *****//
  //@desc: "fetchData" is an async function that fetches the quiz data from "http://localhost:8000/quiz"
  //@desc: on success, this function updates the "quiz" state to a JS object
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/quiz")
      const data = await res.json()
      setQuiz(data)

    } catch (error) {
      console.error("Error...", error.message)

    }
  }
  //***** END OF DATA FETCHING FROM LOCAL JSON SERVER *****//


  //***** START OF USE-EFFECT *****//
  //@desc: this useEffect triggers the "fetchData" function when the effect only runs after the initial render and not on any subsequent renders, aka, empty dependency array
  useEffect(() => {
    fetchData()
  }, [])

  //@desc: this useEffect runs whenever "quiz" is updated.
  //@desc: it maps over the "questionsContent" from the quiz and extracts the "id" of each question, pushing it into "unansweredQuesIDs"
  //@desc: after a successful fetch, initially "unansweredQuesIDs" array is populated with the "ids" of all the questions
  useEffect(() => {
    const unansweredIDs = quiz?.questionsContent?.map(({ id }) => id)
    setUnansweredQuesIDs(unansweredIDs)
  }, [quiz])

  //@desc: this useEffect runs whenever there is a change in the state of "unansweredQuesIDs", "showAnswer", "chosenAnswerItems", "answerRef", and "refs"
  //@desc: the first outer "IF" block refers that if the answers have been chosen by the user
  //@desc: the first inner "IF" block refers that if the "showAnswer" is set to true, which means that the "chosenAnswerItems" has the user answers and "unansweredQuesIDs" has a length of 0
  //@desc: the second inner "IF" block refers that if at least one of the questions is answered, aka, "chosenAnswerItems" has the user answers and "unansweredQuesIDs" has a length of 0, set "showAnswer" to true
  //@desc: "ELSE" if there are still some unanswered questions left, get the question with the smallest "id" from "unansweredQuesIDs" array (i.e., the next highest unanswered question)
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
  //***** END OF USE-EFFECT *****//


  console.log("chosenAnswerItems:", chosenAnswerItems)
  console.log("unansweredQuesIDs:", unansweredQuesIDs)



  return (
    //***** START OF THE RENDER *****//
    //@desc: TITLE: displays the "quiz" title and subtitle using the "Title" component
    //@desc: QUESTIONSBLOCK: if there are "unansweredQuesIDs" refs then iterate over "quiz.questionsContent", rendering a "QuestionsBlock" component for each question
    //@desc: QUESTIONSBLOCK: unique key for each question; props like "quizItem", "setChosenAnswerItems", "chosenAnswerItems", "unansweredQuesIDs", "setUnansweredQuesIDs" are passed to handle the logic of selecting answers
    //@desc: ANSWERBLOCK: if "showAnswer" is true (all questions answered), the "AnswerBlock" component is displayed with the answers
    //@desc: ANSWERBLOCK: passes the "chosenAnswerItems" and "quiz.answersContent" to display the results
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
    //***** END OF THE RENDER *****//
  )
}

export default App
