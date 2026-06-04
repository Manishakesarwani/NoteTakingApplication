import { useState } from "react";
import { useEmailContext } from "./useEmailContext";


export const useRequestOTP = () => {

    const {dispatch} = useEmailContext();

 const [exists, setExists] = useState(false);
 const [error, setError] = useState("");
 const [generateOtp, setGenerateOtp] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);

 const generateUserOTP = async (email) => {
    setError("");
    setGenerateOtp(true);
    setIsSuccess(false);
    setExists(false);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/request-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email
        })
    });

    const json = await response.json();

    console.log(json);


    if(!response.ok){
        setError(json.error);
        setGenerateOtp(false);
        setIsSuccess(false);
        setExists(false);
        
    }
    if(response.ok){
        setError("");
        setGenerateOtp(false);
        setExists(json.exists);
        setIsSuccess(true);
        dispatch({type: "SET", payload: email});
        
    }
 }

 return {exists, isSuccess, error, generateOtp, generateUserOTP}
  
}

