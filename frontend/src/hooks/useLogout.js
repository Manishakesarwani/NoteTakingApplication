import { useUserAuthenticateContext } from "./useUserAuthenticateContext"

const useLogout = () => {

    const {dispatch} = useUserAuthenticateContext();

    const logoutUser = () => {
        localStorage.removeItem("user");

        dispatch({type: "LOGOUT"});
    }
  return {logoutUser}
}

export default useLogout