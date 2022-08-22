import AuthNavbar from './AuthNavbar'
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return ( 
        <div className="authlayout">
            <AuthNavbar/>
            <Outlet/>
        </div>
     );
}
 
export default AuthLayout;