import  { LOGIN_USER, LOGOUT_USER } from "./consts";

export const logInUser = (user) => {
    return {
        type: LOGIN_USER,
        payload: user
    }
}
export const logOutUser = (user) => {
    return {
        type: LOGOUT_USER,
        payload: user
    }
}