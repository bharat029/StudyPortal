import React from 'react'

const ErrorList = ({ errors }) => {
  return (
    <ul className="small alert alert-danger">
      {errors.map((err, idx) => <li key={idx}>{err.description}</li>)}
    </ul>
  )
}

export default ErrorList
