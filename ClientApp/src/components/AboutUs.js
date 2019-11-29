import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { UserContext } from '../context/UserContext'
import {Redirect} from 'react-router-dom'

const AboutUs = () => {  
  const context = useContext(UserContext) 
  return (
    <>
      <Helmet>2
        <title>About Us - Student Portal</title>
      </Helmet>
      {
        context.state.signedIn 
        ? <>
          <h1>About Us</h1>
          <h2 style={{ margin: '30px' }}>Student Portal is based on:</h2>
          <ol style={{ margin: '30px' }}>
            <li>.NET Core, for server side</li>
            <li>React.js, for client side</li>
            <li>MongoDB, for database</li>
          </ol>
          <h2 style={{ margin: '30px' }}>Project made by:</h2>
          <ul style={{ margin: '30px' }}>
            <li>V Bharathan MUdaliar</li>
            <li>Siddharth Gianchandani</li>
            <li>Sujog Sehra</li>
          </ul>
        </> 
        : <Redirect to="/signin" />}
    </>
  )
}

export default AboutUs
