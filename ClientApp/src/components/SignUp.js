import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { Redirect, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ErrorList from './ErrorList';

const SignUp = () => {
  const context = useContext(UserContext)

  const initialState = {
    userName: "default",
    email: "default",
    role: "Student",
    password: "default",
    confirmPassword: "default"
  }

  const [state, setState] = useState(initialState)

  const [errors, setErrors] = useState(null)

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const submited = (e) => {
    e.preventDefault()

    if(state.userName === 'default' || state.password === 'default' || state.email === 'default' || state.confirmPassword === 'default')
    {
      return
    }

    fetch('/api/user/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
      .then(response => response.json())
      .then(data => {
        if(data.token){
          context.dispatch({type: 'SIGN_IN', data})
        } else {
          console.log(data)
          setErrors(data)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Helmet>
        <title>Sign Up - Student Portal</title>
      </Helmet>
      {
        !context.state.signedIn 
        ? (<>
          <h2>Sign Up</h2>
          <form method="post" onSubmit={submited} className="col-md-5 offset-md-1 mt-5" action="">
            { errors && <ErrorList errors={errors} /> }
            <div className="form-group">
              <label htmlFor="userName">User Name:</label>
              <input type="text" onChange={changeHandler} className="form-control" placeholder="User Name" name="userName" id="userName" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text" onChange={changeHandler} className="form-control" placeholder="Email"  name="email" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select className="form-control" defaultValue="Student" id="role" name="role">
                <option value="Student">Student</option>
                <option value="Mentor">Mentor</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" onChange={changeHandler} className="form-control" placeholder="Password"  name="password" id="password" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" onChange={changeHandler} className="form-control" placeholder="Confirm Password"  name="confirmPassword" id="confirmPassword" />
            </div>
            <div id='submit' className="form-group col-12 text-center">
              <button type="submit" className="btn btn-success pl-0 pr-0 text-center col-md-4 col-6">Sign Up</button>
            </div>
          </form>
        <div className="small">Already have an account?<Link to="/signin">Click here</Link> to sign in.</div>
        </>) 
        : <Redirect to="/" />
      }
    </>
  )
}

export default SignUp
