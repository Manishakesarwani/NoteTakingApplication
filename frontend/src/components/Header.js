import {Link} from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import useLogout from "../hooks/useLogout"
import { useUserAuthenticateContext } from "../hooks/useUserAuthenticateContext";


const Header = () => {
  const {logoutUser} = useLogout();
  const {user} = useUserAuthenticateContext();
  return (
    <div className='header navbar bg-body-tertiary'>
        <div className='container-fluid'>
            <Link to="/"><h1><i className="bi bi-journal"></i>Notes</h1></Link>
            <nav className='d-flex flex-row justify-content-between align-items-center'>
                {user && user.email.split("@")[0]}
                {/* <Link className='m-2' to="/login">Get Started</Link> */}
                <form className="d-flex m-2" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div className="nav_button">
                  {user && <button className='m-2 btn btn-outline-success' type='button' onClick={logoutUser}>Logout</button>}
                </div>
                
            </nav>
        </div>
    </div>
  )
}

export default Header