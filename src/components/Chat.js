import React, {useCallback, useEffect, useState} from "react";
import io from "socket.io-client"
import {useSelector} from "react-redux";
import {Modal} from "./Modal";
import {InfoBar} from './InfoBar'
import './Chat.css'
import './Input.css'
import Messages from "./Messages";
import {RoomInfo} from "./RoomInfo";
import {useHttp} from "../hooks/http.hook";

const moment = require('moment')

const socket = io();

export const Chat = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [messageData, setMessageData] = useState([])
    const [roomUsers, setRoomUsers] = useState([])
    const [currentRoom, setCurrentRoom] = useState('')
    const {request} = useHttp()

    const selectedRoom = useSelector(state => state.room.selectedRoom)
    const user = useSelector(state => state.user.currentUser)

    const getName = useCallback(() => {
        if (selectedRoom && user) {
            let username = user.name
            let room = selectedRoom.name
            socket.emit('joinRoom', {username, room})
        }
    }, [selectedRoom, user])

    useEffect(() => {
        getName()
        socket.on('roomUsers', ({room, users}) => {
            setRoomUsers(users)
            setCurrentRoom(room)
        })
    }, [getName])

    const saveData = useCallback((msg) => {
        setMessageData([...messageData, msg])
    }, [messageData])

    useEffect(() => {
        socket.on('message', (message) => {
            saveData(message)
            setMessages([...messages, message.text])
            setMessage('')
        })
    }, [messages, saveData])


    const getMessages = useCallback(async () => {
        try {
            const data = await request(`/api/message/${selectedRoom._id}`, 'GET', null)
            setMessageData(data)
        } catch (e) {
        }
    }, [request, selectedRoom])

    useEffect(() => {
        getMessages()
    }, [getMessages])



    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('chatMessage', message)
        fetchMessage(message)
    }

    const fetchMessage = async () => {
        try {
            await request('/api/message/', 'POST',
                {text: message, room: selectedRoom._id, user: user.name, time: moment().format('h:mm a')})
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
                            <InfoBar/>
                            {messageData &&
                            <Messages
                                messageData={messageData}
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
                        <div className="info_container">
                            <RoomInfo roomUsers={roomUsers} currentRoom={currentRoom}/>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}