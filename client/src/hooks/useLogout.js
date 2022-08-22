import {useAuthContext} from './useAuthContext'
import {useNavigate} from 'react-router-dom'

export const useLogout = () =>{

    const navigate = useNavigate()
    const {dispatch} = useAuthContext()



    const logout = () =>{
    //remove user form storage
    localStorage.removeItem('atm_user')
    localStorage.removeItem('atm_user_balance')
        dispatch({type:'LOGOUT'})
        navigate('/')
    }

    return {logout}
}