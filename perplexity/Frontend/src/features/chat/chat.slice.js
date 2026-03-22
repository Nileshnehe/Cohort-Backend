import { createSlice } from '@reduxjs/toolkit';
import {v4 as uuid} from 'uuid'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        createNewChat: (state, action) => {
            const { chatId, title } = action.payload
            state.chats[chatId] = {
                id: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toISOString(),
            }
        },
        renameExistingChat: (state, action) => {
            const { chatId, title } = action.payload
            if (state.chats[chatId]) {
                state.chats[chatId].title = title
            }

        },
        removeChatFromStore: (state, action) => {
            delete state.chats[action.payload]
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role, id } = action.payload 
            state.chats[chatId].messages.push({
                id: id || uuid(),  
                content,
                role
            })
        },
        addMessages: (state, action) => {
            const { chatId, messages } = action.payload
            if (!state.chats[chatId]) return
            state.chats[chatId].messages = messages
        },
        appendToMessage: (state, action) => {
            const { chatId, id, text } = action.payload
            const msg = state.chats[chatId]?.messages.find(m => m.id === id)
            if (msg) msg.content += text
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
    }
})

export const { setChats, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages, removeChatFromStore, renameExistingChat, appendToMessage } = chatSlice.actions
export default chatSlice.reducer
