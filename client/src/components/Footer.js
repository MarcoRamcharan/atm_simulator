import { useLogout } from "../hooks/useLogout"
import {useAuthContext} from '../hooks/useAuthContext'

const Footer = () => {

    const {logout} = useLogout()
    const {atm_user} = useAuthContext()

    const logoutUser = () =>{
        logout()
      }

    return ( 
        <div className="footer">
            {
                atm_user && <button onClick={logoutUser}>LOGOUT</button>
            }
            <h3>MYDASHBOARD BANK</h3>
        </div>
     );
}
 
export default Footer;