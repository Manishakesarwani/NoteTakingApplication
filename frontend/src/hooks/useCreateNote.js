import { useState } from "react";
import { useNotesContext } from "./useNotesContext"
import { useUserAuthenticateContext } from "./useUserAuthenticateContext";
import { toast } from 'react-toastify';


const useCreateNote = () => {

    const {dispatch} = useNotesContext();
    const [loading, setLoading] = useState(false);
    const {user} = useUserAuthenticateContext();

    const createNote = async(category, title, content) =>{
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/create-note`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({
                category: category,
                title: title,
                content: content
            })
        });

        const json = await response.json();

        if(!response.ok){
            toast.error(json.error, {
                toastId: "Note-Creation-error"
            });
            setLoading(false);
        }
        if(response.ok){
            setLoading(false);
            dispatch({type: "ADD", payload: json});
            toast.success("Note Created Successfully!", {
                toastId: "Note-Creation-Completion"
            });
        }
    }

  return {loading, createNote}
}

export default useCreateNote