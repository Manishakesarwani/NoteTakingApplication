import { createContext, useReducer } from "react";

export const NotesContext = createContext();

export const NotesContextReducer = (state, action) => {
    switch(action.type){
        case "ADD":
            return{
                notes: [action.payload, ...(state.notes || [])]
            }
        case "UPDATE_CONTENT":
            return{
                ...state,
                notes: state.notes.map((note)=> (note._id === action.payload._id) ? {...note, Content: action.payload.Content} : note)
            }
        case "UPDATE_TITLE":
            return{
                ...state,
                notes: state.notes.map((note)=> (note._id === action.payload._id) ? {...note, Title: action.payload.Title} : note)
            }
        case "UPDATE_CATEGORY":
            return{
                ...state,
                notes: state.notes.map((note)=> (note._id === action.payload._id) ? {...note, Category: action.payload.Category} : note)
            }
        case "GET":
            return {
                notes: action.payload
            }
        default:
            return state;
    }
}

export const NotesContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(NotesContextReducer, {
        notes: []
    });

    return (
        <NotesContext.Provider value={{...state, dispatch}}>
            {children}
        </NotesContext.Provider>
    )
}