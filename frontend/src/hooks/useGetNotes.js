import { useState } from "react";
import { useNotesContext } from "./useNotesContext"
import { toast } from 'react-toastify';
import { useUserAuthenticateContext } from "./useUserAuthenticateContext";

export const useGetNotes = () => {

    const {dispatch} = useNotesContext();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const {user} = useUserAuthenticateContext();

    const handleGetNotes = async() => {
        setError("");
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/get-all-notes`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setLoading(false);
        }

        if(response.ok){
            setError("");
            setLoading(false);

            dispatch({type: "GET", payload: json});
            toast.success("All the notes loaded successfully.", {
                toastId: "Notes-Fetched"
            });
            // console.log(json);
        }
    }

  return {error, loading, handleGetNotes}
}
