import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { UserContext } from '../context/UserContext'
import {Redirect} from 'react-router-dom'

const Home = () => {  
  const context = useContext(UserContext) 
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {context.state.signedIn ? <button onClick={() => context.dispatch({type:'SIGN_OUT'})} className="btn btn-danger">Log Out</button> : <Redirect to="/signin" />}
    </>
  )
}

export default Home
