import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

import './Messages.css';

const Messages = ({messageData}) => {
    console.log(messageData)
    return (
        <ScrollToBottom className="messages">
            {messageData.map((message, i) => <div key={i}><Message time={message.time} message={message.text}
                                                                user={message.user}/>
            </div>)}
        </ScrollToBottom>
    )
};

export default Messages;