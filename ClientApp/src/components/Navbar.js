import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const context = useContext(UserContext)

  const LogOut = (e) => {
    e.preventDefault()
    context.dispatch({type:'SIGN_OUT'})
  }

	return (
		<nav className="navbar navbar-expand-sm navbar-dark row sticky-top border-bottom">
			<div className="navbar-brand border-0 text-center col-md-4 col-9 m-0 ml-3 p-0">
				<a href="/" className="float-left text-white">Study Portal</a>
			</div>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse row no-gutters col-md-8 mr-3 justify-content-end" id="navbarNav">
				<ul className="navbar-nav col-12 col-md-5">
					<li className="nav-item">
						<NavLink className="nav-link text-white text-center" exact to="/">Home</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link text-white text-center" to="/aboutus">About Us</NavLink>
					</li>
        </ul>
				<div className="dropdown col-12 col-md-2">
					<button className="btn btn-secondary m-0 p-2 dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
						aria-expanded="false">
						Dropdown
					</button>
					<div className="dropdown-menu text-center" aria-labelledby="triggerId">
						<button className="dropdown-item" href="#">Action</button>
						<button className="dropdown-item disabled" href="#">Disabled action</button>
					</div>
				</div>  
				<ul className="navbar-nav col-12 col-md-5">
          {
            context && context.state.signedIn  
            ? (
              <li className="nav-item">
                <Link onClick={LogOut} className="nav-link text-white text-center" to="/">Log Out</Link>
              </li>
            )
            : (<>
              <li className="nav-item">
                <Link className="nav-link text-white text-center" to="/signup">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white text-center" to="/signin">Log In</Link>
              </li>
            </>)
          }
        </ul>
      </div>
		</nav>
	)
}

export default Navbar
