import React from 'react'
import { Helmet } from 'react-helmet'

const Home = () => {  
  return (
    <>
      <Helmet>
        <title>Home - Student Portal</title>
      </Helmet>
      <h1>Welcome</h1>
      <p style={{ margin: '30px' }}>Student Portal, a project based on Dotnet Core, is an online portal for students studying in branches, such as BCA, Diploma or Master's. Students can take exams of either subjects they are to appear in or of examinations for further study, such as practice tests for ETS's GRE. They can download books for such exams to assist them in their endeavors with helpful links to open source software they may use.</p>
    </>
  )
}

export default Home
