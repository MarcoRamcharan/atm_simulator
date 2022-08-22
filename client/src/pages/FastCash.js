import {useBalanceContext} from '../hooks/useBalanceContext'
import {useAuthContext} from '../hooks/useAuthContext'
import { useState } from 'react'
import MessageBox from '../components/MessageBox'

const FastCash = () => {

    const {balance, dispatch} = useBalanceContext()
    const {atm_user} = useAuthContext()
    const [message, setMessage] = useState('')
    const [display, setDisplay] = useState(false)

    const fastcash = async(amount) =>{
        if(amount > balance){
            setMessage('not enough funds')
            setDisplay(true)
        }
        if(amount <= balance){
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
        setDisplay(true)
        }
    }

    const close = () =>{
        setDisplay(false)
    }

    return ( 
        <div className="fastcash">
            {
                display ? <MessageBox message={message} close={close}/> : ''
            }
            <div className="fastcash-body">
                <h1>FASTCASH</h1>
                <h2>balance : {balance}</h2>
                <div className="fastcash-amounts">
                    <h1 onClick={()=>{fastcash(100)}}>R100</h1>
                    <h1 onClick={()=>{fastcash(350)}}>R350</h1>
                    <h1 onClick={()=>{fastcash(500)}}>R500</h1>
                    <h1 onClick={()=>{fastcash(1000)}}>R1 000</h1>
                    <h1 onClick={()=>{fastcash(2000)}}>R2 000</h1>
                    <h1 onClick={()=>{fastcash(10000)}}>R10 000</h1>
                </div>
            </div>
        </div>
     );
}
 
export default FastCash;