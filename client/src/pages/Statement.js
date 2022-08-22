import {useAuthContext} from '../hooks/useAuthContext'
import { useState, useEffect, useCallback } from 'react'

const Statement = () => {

    
    const {atm_user}  = useAuthContext()
    
    const [transactions, setTransactions] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const getTransactions = useCallback( async () =>{
        try{
            setLoading(true)
            const res = await fetch('/api/transactions/getTransactions',{
              method: 'GET',
              headers: {'Authorization': `Bearer ${atm_user.token}`},
          })
            const transactions = await res.json()
            setTransactions(transactions)
            setLoading(false)
            setError(false)
        }catch(error){
            console.log(error)
            setLoading(false)
            setError(error)
    }
    } ,[atm_user])
    
    useEffect(()=>{
      getTransactions()
    },[getTransactions])  
    
    return ( 
        <div className="statement">
          {
            loading && 
            <div 
            style={{height: '100%', width: '100%', display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
              <h1>loading</h1>
              </div>
          }
            { transactions && transactions.length !== 0 ?
                
                <table>
                <thead>
                  <tr>
                    <th>date & time</th>
                    <th>type</th>
                    <th>amount</th>
                    <th>balance</th>
                  </tr>
                </thead>
                <tbody>

                  {transactions.map(trans => 

                  <tr key={trans._id}>
                    <td>{trans.date}</td>
                    <td>{trans.type}</td>
                    <td>R{trans.amount}</td>
                    <td>R{trans.balance}</td>
                  </tr>

                )}
                </tbody>
              </table>
               : !transactions  || transactions.length === 0 ?
              <h1>no transactions available</h1>
              : error ? <h1>error fetching your transaction history</h1>
              : ''
            }
        </div>
     );
}
 
export default Statement;