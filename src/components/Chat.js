import React, {useCallback, useEffect, useState} from "react";
import io from "socket.io-client"
import {useSelector} from "react-redux";
import Modal from "./Modal";
import {InfoBar} from './InfoBar'
import './Chat.css'
import './Input.css'
import Messages from "./Messages";
import {useHttp} from "../hooks/http.hook";

const moment = require('moment')

const socket = io();

export const Chat = () => {
    const [message, setMessage] = useState('')
    const [sysMessages, setSysMessages] = useState([])
    const [roomUsers, setRoomUsers] = useState([])
    const [messageTracking, setMessageTracking] = useState([])
    const {request} = useHttp()

    const selectedRoom = useSelector(state => state.room.selectedRoom)
    const user = useSelector(state => state.user.currentUser)

    const getName = useCallback(() => {
        if (selectedRoom && user) {
            let username = user.name
            let room = selectedRoom.name
            let roomId = selectedRoom._id
            socket.emit('joinRoom', {username, room, roomId})
        }
    }, [selectedRoom, user])


    useEffect(() => {
        getName()
        socket.on('roomUsers', ({users}) => {
            setRoomUsers(users)
        })
    }, [getName])

    const saveData = useCallback((msg) => {
        setSysMessages([...sysMessages, msg])
    }, [sysMessages])

    useEffect(() => {
        socket.on('message', (message) => {
            saveData(message)
            setMessage('')
        })
    }, [saveData])


    const getMessages = useCallback(async () => {
        try {
            const data = await request(`/api/message/${selectedRoom._id}`, 'GET', null)
            setMessageTracking(data)
        } catch (e) {
        }
    }, [request, selectedRoom])

    useEffect(() => {
        getMessages()
    }, [getMessages])


    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('chatMessage', message)
        apiSendMessage(message)
    }

    const apiSendMessage = async (msg) => {
        try {
            await request('/api/message/', 'POST',
                {text: msg, room: selectedRoom._id, user: user.name, time: moment().format('h:mm a')})
        } catch (e) {
        }
    }


    const handleChange = (e) => {
        setMessage(e.target.value)
    }


    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "left",
                marginTop: 50
            }} className="container">
                <Modal/>
            </div>
            {
                selectedRoom
                    ? <div className="outerContainer">
                        <div className="container_css">
                            <InfoBar roomUsers={roomUsers}/>
                            {sysMessages &&
                            <Messages
                                botMessage={sysMessages}
                                messageData={messageTracking}
                            />}
                            <form className="form">
                                <input
                                    style={{color: "white"}}
                                    type="text"
                                    placeholder="Type a message..."
                                    value={message}
                                    onChange={(e) => handleChange(e)}
                                    onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                                />
                                <button className="sendButton" type="submit" onClick={e => sendMessage(e)}>Send</button>
                            </form>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}