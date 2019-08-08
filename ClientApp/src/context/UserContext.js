import React, { createContext, useEffect, useReducer } from 'react'

export const UserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHECK_LOCAL':
      let token = localStorage.getItem('token')
      let signedIn = JSON.parse(localStorage.getItem('signedIn'))
      return { ...state, token, signedIn }
    case 'SIGN_IN':
      localStorage.setItem('token', action.token)
      localStorage.setItem('signedIn', true)
      return { ...state, token: action.token, signedIn: true }
    case 'SIGN_OUT':
      localStorage.removeItem('token')
      localStorage.setItem('signedIn', false)
      return { ...state, token: null, signedIn: false }
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
