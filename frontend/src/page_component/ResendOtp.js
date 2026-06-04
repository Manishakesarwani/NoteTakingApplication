import { useEffect, useState } from "react";
import useResendOtp from "../hooks/useResendOtp";
import { toast } from "react-toastify";

const ResendOtp = ({email, isSuccess, isVerified}) => {

    const {errorRo, loadingRo, successRo, ResendOTP} = useResendOtp();
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(()=>{
        if(timeLeft<=0){
            return;
        }
        const timer = setInterval(()=>{
            setTimeLeft((prev)=>prev-1);
        }, 1000);

        return ()=>clearInterval(timer);
    }, [timeLeft]);

    const handleResendOTP = async(e) => {
        e.preventDefault();
        await ResendOTP(email);
        setTimeLeft(30);
    }

    useEffect(()=>{

        if(errorRo && isSuccess){
            toast.error(errorRo);
        }

        if(successRo && isSuccess){
            toast.success("OTP sent Successfully!");
        }


        // eslint-disable-next-line
    },[errorRo, successRo, isSuccess]);

    const isButtonDisabled = loadingRo || timeLeft>0;

  return (
    <div className="resent-otp">
        <div className={isVerified ? "disabled_form" : isButtonDisabled ? "disabled" : "form"}>

            <button type="button" onClick={handleResendOTP} disabled={isButtonDisabled}>{loadingRo ? "Sending..." : timeLeft > 0 ? `Resend OTP (${timeLeft} sec)` : "Resend OTP"}</button>

        </div>
    </div>
  )
}

export default ResendOtp