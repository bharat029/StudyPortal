import React from 'react'

const Question = ({ question, next, inc, setChoice }) => {
  const check = () => {
    if(document.querySelector('input[name="choice"]:checked')){
      let choice = parseInt(document.querySelector('input[name="choice"]:checked').value)
      let choiceInput = document.querySelector('input[name="choice"]:checked').parentElement.parentElement
      let remark = document.createElement('span')
      remark.classList = "fa fa-2x float-right mr-3"
      remark.id = "remark"

      document.querySelectorAll('input[name="choice"]').forEach(ele => ele.disabled = true)

      setChoice(question, choice)

      if (choice === question.correctOption) {
        document.querySelector('input[name="choice"]:checked') &&  document.querySelector('input[name="choice"]:checked').parentElement.parentElement.classList.add('correct')
        remark.classList.add('fa-check')
        inc()
      } else {
        document.querySelector('input[name="choice"]:checked') &&  document.querySelector('input[name="choice"]:checked').parentElement.parentElement.classList.add('incorrect')
        remark.classList.add('fa-times')
      }
      choiceInput.append(remark)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    check()
  }

  const cleanup = () => {
    document.querySelectorAll('input[name="choice"]').forEach(ele => ele.disabled = false)

    if(document.querySelector('input[name="choice"]:checked')){
      let ele = document.querySelector('input[name="choice"]:checked')
      ele.parentElement.parentElement.classList.remove('correct')
      ele.parentElement.parentElement.classList.remove('incorrect')
      ele.checked = false;
    }

    let remark = document.querySelector('#remark')
    remark && remark.parentElement.removeChild(remark)
  }

  const goNext = (e) => {
    if (question.choice === null){
      if(document.querySelector('input[name="choice"]:checked')){
        check()
        cleanup()
        next()
      }
    } else {
      cleanup()
      next()
    }
  }
  
  return (
    <>
    {
      question && (<>
        <h5 className="d-block bg-info border p-3 w-100">{ question.question }</h5>
        <form className="w-100 ml-3" onSubmit={submitHandler}>
          <div className="form-check w-100 border mt-1 row">
            <label className="form-check-label col-11 p-1" htmlFor={question.optionA}>
              <input type="radio" className="form-check-input" id={question.optionA} name="choice" value="0" />{question.optionA}
            </label>
          </div>
          <div className="form-check w-100 border mt-1 row">
            <label className="form-check-label col-11 p-1" htmlFor={question.optionB}>
              <input type="radio" className="form-check-input" id={question.optionB} name="choice" value="1" />{question.optionB}
            </label>
          </div>
          <div className="form-check w-100 border mt-1 row">
            <label className="form-check-label col-11 p-1" htmlFor={question.optionC}>
              <input type="radio" className="form-check-input" id={question.optionC} name="choice" value="2" />{question.optionC}
            </label>
          </div>
          <div className="form-check w-100 border mt-1 row">
            <label className="form-check-label col-11 p-1" htmlFor={question.optionD}>
              <input type="radio" className="form-check-input" id={question.optionD} name="choice" value="3" />{question.optionD}
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-3" style={{ marginLeft: '-15px' }}><i className="fa fa-check"></i> check</button>
          <button onClick={goNext} className="btn btn-success mt-3 mr-3 float-right">Next <i className="fa fa-arrow-right"></i></button>
        </form>    
        </>)
    }
    </>
  )
}

export default Question
