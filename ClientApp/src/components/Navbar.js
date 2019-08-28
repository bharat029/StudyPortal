import React, { useState, useContext, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const context = useContext(UserContext)

  const [exams, setExams] = useState([])

  useEffect(() => {
    fetch('/api/questions/exams',{
      headers: {
        'Authorization': `bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setExams(data))
      .catch(err => console.log(err))
  }, [])

  const LogOut = (e) => {
    e.preventDefault()
    context.dispatch({type:'SIGN_OUT'})
  }

  const collpaseSidebar = (e) => {
    e.preventDefault()
    document.querySelector('#sidebar-container').classList.toggle('menu-displayed')
  }

	const collapse = (e) => document.querySelector('.collapse').classList = "collapse navbar-collapse row no-gutters col-md-8 mr-3 justify-content-end"

	return (
		<nav className="navbar navbar-expand-sm navbar-dark row sticky-top">
			<div className="navbar-brand border-0 col-md-4 col-9 m-0 ml-3 p-0">
				<h1 onClick={collpaseSidebar} className="text-white m-0 h3">Study Portal</h1>
			</div>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse row no-gutters col-md-8 mr-3 justify-content-end" id="navbarNav">
				<ul className="navbar-nav mw-100 col-md-9 row no-gutters">
					<li className="nav-item col-3">
						<NavLink className="nav-link my-auto col-12 m-0 p-2 text-white col-4 text-center" onClick={collapse}  exact to="/">Home</NavLink>
					</li>
          <div className="dropdown col-3">
            <button className="btn btn-secondary col-12 m-0 p-2 dropdown-toggle" type="button" id="exam" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Exam
            </button>
            <div className="dropdown-menu text-center mw-100" aria-labelledby="exam">
              {
                exams && exams.map((exam, idx) => <Link key={idx} className="dropdown-item mw-100" onClick={collapse}  to={`/exam/${exam}`}>{exam}</Link>)
              }
            </div>
          </div>  
          <div className="dropdown col-3">
            <button className="btn btn-secondary col-12 m-0 p-2 dropdown-toggle" type="button" id="resources" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Resources
            </button>
            <div className="dropdown-menu text-center mw-100" aria-labelledby="resources">
              <Link className="dropdown-item mw-100" onClick={collapse}  to="#">Item 1</Link>
              <Link className="dropdown-item mw-100" onClick={collapse}  to="#">Item 2</Link>
            </div>
          </div>  
					<li className="nav-item col-3">
						<NavLink className="nav-link my-auto col-12 m-0 p-2 text-white text-center" onClick={collapse}  to="/aboutus">About Us</NavLink>
          </li>
				</ul>
				<ul className="list-unstyled mw-100 col-md-3" id="log">
          {
            context && context.state.signedIn  
            ? (
              <li className="float-right">
                <Link onClick={LogOut} className="btn btn-primary m-2 dol-6 text-white text-center" to="/">Log Out</Link>
              </li>
            )
            : (<>
              <li className="float-right">
                <Link className="btn btn-primary m-2 dol-6 text-white text-center" to="/signup">Register</Link>
              </li>
              <li className="float-right">
                <Link className="btn btn-primary m-2 dol-6 text-white text-center" to="/signin">Log In</Link>
              </li>
            </>)
          }
        </ul>
      </div>
		</nav>
	)
}

export default Navbar
