import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const EnterPassword = ({email, authenticationError, loading, authenticationSuccess, handleAuthentication, isNewUser}) => {

    const [password, setPassword] = useState("");

    const handleVerifyPassword = async(e) => {
        e.preventDefault();

        await handleAuthentication(email, password);
        setPassword("");
    }

    useEffect(()=>{
        if(authenticationError && !isNewUser){
            toast.error(authenticationError);
        }
        if(authenticationSuccess && !isNewUser){
            toast.success("User LoggedIn Successfully!");
        }
        // eslint-disable-next-line
    }, [authenticationError, authenticationSuccess])
    

  return (
    <div className="comp4">
        <form onSubmit={handleVerifyPassword} className={authenticationSuccess ? "disabled_form" : "form"}>
            <fieldset disabled={authenticationSuccess}>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Please mention Password." />
            </div>
            <div>
                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            </div>
            </fieldset>
        </form>
    </div>
  )
}

export default EnterPassword