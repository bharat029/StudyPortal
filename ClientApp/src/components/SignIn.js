import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const SignIn = () => {
  return (
    <>
    <Helmet>
      <title>Sign In - Kunjal Panchal</title>
    </Helmet>
    <div className="page">
      <h2 id="page-title">Sign In</h2>
      <form method="post" onSubmit={submited} className="col-md-5 offset-md-1 mt-5" action="">
        { authError && <div id="alert" className="alert alert-danger" role="alert">{ authError }</div> }
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" onChange={this.changeHandler} className="form-control" placeholder="Email" name="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" onChange={this.changeHandler} className="form-control" placeholder="Password"  name="password" id="password" />
        </div>
        <div id='submit' className="form-group col-12 text-center">
          <button type="submit" className="btn btn-success pl-0 pr-0 text-center col-md-4 col-6">Sign In</button>
        </div>
      </form>
    </div>
  </>
)
}

export default SignIn
