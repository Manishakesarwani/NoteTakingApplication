import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

const RequestOtp = ({error, generateOtp, generateUserOTP, isSuccess}) => {

    const [email, setEmail] = useState("");

    const handleRequestOtp = async (e) => {
        e.preventDefault();

        await generateUserOTP(email);
        // setEmail("");
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
        }
        if(isSuccess){
            toast.success("OTP-Sent Successfully!")
        }
    }, [error, isSuccess]);

  return (
    <div className="comp1">
        <form onSubmit={handleRequestOtp} className={isSuccess ? "disabled_form" : "form"}>
            <fieldset disabled={isSuccess}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Please mention you email." id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <button type="submit" disabled={generateOtp}>{generateOtp ? "Generating..." : "Get OTP"}</button>
            </div>
            </fieldset>
        </form>
    </div>
  )
}

export default RequestOtp