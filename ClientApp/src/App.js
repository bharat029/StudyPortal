import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Exam from './components/Exam';
import UserContextProvider from './context/UserContext';

const App = () => {
  return (
    <Router>
      <UserContextProvider>
        <Sidebar />
        <Navbar />      
        <div className="col-md-9 offset-md-3" id="main-content">
          <Route exact path="/" component={Home} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/exam/:name" render={(props) => <Exam { ...props } key={Math.random()} />} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <br /><br /><br />  
        </div>
      </UserContextProvider>  
    </Router>
  );
}

export default App