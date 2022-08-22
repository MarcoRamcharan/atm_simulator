import {useCallback, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useBalanceContext} from '../hooks/useBalanceContext'
import {useAuthContext} from '../hooks/useAuthContext'

const UserDash = () => {
  
    const {dispatch}  = useBalanceContext()
    const {atm_user}  = useAuthContext()
    
    
    const getBalance = useCallback(async () =>{
        try{
            const res = await fetch('/api/transactions/getbalance',{
              method: 'GET',
              headers: {'Authorization': `Bearer ${atm_user.token}`},
          })
            const json = await res.json()
            console.log(json)
            dispatch({type: 'SET_BALANCE', payload: parseInt(json.balance)})
            localStorage.setItem('atm_user_balance', json.balance)
        }catch(error){
            console.log(error)
    }
    }
    ,[dispatch, atm_user]) 
    
    useEffect(()=>{
      getBalance()
    },[getBalance])  


    

    return ( 
        <div className="userdash">
            <div className="userdash-body">
                <h3>ACCOUNT NUMBER : {atm_user && atm_user.accountNumber}</h3>
                <div className="userdash-links">
                    <Link to='/user/deposit'><h1>DEPOSIT</h1></Link>
                    <Link to='/user/fastcash'><h1>FAST CASH</h1></Link>
                    <Link to='/user/pinchange'><h1>CHANGE PIN</h1></Link>
                    <Link to='/user/widthdraw'><h1>WIDTHDRAW</h1></Link>
                    <Link to='/user/statement'><h1>MINI STATEMENT</h1></Link>
                    <Link to='/user/balance'><h1>BALANCE</h1></Link>
                </div>
            </div>
        </div>
     );
}
 
export default UserDash;
