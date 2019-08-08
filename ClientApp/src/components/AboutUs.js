import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { UserContext } from '../context/UserContext'
import {Redirect} from 'react-router-dom'

const AboutUs = () => {  
  const context = useContext(UserContext) 
  return (
    <>
      <Helmet>2
        <title>About Us - Study Portal</title>
      </Helmet>
      {context.state.signedIn ? <h1>About Us</h1> : <Redirect to="/signin" />}
    </>
  )
}

export default AboutUs
