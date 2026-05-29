import {Link} from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';


const Header = () => {
  return (
    <div className='header'>
        <div className='container'>
            <Link to="/"><h1><i className="bi bi-journal"></i> Notes</h1></Link>
            <nav>
                <Link to="/login">Get Started</Link>
                <button type='button'>Logout</button>
            </nav>
        </div>
    </div>
  )
}

export default Header