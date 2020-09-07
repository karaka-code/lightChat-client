import  { SELECT_ROOM, LEAVE_ROOM } from "./consts";

export const selectRoom = (room) => {
    return {
        type: SELECT_ROOM,
        payload: room
    }
}
export const leaveRoom = (room) => {
    return {
        type: LEAVE_ROOM,
        payload: room
    }
}