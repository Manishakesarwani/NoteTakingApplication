import { useState } from "react"
import { useUserAuthenticateContext } from "./useUserAuthenticateContext";
import { toast } from "react-toastify";

export const useRenameCategory = () => {

    const [loading, setLoading] = useState(false);
    const {user} = useUserAuthenticateContext();

    const handleRenameCategory = async(id, category) => {
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/rename/${id}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({
                "category": category
            })
        });

        const json = await response.json();

        if(!response.ok){
            toast.error(json.error, {
                toastId: "Category-rename-error"
            });
            setLoading(false);
            return false;
        }
        if(response.ok){
            setLoading(false);
            toast.success("Category Updated Successfully!",{
                toastId: "Category-rename-success"
            });
            return true;
        }
    }

  return {loading, handleRenameCategory}
}
