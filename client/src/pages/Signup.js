import {useSignup} from '../hooks/useSignup'
import { useState } from 'react'

const Signup = () => {

    const [accountNumber, setAccountNumber] = useState('')
    const [pin, setPin] = useState('')
  
    const {signup, error, isLoading} = useSignup()
  
    const createUser = async (e) => {
        e.preventDefault()
        await signup(accountNumber,pin)
    }

    return ( 

        <div className="signup">
            <div className="signupbody">
                <h1>SIGNUP</h1>
                <form onSubmit={createUser}>
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
                <button disabled={isLoading}>SIGNUP</button>
                {
                    error && <h4>{error}</h4>
                }
                {
                    isLoading && <span>signing you up...</span>
                }
                </form>
            </div>
        </div>
     );
}
 
export default Signup;