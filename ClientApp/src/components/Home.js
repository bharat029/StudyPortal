import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { UserContext } from '../context/UserContext'
import {Redirect} from 'react-router-dom'

const Home = () => {  
  const context = useContext(UserContext) 
  return (
    <>
      <Helmet>
        <title>Home - Study Portal</title>
      </Helmet>
      {context.state.signedIn ? <h1>Welcome</h1> : <Redirect to="/signin" />}
    </>
  )
}

export default Home
