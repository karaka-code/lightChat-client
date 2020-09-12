import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {logOutUser} from "../store/user/actions";
import {useMessage} from "../hooks/message.hook";
import {Link} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import "./NavBarStyles.css"
import {useHttp} from "../hooks/http.hook";
import {selectRoom} from "../store/rooms/actions";


const NavBar = () => {
    const dispatch = useDispatch()
    const message = useMessage()
    const {request} = useHttp()

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
                <ul className="right" style={{display: "flex", alignItems: "center"}}>
                    <button
                        style={{marginRight: 10, marginLeft: 10}}
                        className="btn"
                    >
                        <Link to="/chat">Chat</Link>
                    </button>
                    <Dropdown style={{marginRight: 20}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Rooms
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {rooms ? rooms.map((room, index) => {
                                return <Dropdown.Item onClick={() => handleSelectRoom(room)}
                                                      key={index}>{room.name}</Dropdown.Item>
                            }) : "You haven`t created any rooms"}
                        </Dropdown.Menu>
                    </Dropdown>
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