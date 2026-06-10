import { useState } from "react";
import { useNotesContext } from "./useNotesContext"
import { useUserAuthenticateContext } from "./useUserAuthenticateContext";
import { toast } from 'react-toastify';

export const useUpdateNotesContent = () => {
    const {dispatch} = useNotesContext();
    const [loading, setLoading] = useState(false);
    const {user} = useUserAuthenticateContext();

    const handleUpdateNotes = async(id, newContent, setNoteComp) =>{
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/update-note/content/${id}`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body:JSON.stringify({
                content: newContent
            })
        });

        const json = await response.json();

        if(!response.ok){
            toast.error(json.error, {
                toastId: "Notes-ContentUpdate-Error"
            });
            setLoading(false);
        }
        if(response.ok){
            setLoading(false);
            toast.success("Content Updated Successfully!", {
                toastId: "Notes-ContentUpdate-Success"
            });
            dispatch({type: "UPDATE_CONTENT", payload: json});
            setNoteComp((prev)=>({...prev, content: newContent}));
        }
    }

  return {loading, handleUpdateNotes}
}
