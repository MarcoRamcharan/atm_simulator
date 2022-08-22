import {useBalanceContext} from '../hooks/useBalanceContext'
import {useAuthContext} from '../hooks/useAuthContext'
import { useState } from 'react'
import MessageBox from '../components/MessageBox'

const Deposit = () => {

    const {balance, dispatch, transactions} = useBalanceContext()
    const {atm_user} = useAuthContext()
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')
    const [display, setDisplay] = useState(false)

    const deposit = async(e) =>{
        e.preventDefault()
        if(!amount || amount === 0){
            setMessage("can't deposit nothing")
            setDisplay(true)
        }
        else{
            const newbalance = balance + parseInt(amount)
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
                  console.log('success', json)
            }catch(error){
                console.log(error)
            }
            dispatch({type: 'INCREASE_BALANCE', payload: parseInt(amount)})
            localStorage.setItem('atm_user_balance', newbalance)
            let current = new Date();
            let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
            let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            let dateTime = cDate + ' ' + cTime;
            const transaction = {
                type: 'DEPOSIT',
                amount: amount.toString(),
                balance: (balance + parseInt(amount)).toString(),
                date : dateTime
                };
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
            setMessage(`deposited R${amount}`)
            setAmount('')
            setDisplay(true)
            console.log(transactions)
        }
    }

    const close = () =>{
        setDisplay(false)
    }

    return ( 
        <div className="deposit">
            {
                display ? <MessageBox message={message} close={close}/> : ''
            }
            <div className="deposit-body">
                <h1>DEPOSIT</h1>
                <h3>current balance : R{balance}</h3>
                <form onSubmit={deposit}>
                    <div className="input-group">
                    <label>AMOUNT</label>
                    <input type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <button>DEPOSIT</button>
                </form>
            </div>
        </div>
     );
}
 
export default Deposit;