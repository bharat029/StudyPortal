import React, { createContext, useEffect, useReducer } from 'react'

export const UserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHECK_LOCAL':
      let token = localStorage.getItem('token')
      let signedIn = JSON.parse(localStorage.getItem('signedIn'))
      let userName = localStorage.getItem('userName')
      return { ...state, token, signedIn, userName }
    case 'SIGN_IN':
      localStorage.setItem('token', action.data.token)
      localStorage.setItem('signedIn', true)
      localStorage.setItem('userName', action.data.userName)
      return { ...state, token: action.data.token, signedIn: true, userName: action.data.userName }
    case 'SIGN_OUT':
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.setItem('signedIn', false)
      return { ...state, token: null, signedIn: false, userName: null }
    default:
      return { ...state }
  }
}

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {})

  useEffect(() => {
    dispatch({type: 'CHECK_LOCAL'})
  }, [])

  return (
    <UserContext.Provider value={{state, dispatch}}>
      { children }
    </UserContext.Provider>
  )
}

export default UserContextProvider  
