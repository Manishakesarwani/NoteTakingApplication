import { useContext } from "react"
import { UserAuthenticateContext } from "../context/UserAuthenticateContext"

export const useUserAuthenticateContext = () => {
  const Context = useContext(UserAuthenticateContext);

  if(!Context){
    throw Error("The useUserAuthenticateContext should be under UserAuthenticateContextProvider.");
  }
  return Context;
}
