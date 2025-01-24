import { useState, useEffect } from 'react'
import Title from './components/Title'

const App = () => {

  const [quiz, setQuiz] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/quiz");
      const data = await res.json();
      setQuiz(data);

    } catch (error) {

    }
  }


  return (
    <div>
      <Title />
    </div>
  )
}

export default App