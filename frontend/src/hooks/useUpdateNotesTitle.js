import { useState } from "react";
import { useNotesContext } from "./useNotesContext"
import { useUserAuthenticateContext } from "./useUserAuthenticateContext";
import { toast } from 'react-toastify';

export const useUpdateNotesTitle = () => {
    const {dispatch} = useNotesContext();
    const [loading, setLoading] = useState(false);
    const {user} = useUserAuthenticateContext();

    const handleUpdateNotes = async(id, newTitle, setNoteComp) =>{
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/update-note/title/${id}`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body:JSON.stringify({
                title: newTitle
            })
        });

        const json = await response.json();

        if(!response.ok){
            toast.error(json.error, {
                toastId: "Notes-TitleUpdate-Error"
            });
            setLoading(false);
        }
        if(response.ok){
            setLoading(false);
            toast.success("Title Updated Successfully!", {
                toastId: "Notes-TitleUpdate-Success"
            });
            dispatch({type: "UPDATE_TITLE", payload: json});
            setNoteComp((prev)=>({...prev, title: newTitle}));
        }
    }

  return {loading, handleUpdateNotes}
}
