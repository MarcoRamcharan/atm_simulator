import {useBalanceContext} from '../hooks/useBalanceContext'

const Balance = () => {

    const {balance} = useBalanceContext()

    return ( 
        <div className="balance">
            <h3>BALANCE</h3>
            <h1>R {balance}</h1>
        </div>
     );
}
 
export default Balance;