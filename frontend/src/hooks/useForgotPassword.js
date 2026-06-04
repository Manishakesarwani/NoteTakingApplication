import { useState } from "react"

const useForgotPassword = () => {

    const [loadingFP, setLoadingFP] = useState(false);
    const [errorFP, setErrorFP] = useState("");
    const [successFP, setSuccessFP] = useState(false);

    const updatePassword = async(email, n_password, cnf_password) => {
        setLoadingFP(true);
        setErrorFP("");
        setSuccessFP(false);

        // console.log(email);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/forgot-password`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                n_password: n_password,
                cnf_password: cnf_password
            })
        });

        const json = await response.json();

        if(!response.ok){
            setLoadingFP(false);
            setErrorFP(json.error);
            setSuccessFP(false);
        }
        if(response.ok){
            setLoadingFP(false);
            setErrorFP("");
            setSuccessFP(true);
        }
    }

  return {loadingFP, errorFP, successFP, updatePassword}
}

export default useForgotPassword