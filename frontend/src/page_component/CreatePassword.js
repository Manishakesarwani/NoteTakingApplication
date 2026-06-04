import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const CreatePassword = ({email, authenticationError, loading, authenticationSuccess, handleAuthentication, isNewUser}) => {

    const [password, setPassword] = useState("");

    const handlePasswordCreation = async (e) => {
        e.preventDefault();

        await handleAuthentication(email, password);
        setPassword("");
    }

    useEffect(()=>{
        if(authenticationError && isNewUser){
            toast.error(authenticationError);
        }
        if(authenticationSuccess && isNewUser){
            toast.success("User Registered Successfully!");
        }
        // eslint-disable-next-line
    }, [authenticationError, authenticationSuccess]);

  return (
    <div className="comp3">
        <form onSubmit={handlePasswordCreation} className={authenticationSuccess ? "disabled_form" : "form"}>
            <fieldset disabled={authenticationSuccess}>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Please set password." />
            </div>
            <div>
                <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign-in"}</button>
            </div>
            </fieldset>
        </form>
    </div>
  )
}

export default CreatePassword