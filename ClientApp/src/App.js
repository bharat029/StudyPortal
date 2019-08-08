import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserContextProvider from './context/UserContext';

const App = () => {
  return (
    <Router>
      <Navbar />      
      <UserContextProvider>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </UserContextProvider>  
    </Router>
  );
}

export default App;
