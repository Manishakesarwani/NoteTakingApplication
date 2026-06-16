import { useState } from "react";
import { useNotesContext } from "./useNotesContext"
import { toast } from 'react-toastify';
import { useUserAuthenticateContext } from "./useUserAuthenticateContext";

export const useGetNotes = () => {

    const {dispatch} = useNotesContext();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const {user} = useUserAuthenticateContext();

    const handleGetNotes = async(CategoryID) => {
        setError("");
        setLoading(true);

        // console.log(CategoryID);

        let url= (CategoryID === "") ? `${process.env.REACT_APP_BACKEND_URL}/notes/get-all-notes` : `${process.env.REACT_APP_BACKEND_URL}/categories/get-category-notes/${CategoryID}`;

        const response = await fetch(url,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        // console.log(json);

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
