import { SELECT_ROOM, LEAVE_ROOM } from "./consts";

const initialState = {
    selectedRoom: null
}

const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_ROOM:
            return {
                ...state,
                selectedRoom: action.payload
            }
        case LEAVE_ROOM:
            return {
                ...state,
                selectedRoom: action.payload
            }
        default :
            return state;
    }
}

export default roomReducer