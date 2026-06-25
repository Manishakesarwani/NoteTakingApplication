import { useState } from "react"
import { useUserAuthenticateContext } from "./useUserAuthenticateContext";
import { toast } from 'react-toastify';


export const useCategoryRemove = () => {

    const [loading, setLoading] = useState(false);
    const {user} = useUserAuthenticateContext();

    const handleDeleteCategoryApi = async(id)=>{
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/remove/${id}`,{
            method: "delete",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        
        if(!response.ok){
            toast.error(json.error, {
                toastId: "Category-Remove-Error"
            });
            setLoading(false);
        }
        if(response.ok){
            setLoading(false);
            toast.success("Category removed successfully!", {
                toastId: "Category-Remove-Success"
            });
            // dispatch({type: "DELETE", payload: json});
            // console.log("removed note: ", json);
        }
    }
  return {loading, handleDeleteCategoryApi}
}
