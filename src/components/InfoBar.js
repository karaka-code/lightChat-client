import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./InfoBar.css"
import {leaveRoom} from "../store/rooms/actions";
import io from "socket.io-client";
import {useHttp} from "../hooks/http.hook";

const socket = io();

export const InfoBar = () => {
    const {request} = useHttp()
    const room = useSelector(state => state.room.selectedRoom)
    const dispatch = useDispatch()

    const handleLeaveRoom = () => {
        dispatch(leaveRoom(null))
        socket.emit('disconnect')
    }

    const apiDeleteCollection = useCallback(async () => {
        try {
            await request(`/api/message/${room._id}`, 'DELETE', null)
        } catch (e) {
        }
    }, [request, room._id])

    const handleClear = useCallback(() => {
        apiDeleteCollection()
    }, [apiDeleteCollection])

    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <i className="material-icons">check_circle</i>
                <span>{room.name}</span>
                <button className="waves-effect waves-light btn" onClick={handleClear}>Clear Messages</button>
            </div>
            <div className="rightInnerContainer">
                <i onClick={handleLeaveRoom} style={{cursor: "pointer"}} className="material-icons">clear</i>
            </div>
        </div>
    )
}