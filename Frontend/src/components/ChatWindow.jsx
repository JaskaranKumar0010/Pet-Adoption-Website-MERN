// src/components/ChatWindow.js
import React, { useState } from 'react';
import './styles/ChatWindow.css';

const ChatWindow = ({ isEnabled }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'user', text: input }]);
      setInput('');
      // Add code here to send the message to the server
    }
  };

  return (
    <div className={`chat-window ${isEnabled ? '' : 'disabled'}`}>
      <div className="chat-header">
        <h3>Chat with Owner</h3>
      </div>
      <div className="chat-body">
        {!isEnabled && <h5>You can chat with owner once they accept your Adoption Request</h5>}
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message"
          disabled={!isEnabled}
        />
        <button onClick={handleSendMessage} disabled={!isEnabled} className='btn'>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
