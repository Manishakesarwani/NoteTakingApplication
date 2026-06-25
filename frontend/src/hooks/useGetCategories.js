import { useState } from "react"
import { useUserAuthenticateContext } from "./useUserAuthenticateContext";

export const useGetCategories = () => {

    const {user} = useUserAuthenticateContext();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCategoryDropDown = async() => {
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/get-all-categories`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(response.ok){
            setCategories(json);
            setLoading(false);
        }
        if(!response.ok){
            setCategories([]);
            setLoading(false);
        }
    }
  return {categories, loading, handleCategoryDropDown}
}
