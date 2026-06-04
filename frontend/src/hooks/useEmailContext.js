import { useContext } from "react"
import { UserEmailContext } from "../context/UserEmailContext"

export const useEmailContext = () => {
    const EmailContext = useContext(UserEmailContext);

    if(!EmailContext){
        throw Error("useEmailContext should come under UserEmailContextProvider.")
    }
    return EmailContext;
}