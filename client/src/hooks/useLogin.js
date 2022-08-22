import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
import {useNavigate} from 'react-router-dom'

export const useLogin = () =>{
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [isloading, setIsLoading] = useState('')

    const {dispatch}  = useAuthContext()


    const login = async(accountNumber,pin) =>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({accountNumber, pin})
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

    return {login, isloading, error}
}