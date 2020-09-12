import {ADD_FRIEND, DELETE_FRIEND} from "./consts";

const initialState = {
    friends: []
}

const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FRIEND:
            return {
                ...state,
                friends: [...state.friends, {...action.payload}]

            }
        case DELETE_FRIEND:
            return {
                ...state,
                friends: state.friends.filter((friend) => friend._id !== action.payload._id)
            }
        default :
            return state;
    }
}

export default friendReducer