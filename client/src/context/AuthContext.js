import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {atm_user : action.payload}
        case 'LOGOUT':
            return {atm_user : null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch]= useReducer(authReducer,{
        atm_user: null
    })

    useEffect(()=>{
        const atm_user = JSON.parse(localStorage.getItem('atm_user'))
        if(atm_user){
            dispatch({type: 'LOGIN', payload: atm_user})
        }
    },[])

    console.log('authcontextstate', state)

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}