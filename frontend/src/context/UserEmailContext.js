import { createContext, useEffect, useReducer } from "react";

export const UserEmailContext = createContext();

export const UserEmailContextReducer = (state, action) => {
    switch(action.type){
        case "SET":
            return {
                user_email: action.payload
            }
        default:
            return state
    }
} 

export const UserEmailContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(UserEmailContextReducer, {
        user_email: null
    });

    useEffect(()=>{
        const user_email = JSON.parse(localStorage.getItem("user"));

        if(user_email){
            dispatch({type:"SET", payload: user_email.email});
        }
    }, []);


    return (
        <UserEmailContext.Provider value={{...state, dispatch}}>
            {children}
        </UserEmailContext.Provider>
    )
}