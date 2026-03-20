import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
// import Chat from './Chat'
import "./chatwindow.css"

const ChatWindow = () => {
    const chat = useChat()

    const [chatInput, setChatInput] = useState('')

    // const currentChatId = useSelector((state) => state.chat.currentChatId)

    const handleSubmitMessage = (e) => {
        e.preventDefault()

        const trimmedMessage = chatInput.trim()
        if (!trimmedMessage) return

        chat.handleSendMessage({
            message: trimmedMessage,
            // chatId: currentChatId
        })

        setChatInput('')
    }

    return (
        <div className='chatwindow'>
            {/* Navbar */}
            <div className='navbar'>
                <span>
                    Nexara.Pro &nbsp;
                    <i className="fa-solid fa-chevron-down"></i>
                </span>

                <div className="userIconDiv">
                    <span className='userIcon'>
                        <i className="fa-solid fa-user"></i>
                    </span>
                </div>
            </div>

            {/* Chat Messages */}
            {/* <Chat /> */}

            {/* Input Area */}
            <div className='chatInput'>
                <form onSubmit={handleSubmitMessage} className="inputBox">

                    <input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder='Ask Anything'
                    />

                    <button
                        type="submit"
                        id='submit'
                        disabled={!chatInput.trim()}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.4999 2.00098C20.0944 2.00063 20.6989 2.15072 21.2499 2.46875C22.924 3.43525 23.4977 5.57598 22.5312 7.25001L15.0311 20.2403C14.0646 21.9142 11.9238 22.488 10.2498 21.5215C9.41372 21.0387 8.85157 20.2605 8.61994 19.3975L7.1209 13.8028L15.8905 8.73927C16.3687 8.46311 16.5327 7.85126 16.2567 7.37306C15.9805 6.89505 15.3686 6.73096 14.8905 7.00685L6.12089 12.0713L2.02515 7.97462C0.658428 6.60771 0.658787 4.39204 2.02515 3.02539C2.65731 2.39319 3.53383 2.00021 4.49978 2L19.4999 2.00098Z"></path>
                        </svg>
                    </button>

                </form>

                <p>Nexara can make mistakes. Check important info.</p>
            </div>
        </div>
    )
}

export default ChatWindow