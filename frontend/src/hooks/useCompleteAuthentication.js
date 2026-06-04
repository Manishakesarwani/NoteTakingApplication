import { useState } from "react"
import { useUserAuthenticateContext } from '../hooks/useUserAuthenticateContext'

const useCompleteAuthentication = () => {

  const {dispatch} = useUserAuthenticateContext();

  const [authenticationError, setAuthenticationError] = useState("");
  const [loading, setLoading] = useState(false);

  const [authenticationSuccess, setAuthenticationSuccess] = useState(false);

  const handleAuthentication = async (email, password) => {
    setAuthenticationError("");
    setLoading(true);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/authentication`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    });

    const json = await response.json();

    if(!response.ok){
      setAuthenticationError(json.error);
      setLoading(false);
      setAuthenticationSuccess(false);
    }

    if(response.ok){
      setAuthenticationError("");
      setLoading(false);
      setAuthenticationSuccess(true);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({type: "LOGIN", payload: json});
    }

  }



  return {authenticationError, loading, authenticationSuccess, handleAuthentication}
}

export default useCompleteAuthentication