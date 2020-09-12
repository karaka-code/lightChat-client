import  { ADD_FRIEND, DELETE_FRIEND } from "./consts";

export const addFriend = (friend) => {
    return {
        type: ADD_FRIEND,
        payload: friend
    }
}

export const deleteFriend = (friend) => {
    return {
        type: DELETE_FRIEND,
        payload: friend
    }
}