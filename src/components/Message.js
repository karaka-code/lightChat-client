import React from 'react';

import './Message.css';

const Message = ({message, user, time}) => {

    return (
        <>
            {
                <div className="messageContainer justifyEnd">
                    <p style={{color: "white"}} className="sentText pr-10">{user}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{message}</p>
                    </div>
                    <p style={{color: "white", marginLeft: 10}} className="sentText pr-10">{time}</p>
                </div>
            }
        </>
    );
}

export default Message;