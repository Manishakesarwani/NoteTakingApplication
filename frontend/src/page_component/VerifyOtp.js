import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const VerifyOtp = ({email, verifyUserViaOTP, verifyOTPError, verifyOTP, isVerified}) => {

    const [otp, setOTP] = useState("");

    const handleOTPVerification = async(e) => {
        e.preventDefault();

        await verifyUserViaOTP(email, otp);

        // setOTP("");

    }

    useEffect(()=>{
        if(verifyOTPError){
            toast.error(verifyOTPError);
        }
        if(isVerified){
            toast.success("User-Verfied Successfully!");
        }
    }, [verifyOTPError, isVerified]);

  return (
    <div className="comp2">
        <form onSubmit={handleOTPVerification}>
            <fieldset disabled={isVerified} className={isVerified ? "disabled_form" : "form"}>
            <div>
                <label htmlFor="otp">One Time Password</label>
                <input type="text" placeholder="Please mention 6 digit OTP." id="otp" name="otp" value={otp} onChange={(e)=>setOTP(e.target.value)} />
            </div>
            <div>
                <button type="submit" disabled={verifyOTP}>{verifyOTP ? "Verifying..." : "Verify OTP"}</button>
            </div>
            </fieldset>
        </form>
    </div>
  )
}

export default VerifyOtp