import { useReducer, createContext, useEffect } from 'react'

export const BalanceContext = createContext()

export const BalanceReducer = (state, action) =>{
    switch(action.type){
        case 'SET_ACCOUNT':
            return {...state, account: action.payload}
        case 'SET_BALANCE':
            return {...state, balance: action.payload}
        case 'INCREASE_BALANCE':
            return {...state, balance : state.balance + action.payload}
        case 'DECREASE_BALANCE':
            return {...state, balance : state.balance - action.payload}
        case 'SET_TRANSACTIONS':
            return {...state, transactions: action.payload}
        case 'ADD_TRANSACTION':
            return {...state, transactions : [...state.transactions, action.payload]}
    default:
        return state
}}


export const BalanceContextProvider = ( { children } ) => {

    const [state, dispatch] = useReducer(BalanceReducer, {
        balance: 0,
        transactions: [],
        account: ''
    })

    useEffect(()=>{
        const atm_user_balance = JSON.parse(localStorage.getItem('atm_user_balance'))
        if(atm_user_balance){
            dispatch({type: 'SET_BALANCE', payload: parseInt(atm_user_balance)})
        }
    },[])

    

   return (
        <BalanceContext.Provider value={{...state, dispatch}}>
            {children}
        </BalanceContext.Provider>
    )
}
