import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const context = useContext(UserContext)

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
		<nav className="navbar navbar-expand-sm navbar-dark row sticky-top border-bottom">
			<div className="navbar-brand border-0 text-center col-md-4 col-9 m-0 ml-3 p-0">
				<h1 onClick={collpaseSidebar} className="text-white">Study Portal</h1>
			</div>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse row no-gutters col-md-8 mr-3 justify-content-end" id="navbarNav">
				<ul className="navbar-nav col-12 col-md-5">
					<li className="nav-item">
						<NavLink className="nav-link text-white text-center" onClick={collapse}  exact to="/">Home</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link text-white text-center" onClick={collapse}  to="/aboutus">About Us</NavLink>
					</li>
				</ul>
				<div className="dropdown col-12 col-md-2">
					<button className="btn btn-secondary col-12 m-0 p-2 dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
						aria-expanded="false">
						Dropdown
					</button>
					<div className="dropdown-menu text-center col-12" aria-labelledby="triggerId">
						<Link className="dropdown-item col-12" onClick={collapse}  to="#">Action</Link>
						<Link className="dropdown-item col-12 disabled" onClick={collapse}  to="#">Disabled action</Link>
					</div>
				</div>  
				<ul className="list-unstyled col-12 col-md-5">
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
