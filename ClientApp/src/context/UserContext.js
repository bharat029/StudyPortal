import React, { createContext, useEffect, useReducer } from 'react'

export const UserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHECK_LOCAL':
      return { ...state, udi: localStorage.getItem('uid') }
    case 'SIGN_IN':
      localStorage.setItem('uid', action.data)
      return { ...state, uid: action.data }
    case 'SIGN_OUT':
      localStorage.removeItem('uid')
      return { ...state, uid: null }
    default:
      return { ...state }
  }
}

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {uid: null})

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
