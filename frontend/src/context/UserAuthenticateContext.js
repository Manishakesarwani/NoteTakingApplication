import { createContext, useEffect, useReducer } from "react";

export const UserAuthenticateContext = createContext();


export const UserAuthenticateReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return{
                user: action.payload
            }
        case "LOGOUT":
            return{
                user: null
            }
        default:
            return state

    }
}

export const UserAuthenticateContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(UserAuthenticateReducer, {
        user: null
    });

    useEffect(()=>{

        const handleJwtExpiration = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user || !user.token){
            return;
        }
        
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/get-all-notes`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if(response.status === 401){
                localStorage.removeItem("user");
                dispatch({type: "LOGOUT"});
            }
            else{
                dispatch({type: "LOGIN", payload: user});
            }
        }
        catch(err){
            console.error("Auth check failed:", err);
            // Optional: handle network errors by logging out safely
            dispatch({ type: "LOGOUT" });
        }
    }
        handleJwtExpiration();

        // const user = JSON.parse(localStorage.getItem("user"));
        // if(user){
        //     dispatch({type: "LOGIN", payload: user});
        // }
    }, []);

    return (
        <UserAuthenticateContext.Provider value={{...state, dispatch}}>

            {children}

        </UserAuthenticateContext.Provider>
    )
}