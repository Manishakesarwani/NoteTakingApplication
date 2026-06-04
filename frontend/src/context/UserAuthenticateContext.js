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

        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            dispatch({type: "LOGIN", payload: user});
        }
    }, []);

    return (
        <UserAuthenticateContext.Provider value={{...state, dispatch}}>

            {children}

        </UserAuthenticateContext.Provider>
    )
}