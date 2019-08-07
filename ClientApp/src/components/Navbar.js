import React from 'react'
import {NavLink} from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark row sticky-top border-bottom">
			<div className="navbar-brand border-0 text-center col-md-3 col-9 m-0 ml-3 p-0">
				<a href="/" className="float-left text-white">Study Portal</a>
			</div>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
				<ul className="navbar-nav col-md-8 mr-3">
					<li className="nav-item">
						<NavLink className="nav-link text-white text-center" exact to="/">Home</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link text-white text-center" to="/projects">About Us</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link text-white text-center" to="/projects">About Us</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link text-white text-center" to="/projects">About Us</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link text-white text-center" to="/projects">About Us</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link text-white text-center" to="/projects">About Us</NavLink>
					</li>
        </ul>
        <div className="dropdown">
          <button className="btn btn-secondary col-12 mr-3 dropdown-toggle" onMouseEnter={(e) => e.target.parentElement.classList.add('open')} type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            Dropdown
          </button>
          <div className="dropdown-menu col-12 text-center mr-3" aria-labelledby="triggerId" onMouseLeave={(e) => e.target.parentElement.classList.remove('open')}>
            <button className="dropdown-item" href="#">Action</button>
            <button className="dropdown-item disabled" href="#">Disabled action</button>
          </div>
        </div>  
			</div>
		</nav>
	)
}

export default Navbar
