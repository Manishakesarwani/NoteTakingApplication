import { useState } from "react";
import { useNotesContext } from "./useNotesContext"
import { useUserAuthenticateContext } from "./useUserAuthenticateContext";
import { toast } from 'react-toastify';

export const useNoteRemove = () => {
    const {dispatch} = useNotesContext();
    const [loading, setLoading] = useState(false);
    const {user} = useUserAuthenticateContext();

    const handleDeleteNote = async(id) =>{
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/remove-note/${id}`,{
            method: "delete",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(!response.ok){
            toast.error(json.error, {
                toastId: "Notes-Remove-Error"
            });
            setLoading(false);
        }
        if(response.ok){
            setLoading(false);
            toast.success("Note removed successfully!", {
                toastId: "Notes-Remove-Success"
            });
            dispatch({type: "DELETE", payload: json});
        }
    }

  return {loading, handleDeleteNote}
}
