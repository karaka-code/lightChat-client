import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {logOutUser} from "../store/user/actions";
import {useMessage} from "../hooks/message.hook";
import {Link} from "react-router-dom";
import "./NavBarStyles.css"
import {useHttp} from "../hooks/http.hook";
import {selectRoom} from "../store/rooms/actions";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const NavBar = () => {
    const dispatch = useDispatch()
    const message = useMessage()
    const {request} = useHttp()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [rooms, setRooms] = useState([])

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logOutUser(null))
        message("User logged out")
    }

    const fetchRooms = useCallback(async () => {
        try {
            const fetched = await request(`/api/room/`, 'GET', null)
            setRooms(fetched)
        } catch (e) {
        }
    }, [request])

    const handleSelectRoom = (room) => {
        dispatch(selectRoom(room))
    }

    useEffect(() => {
        fetchRooms()
    }, [fetchRooms])


    return (
        <nav>
            <div className="nav-wrapper">
                <span className="left brand-logo"><Link to="/">LightChat</Link></span>
                <ul className="right">
                    <button
                        className="btn"
                    >
                        <Link to="/chat">Chat</Link>
                    </button>
                    <button className="waves-effect waves-light btn" aria-controls="simple-menu"
                            aria-haspopup="true" onClick={handleClick}>
                        Rooms
                    </button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {rooms ? rooms.map((room, index) => {
                            return <MenuItem onClick={handleClose} key={index}><span
                                onClick={() => handleSelectRoom(room)}
                            >{room.name}</span></MenuItem>
                        }) : "You haven`t created any rooms"}
                    </Menu>
                    <button
                        style={{marginRight: 10, marginLeft: 10}}
                        className="btn"
                    >
                        <Link to="/search">Search friends</Link>
                    </button>
                    <button
                        style={{marginRight: 10, marginLeft: 10}}
                        onClick={handleLogout}
                        className="btn"
                    >
                        Logout
                    </button>

                    <button
                        style={{marginRight: 10, marginLeft: 10}}
                        className="btn"
                    >
                        <Link to="/profile">Profile</Link>
                    </button>
                </ul>
            </div>
        </nav>
    )
}


export default NavBar