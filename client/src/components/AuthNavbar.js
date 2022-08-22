import {Link, useLocation} from 'react-router-dom'

const AuthNavbar = () => {

    const location = useLocation()

    return ( 
        <div className="authnavbar">
            <h1>ATM SIMULATOR</h1>

            <Link to={location.pathname === "/" ? '/signup' : '/'}>{location.pathname === "/" ? 'SIGNUP' : 'LOGIN'}</Link>
        </div>
     );
}
 
export default AuthNavbar;