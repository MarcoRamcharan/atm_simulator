import {useState} from 'react'
import {useAuthContext} from '../hooks/useAuthContext'


const PinChange = () => {

    const {atm_user}  = useAuthContext()


    const [oldPin, setOldPin] = useState('')
    const [newPin, setNewPin] = useState('')
    const [newPin2, setNewPin2] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const changePin = async (e) =>{
        e.preventDefault()
        if(oldPin && newPin && newPin2){
            if(newPin !== newPin2){
                setMessage('new pin not equal to confirmation pin')
            }
            else{
                try{
                    setLoading(true)
                    const res = await fetch('/api/transactions/setPin',{
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${atm_user.token}`,
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({oldPin, newPin})
                  })
                    const newpin = await res.json()
                    console.log('pin change', newpin)
                    setLoading(false)
                    setError(false)
                    setMessage('pin changed')
                    setNewPin('')
                    setOldPin('')
                    setNewPin2('')
                }catch(error){
                    console.log(error)
                    setLoading(false)
                    setError(error)
            }
            }
        }

        if(!oldPin || !newPin || !newPin2){
            setMessage('please fill all fields')
        }
    }


    return ( 
        <div className="pinchange">
            <div className="pinchange-body">
                <h1>PIN CHANGE</h1>
                <form onSubmit={changePin}>
                    <div className="input-group">
                        <label>OLD PIN</label>
                        <input type="text" 
                        value={oldPin}
                        onChange={(e) => setOldPin(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>NEW PIN</label>
                        <input type="text" 
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>CONFIRM NEW PIN</label>
                        <input type="text"
                        value={newPin2}
                        onChange={(e) => setNewPin2(e.target.value)}
                         />
                    </div>
                    <button disabled={loading}>CHANGE PIN</button>
                    {error && <span>{error}</span>}
                    <span>{message}</span>
                    {loading && <span>loading...</span>}
                </form>
            </div>
        </div>
     );
}
 
export default PinChange;