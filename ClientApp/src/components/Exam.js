import React, { useState, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Question from './Question'

const Exam = ({ match }) => {
  const [questions, setquestions] = useState([])

  const [current, setCurrent] = useState(0)

  const [score, setScore] = useState(0)

  const context = useContext(UserContext)

  const ac = new AbortController()

  useEffect(() => {
    setCurrent(0)
    setScore(0)
    
    fetch('/api/questions?name=' + match.params.name, {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('token')}`
      },
      signal: ac.signal
    })
      .then(response => response.json())
      .then(data => {
      data = data.map(question => {
          return { ...question, choice: null }
        })
        setquestions(data)
      })
      .catch(err => console.log(err))
      return () => ac.abort() 
    }, [match.params.name, ac])

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

  const next = () => {
    if(current === questions.length - 1)  
    {
      const examName = match.params.name
      const examScore = score / questions.length * 100

      fetch('/api/user/exams', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: examName, score: examScore })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
    setCurrent(current + 1)
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
              <h3>{ match && match.params.name }</h3>
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
                ? <Question question={questions[current]} setChoice={setChoice} next={next} inc={() => setScore(score + 1)} />
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
