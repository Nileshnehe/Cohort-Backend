import ReactMarkdown from 'react-markdown'
import React, { useState, useEffect, useRef } from 'react'
import { useChat } from '../hooks/useChat'
import { useSelector } from "react-redux"

const Dashboard = () => {

  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const [openMenuId, setOpenMenuId] = useState(null)
  const [renamingId, setRenamingId] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const menuRef = useRef(null)

  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const chats = useSelector((state) => state.chat.chats)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) return
    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId)
  }

  const handleRenameStart = (e, chatId, currentTitle) => {
    e.stopPropagation()
    setRenamingId(chatId)
    setRenameValue(currentTitle)
    setOpenMenuId(null)
  }

  const handleRenameSubmit = (chatId) => {
    if (renameValue.trim()) {
      chat.handleRenameChat({ chatId, title: renameValue.trim() }) // wire this up in useChat
    }
    setRenamingId(null)
  }

  const handleDelete = (e, chatId) => {
    e.stopPropagation()
    setOpenMenuId(null)
    chat.handleDeleteChat(chatId) // wire this up in useChat
  }

  return (
    <main className='bg-[#111113] h-screen w-full text-[#ececec] overflow-hidden'>
      <section className='flex h-full w-full'>

        {/* Sidebar */}
        <aside className='bg-[#0f0f0f] h-full w-70 shrink-0 flex flex-col p-4 gap-2 justify-between'>
          <h1 className='text-xl font-semibold mb-4'>Nexara</h1>
          <div className='flex flex-col gap-1 h-full'>
            {Object.values(chats).map((chatItem) => (
              <div
                key={chatItem.id}
                className={`group relative flex items-center rounded-lg hover:bg-[#2f2f2f] transition-colors ${
                  currentChatId === chatItem.id ? 'bg-[#2f2f2f]' : ''
                }`}
              >
                {/* Rename input mode */}
                {renamingId === chatItem.id ? (
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={() => handleRenameSubmit(chatItem.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRenameSubmit(chatItem.id)
                      if (e.key === 'Escape') setRenamingId(null)
                    }}
                    className='flex-1 bg-[#3f3f3f] text-[#ececec] text-sm px-3 py-2 rounded-lg outline-none'
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    {/* Chat title button */}
                    <button
                      onClick={() => openChat(chatItem.id)}
                      type='button'
                      className='flex-1 text-left px-3 py-2 text-sm text-[#ececec] truncate'
                    >
                      {chatItem.title}
                    </button>

                    {/* Three-dot menu button */}
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenMenuId(openMenuId === chatItem.id ? null : chatItem.id)
                      }}
                      className='opacity-0 group-hover:opacity-100 mr-1 p-1.5 rounded-md hover:bg-[#4f4f4f] text-[#999] hover:text-[#ececec] transition-all flex-shrink-0'
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
                      </svg>
                    </button>

                    {/* Dropdown menu */}
                    {openMenuId === chatItem.id && (
                      <div
                        ref={menuRef}
                        className='absolute right-0 top-full mt-1 w-36 bg-[#1f1f1f] border border-[#3f3f3f] rounded-xl shadow-xl z-50 overflow-hidden'
                      >
                        <button
                          type='button'
                          onClick={(e) => handleRenameStart(e, chatItem.id, chatItem.title)}
                          className='w-full flex items-center gap-2 px-3 py-2 text-sm text-[#ececec] hover:bg-[#2f2f2f] transition-colors'
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Rename
                        </button>
                        <button
                          type='button'
                          onClick={(e) => handleDelete(e, chatItem.id)}
                          className='w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-[#2f2f2f] transition-colors'
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                            <path d="M10 11v6"/><path d="M14 11v6"/>
                            <path d="M9 6V4h6v2"/>
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div>hello</div>
        </aside>

        {/* Main chat area */}
        <section className='flex flex-col flex-1 h-full relative overflow-hidden'>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto px-6 py-4 pb-28 flex flex-col gap-3'>
            {chats[currentChatId]?.messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'self-end bg-[#2f2f2f] text-[#ececec]'
                    : 'self-start bg-[#171717] text-[#ececec]'
                }`}
              >
                {message.role === 'user' ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                      ul: ({ children }) => <ul className='list-disc pl-4 mb-2'>{children}</ul>,
                      ol: ({ children }) => <ol className='list-decimal pl-4 mb-2'>{children}</ol>,
                      code: ({ children }) => <code className='bg-[#2f2f2f] px-1 py-0.5 rounded text-xs'>{children}</code>,
                      pre: ({ children }) => <pre className='bg-[#2f2f2f] p-3 rounded-xl overflow-x-auto mb-2 text-xs'>{children}</pre>,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
          </div>

          {/* Footer input */}
          <footer className='absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-[#1b1b1d] rounded-2xl px-4 py-3 border border-[#3f3f3f]'>
            <form onSubmit={handleSubmitMessage} className='flex items-center gap-3'>
              <input
                type='text'
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder='Type your message...'
                className='flex-1 bg-transparent outline-none text-sm text-[#ececec] placeholder:text-[#666]'
              />
              <button
                type='submit'
                disabled={!chatInput.trim()}
                className='px-4 py-1.5 bg-[#111113] text-[#ececec] text-sm font-medium rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#161618] transition-colors'
              >
                Send
              </button>
            </form>
          </footer>

        </section>
      </section>
    </main>
  )
}

export default Dashboard