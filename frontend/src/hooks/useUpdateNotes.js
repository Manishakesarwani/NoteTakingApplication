import { useState } from "react";
import { useNotesContext } from "./useNotesContext"
import { useUserAuthenticateContext } from "./useUserAuthenticateContext";
import { toast } from 'react-toastify';

export const useUpdateNotes = () => {

    const {dispatch} = useNotesContext();
    const [loading, setLoading] = useState(false);
    const {user} = useUserAuthenticateContext();

    const handleUpdateNotes = async(id, newCategory, setNoteComp) =>{
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/update-note/category/${id}`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body:JSON.stringify({
                category: newCategory
            })
        });

        const json = await response.json();

        if(!response.ok){
            toast.error(json.error, {
                toastId: "Notes-CategoryUpdate-Error"
            });
            setLoading(false);
        }
        if(response.ok){
            setLoading(false);
            toast.success("Category Updated Successfully!", {
                toastId: "Notes-CategoryUpdate-Success"
            });
            dispatch({type: "UPDATE_CATEGORY", payload: json});
            setNoteComp((prev)=>({...prev, category: newCategory}));
        }
    }

  return {loading, handleUpdateNotes}
}
