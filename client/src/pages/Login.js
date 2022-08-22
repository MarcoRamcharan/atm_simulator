import {useLogin} from '../hooks/useLogin'
import { useState } from 'react'

const Login = () => {

    const [accountNumber, setAccountNumber] = useState('')
    const [pin, setPin] = useState('')
  
    const {login, error, isLoading} = useLogin()
  
    const loginUser = async (e) => {
        e.preventDefault()
        await login(accountNumber,pin)
    }

    return ( 
        <div className="login">
            <div className="loginbody">
                <h1>LOGIN</h1>
                <form onSubmit={loginUser}>
                <div className="input-group">
                    <label>CARD NUMBER</label>
                    <input type="text" 
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>PIN</label>
                    <input type="text" 
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    />
                </div>
                <button disabled={isLoading}>LOGIN</button>
                {
                    error && <h4>{error}</h4>
                }
                {isLoading && <span>logging you in...</span>}
                </form>
            </div>
        </div>
     );
}
 
export default Login;