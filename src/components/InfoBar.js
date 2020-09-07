import React from "react";
import {useDispatch, useSelector} from "react-redux";
import "./InfoBar.css"
import {leaveRoom} from "../store/rooms/actions";
import io from "socket.io-client";

const socket = io();

export const InfoBar = () => {
    const room = useSelector(state => state.room.selectedRoom)
    const dispatch = useDispatch()

    const handleLeaveRoom = () => {
        dispatch(leaveRoom(null))
        socket.emit('disconnect')
    }

    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <i className="material-icons">check_circle</i>
                <span>{room.name}</span>
            </div>
            <div className="rightInnerContainer">
                <i onClick={handleLeaveRoom} style={{cursor: "pointer"}} className="material-icons">clear</i>
            </div>
        </div>
    )
}