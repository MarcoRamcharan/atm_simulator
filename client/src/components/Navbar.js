import {Link} from 'react-router-dom'

const Navbar = () => {
    return ( 
        <div className="navbar">
            <h4>MYDASHBOARD BANK</h4>
            <h2>SELECT YOUR TRANSACTION</h2>
            <Link to='/user'>HOME</Link>
        </div>
     );
}
 
export default Navbar;