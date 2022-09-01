import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
import {useNavigate} from 'react-router-dom'

export const useSignup = () =>{
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [isloading, setIsLoading] = useState('')

    const {dispatch}  = useAuthContext()

    const signup = async(accountNumber,pin) =>{
        const balance = 100
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/auth/create', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({accountNumber, pin, balance})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save user to local storage
            localStorage.setItem('atm_user', JSON.stringify(json))
            //updarte the auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            navigate('/user')

        }
    }

    return {signup, isloading, error}
}