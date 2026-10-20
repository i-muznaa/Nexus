import React, { useState } from 'react';
import './ChatSystem.css';

export default function ChatSystem() {
  const [activeContact, setActiveContact] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Venture Capitalist',
      avatar: '👩‍💼',
      lastMessage: 'Looking forward to reviewing your updated pitch deck!',
      time: '10:42 AM'
    },
    {
      id: 2,
      name: 'Alex Chen',
      role: 'Angel Investor',
      avatar: '👨‍💼',
      lastMessage: 'Can we reschedule our sync to tomorrow at 2 PM?',
      time: 'Yesterday'
    }
  ]);

  const [conversations, setConversations] = useState({
    1: [
      { id: 101, sender: 'them', text: 'Hi! I saw your recent financial report.', time: '10:30 AM' },
      { id: 102, sender: 'me', text: 'Thanks Sarah! Let me know if you have any questions.', time: '10:35 AM' },
      { id: 103, sender: 'them', text: 'Looking forward to reviewing your updated pitch deck!', time: '10:42 AM' }
    ],
    2: [
      { id: 201, sender: 'them', text: 'Hey there! Is the 10:00 AM slot still open?', time: 'Yesterday' },
      { id: 202, sender: 'me', text: 'Yes, it is!', time: 'Yesterday' },
      { id: 203, sender: 'them', text: 'Can we reschedule our sync to tomorrow at 2 PM?', time: 'Yesterday' }
    ]
  });

  const activeContactInfo = contacts.find((c) => c.id === activeContact);
  const activeMessages = conversations[activeContact] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const msgObj = {
      id: Date.now(),
      sender: 'me',
      text: newMessage,
      time: currentTime
    };

    setConversations({
      ...conversations,
      [activeContact]: [...activeMessages, msgObj]
    });

    setContacts(
      contacts.map((c) =>
        c.id === activeContact ? { ...c, lastMessage: newMessage, time: currentTime } : c
      )
    );

    setNewMessage('');
  };

  return (
    <div className="chat-container">
      {/* Sidebar: Contacts List */}
      <div className="chat-sidebar">
        <h3>💬 Direct Messages</h3>
        <div className="contacts-list">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-card ${activeContact === contact.id ? 'active' : ''}`}
              onClick={() => setActiveContact(contact.id)}
            >
              <div className="contact-avatar">{contact.avatar}</div>
              <div className="contact-info">
                <div className="contact-header">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-time">{contact.time}</span>
                </div>
                <p className="contact-role">{contact.role}</p>
                <p className="contact-preview">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {activeContactInfo && (
          <div className="chat-header">
            <span className="active-avatar">{activeContactInfo.avatar}</span>
            <div>
              <h4>{activeContactInfo.name}</h4>
              <p>{activeContactInfo.role}</p>
            </div>
          </div>
        )}

        <div className="messages-body">
          {activeMessages.map((msg) => (
            <div
              key={msg.id}
              className={`message-bubble ${msg.sender === 'me' ? 'outgoing' : 'incoming'}`}
            >
              <p>{msg.text}</p>
              <span className="message-time">{msg.time}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="chat-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}