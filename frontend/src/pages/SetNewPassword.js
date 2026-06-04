import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import useForgotPassword from "../hooks/useForgotPassword";
import { useLocation, useNavigate } from "react-router-dom";

const SetNewPassword = () => {

    const location = useLocation();
    const navigation=useNavigate();

    const email=location.state?.email;
    const isNewUser = location.state?.isNewUser;

    const {loadingFP, errorFP, successFP, updatePassword} = useForgotPassword();

    const [newPassword, setNewPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");

    const handleUpdatePassword = async(e) =>{
        e.preventDefault();
        await updatePassword(email, newPassword, cnfPassword);
        setNewPassword("");
        setCnfPassword("");
    }

    useEffect(()=>{

        if(errorFP && !isNewUser){
            toast.error(errorFP);
        }

        if(successFP && !isNewUser){
            toast.success("Password Updated Successfully. Please login now!");
            navigation(-1);
        }

        // eslint-disable-next-line
    },[errorFP, successFP])

  return (
    <div className="container">
        <div className="box">
            <form onSubmit={handleUpdatePassword} className={successFP ? "disabled_form" : "form"}>
            <fieldset disabled={successFP}>
            <div>
                <label htmlFor="new_password">Set new Password</label>
                <input type="password" name="new_password" id="new_password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="Please mention new Password." />
            </div>
            <div>
                <label htmlFor="cnf_password">Confirm new Password</label>
                <input type="password" name="cnf_password" id="cnf_password" value={cnfPassword} onChange={(e)=>setCnfPassword(e.target.value)} placeholder="Please confirm new Password." />
            </div>
            <div>
                <button type="submit" disabled={loadingFP}>{loadingFP ? "Updating..." : "Update Password"}</button>
            </div>
            </fieldset>
        </form>
        </div>
    </div>
  )
}

export default SetNewPassword