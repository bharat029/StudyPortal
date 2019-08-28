import React, { useState, useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Question from './Question'

const Exam = () => {
  const [questions, setquestions] = useState([])

  const [current, setCurrent] = useState(0)

  const [score, setScore] = useState(0)

  const context = useContext(UserContext)

  useEffect(() => {
    if (context){
      fetch('/api/questions', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${context.state.token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          data = data.map(question => {
            return { ...question, choice: null }
          })
          setquestions(data)
        })
        .catch(err => console.log(err))
    }
  }, [context])

  useEffect(() => {
    document.querySelectorAll('.question').forEach((ele, idx) => {
      if (idx === current - 1) {
        ele.classList.remove('bg-info')          
        if (questions[idx].choice === questions[idx].correctOption) {
          ele.classList.add('bg-success')          
        } else {
          ele.classList.add('bg-danger')          
        }        
      } else if (idx === current) {
        ele.classList.add('bg-primary')
        ele.classList.remove('bg-info')
      } 
    })
  })

  const setChoice = (question, choice) => {
    let newquestions = questions.map(q => {
      if(q.id === question.id){
        q.choice = choice
      }
      return q
    })
    setquestions(newquestions)
  }
  

  return (
    <>
      <Helmet>
        <title>Exam - Study Portal</title>
      </Helmet>
      {
        context.state.signedIn 
        ? (
          <>
            <div id="page-title" className="row">
              <h3>Exam</h3>
            </div>
            <h4>Score: {score}/{questions.length}</h4>
            <div className="row ml-md-5">
              {
                questions.length > 0 
                ? (<div className="row col-12">
                  {questions.map((question, idx) => <div key={idx} className="bg-info m-2 text-center align-center question">{idx + 1}</div>)}
                </div>)
                : null
              }
              {
                current < questions.length 
                ? <Question question={questions[current]} setChoice={setChoice} next={() => setCurrent(current + 1)} inc={() => setScore(score + 1)} />
                : <h6>Congratulations on completing the test!</h6>
              }
            </div>
          </>
        )
        : <Redirect to="/signin" />}
    </>
  )
}

export default Exam
