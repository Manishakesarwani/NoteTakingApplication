import { useState } from "react"

export const useVerifyOTP = () => {

    const [isNewUser, setIsNewUser] = useState("");
    const [verifyOTPError, setVerifyOTPError] = useState("");
    const [verifyOTP, setVerifyOTP] = useState(false);
    const [isVerified, setIsVerified] = useState(false);


    const verifyUserViaOTP = async (email, otp) => {

        setVerifyOTPError("");
        setVerifyOTP(true);
        setIsVerified(false);


        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/verify-otp`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "otp": otp
            })
        });

        const json = await response.json();

        if(!response.ok){
            setVerifyOTPError(json.error);
            setVerifyOTP(false);
            setIsVerified(false);
        }
        if(response.ok){
            setVerifyOTPError("");
            setVerifyOTP(false);
            setIsVerified(true);
            setIsNewUser(json.isNewUser);
        }

    }

  return {isNewUser, verifyOTPError, verifyOTP, isVerified, verifyUserViaOTP}
}

