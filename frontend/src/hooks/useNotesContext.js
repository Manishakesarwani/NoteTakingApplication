import { useContext } from "react"
import { NotesContext } from "../context/NotesContext"

export const useNotesContext = () => {
    const useNotesContextProvider = useContext(NotesContext);

    if(!useNotesContextProvider){
        throw Error("useNotesContext should come under the NotesContextProvider.");
    }
    return useNotesContextProvider;
}