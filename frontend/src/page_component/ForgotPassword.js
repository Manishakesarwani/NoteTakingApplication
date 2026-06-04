import { Link } from 'react-router-dom'

const ForgotPassword = ({email, isNewUser}) => {

  return (
    <div>
        <Link to="/forgot-password" state={{email, isNewUser}}>Forgot Password?</Link>
    </div>
  )
}

export default ForgotPassword