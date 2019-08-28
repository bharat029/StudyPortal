import React, { useEffect } from 'react'

const Question = ({ question, next, inc, setChoice }) => {
  useEffect(() => {
    document.querySelectorAll('input[name="choice"]').forEach(ele => ele.disabled = false)
    if(document.querySelector('input[name="choice"]:checked')){
      let ele = document.querySelector('input[name="choice"]:checked')
      ele.parentElement.parentElement.classList.remove('correct')
      ele.parentElement.parentElement.classList.remove('incorrect')
      ele.checked = false;
    }
  }, [question])

  const check = (e) => {
    e.preventDefault()
    if(document.querySelector('input[name="choice"]:checked')){
      let choice = parseInt(document.querySelector('input[name="choice"]:checked').value)

      document.querySelectorAll('input[name="choice"]').forEach(ele => ele.disabled = true)

      setChoice(question, choice)

      if (choice === question.correctOption) {
        document.querySelector('input[name="choice"]:checked') &&  document.querySelector('input[name="choice"]:checked').parentElement.parentElement.classList.add('correct')
        inc()
      } else {
        document.querySelector('input[name="choice"]:checked') &&  document.querySelector('input[name="choice"]:checked').parentElement.parentElement.classList.add('incorrect')
      }
    }
  }
  
  return (
    <>
    {
      question && (<>
        <h5 className="d-block bg-info border p-3 w-100">{ question.question }</h5>
        <form className="w-100" onSubmit={check}>
          <div className="form-check w-100 border mt-1">
            <label className="form-check-label w-100 p-1" htmlFor={question.optionA}>
              <input type="radio" className="form-check-input" id={question.optionA} name="choice" value="0" />{question.optionA}
            </label>
          </div>
          <div className="form-check w-100 border mt-1">
            <label className="form-check-label w-100 p-1" htmlFor={question.optionB}>
              <input type="radio" className="form-check-input" id={question.optionB} name="choice" value="1" />{question.optionB}
            </label>
          </div>
          <div className="form-check w-100 border mt-1">
            <label className="form-check-label w-100 p-1" htmlFor={question.optionC}>
              <input type="radio" className="form-check-input" id={question.optionC} name="choice" value="2" />{question.optionC}
            </label>
          </div>
          <div className="form-check w-100 border mt-1">
            <label className="form-check-label w-100 p-1" htmlFor={question.optionD}>
              <input type="radio" className="form-check-input" id={question.optionD} name="choice" value="3" />{question.optionD}
            </label>
          </div>
          <button type="submit" className="btn btn-primary m-2">Submit</button>
          <button onClick={next} className="btn btn-primary m-2 float-right">Next</button>
        </form>    
        </>)
    }
    </>
  )
}

export default Question
