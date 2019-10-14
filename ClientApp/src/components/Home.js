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
      {context.state.signedIn 
        ? <>
          <h1>Welcome</h1>
          <p style={{ margin: '30px' }}>Student Portal, a project based on Dotnet Core, is an online portal for students studying in branches, such as BCA, Diploma or Master's. Students can take exams of either subjects they are to appear in or of examinations for further study, such as practice tests for ETS's GRE. They can download books for such exams to assist them in their endeavors with helpful links to open source software they may use.</p>
        </> 
        : <Redirect to="/signin" />}
    </>
  )
}

export default Home
