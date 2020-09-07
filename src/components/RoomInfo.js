import React from "react";
import "./RoomInfo.css"

export const RoomInfo = ({roomUsers, currentRoom}) => {

    return (
        <>
            {roomUsers
                ? <ul className="roomUsers">
                    <li ><h4>{currentRoom}</h4></li>
                    <span>Users: </span>
                    {roomUsers.map(user => {
                        return <li key={user.id} className="listItem" >{user.username}</li>
                    })}

                </ul>
                : null}
        </>
    )
}