import {useBalanceContext} from '../hooks/useBalanceContext'
import {useAuthContext} from '../hooks/useAuthContext'
import { useState } from 'react'
import MessageBox from '../components/MessageBox'

const Widthdraw = () => {

    const {balance, dispatch, transactions} = useBalanceContext()
    const {atm_user} = useAuthContext()
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')
    const [display, setDisplay] = useState(false)

    const widthdraw = async(e) =>{
        e.preventDefault()
        if(amount > balance){
            setMessage('not enough funds')
            setDisplay(true)
        }

        if(!amount || amount === 0){
            setMessage('cant widthdraw nothing')
            setDisplay(true)
        }

        if(amount && amount > 0 && amount <= balance){
        const newbalance = balance - parseInt(amount)
        try{
            const res = await fetch('/api/transactions/setBalance',{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${atm_user.token}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({newbalance})
            })
              const json = await res.json()
              console.log(json)
        }catch(error){
            console.log(error)
        }
        dispatch({type: 'DECREASE_BALANCE', payload: parseInt(amount)})
        localStorage.setItem('atm_user_balance', newbalance)
        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;
        const transaction = {
        type: 'WITHDRAWAL',
        amount: amount,
        balance: balance - parseInt(amount),
        date : dateTime
        }
        try{
            const res = await fetch('/api/transactions/create',{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${atm_user.token}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(transaction)
            })
              const json = await res.json()
              console.log('succes', json)
        }catch(error){
            console.log('error',error)
        }
        dispatch({type: 'ADD_TRANSACTION', payload: transaction})
        setMessage(`widthdrawn R${amount}`)
        setAmount('')
        setDisplay(true)
        console.log(message)
        console.log(transactions)
        }
    }

    const close = () =>{
        setDisplay(false)
    }

    return ( 
        <div className="widthdraw">
            {
                display ? <MessageBox message={message} close={close}/> : ''
            }
            
            <div className="widthdraw-body">
                <h1>WIDTHDRAW</h1>
                <h2>BALANCE : R{balance}</h2>
                <form onSubmit={widthdraw}>
                    <div className="input-group">
                    <label>AMOUNT</label>
                    <input type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} 
                    />
                    </div>
                    <button>WIDTHDRAW</button>
                </form>
            </div>
        </div>
     );
}
 
export default Widthdraw;