import { useState } from "react"

const useResendOtp = () => {

    const [errorRo, setErrorRo] = useState("");
    const [loadingRo, setLoadingRo] = useState(false);
    const [successRo, setSuccessRo] = useState(false);

    const ResendOTP = async(email) => {
        setErrorRo("");
        setLoadingRo(true);
        setSuccessRo(false);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/resend-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email
            })
        });

        const json = await response.json();

        if(!response.ok){
            setErrorRo(json.error);
            setLoadingRo(false);
            setSuccessRo(false);
        }
        if(response.ok){
            setErrorRo("");
            setLoadingRo(false);
            setSuccessRo(true);
        }
    }


  return {errorRo, loadingRo, successRo, ResendOTP}
}

export default useResendOtp