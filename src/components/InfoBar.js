import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./InfoBar.css"
import {leaveRoom} from "../store/rooms/actions";
import io from "socket.io-client";
import {useHttp} from "../hooks/http.hook";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const socket = io();

export const InfoBar = ({roomUsers}) => {
    const {request} = useHttp()
    const room = useSelector(state => state.room.selectedRoom)
    const dispatch = useDispatch()

    const handleLeaveRoom = () => {
        dispatch(leaveRoom(null))
        socket.emit('disconnect')
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


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
                <span style={{fontSize: 21}}>{room.name}</span>
                <button className="waves-effect waves-light btn" style={{marginLeft: 10}} onClick={handleClear}>Clear
                    Messages
                </button>
            </div>
            <div className="rightInnerContainer">
                <button className="waves-effect waves-light btn" aria-controls="simple-menu"
                        aria-haspopup="true" onClick={handleClick}>
                    Users
                </button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {roomUsers.length !== 0 ? roomUsers.map(user => {
                        return <MenuItem onClick={handleClose} key={user.id}><span
                        >{user.username}</span></MenuItem>
                    }) : "You haven`t created any rooms"}
                </Menu>
                <i onClick={handleLeaveRoom} style={{cursor: "pointer"}} className="material-icons">clear</i>
            </div>
        </div>
    )
}