import { LOGIN_USER, LOGOUT_USER } from "./consts";

const initialState = {
    currentUser: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default :
            return state;
    }
}

export default userReducer