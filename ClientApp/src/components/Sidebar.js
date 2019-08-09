import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const SideBar = () => {
  const context = useContext(UserContext)

  const hide = e => {
    if(e.target.id === 'sidebar-container'){
      e.target.classList.remove('menu-displayed')
    }
  }

  return (
    <div id="sidebar-container" className="col-md-3" onClick={hide}>
      <div id="sidebar">
        <div id="me" className="row ml-2">
          <img className="img-fluid col-8 mx-auto rounded-circle mt-5" src="/imgs/account.jpg" alt={context.state.userName ? context.state.userName : 'User Name'} />
          <h1 className="h4 col-12 mt-3 text-center">{context.state.userName ? context.state.userName : 'User Name'}</h1>
        </div>
      </div>
    </div>
  )
}
  
export default SideBar