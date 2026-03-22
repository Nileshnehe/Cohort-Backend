import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat, renameChat } from "../service/chat.api";
import { setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages, removeChatFromStore, renameExistingChat, appendToMessage } from "../chat.slice";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../service/chat.socket"
import {v4 as uuid} from "uuid"

export const useChat = () => {

    const dispatch = useDispatch()
    const chats = useSelector(state => state.chat.chats)

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true))
        const data = await sendMessage({ message, chatId })
        const { chat, aiMessage } = data
        if (!chatId)
            dispatch(createNewChat({
                chatId: chat._id,
                title: chat.title,
            }))
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: message,
            role: "user",
        }))
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: aiMessage.content,
            role: aiMessage.role,
        }))
        dispatch(setCurrentChatId(chat._id))
    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[chat._id] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }


    async function handleOpenChat(chatId) {
        if (!chatId) return
        dispatch(setLoading(true))
        try {
            const data = await getMessages(chatId)
            if (!data?.messages || !Array.isArray(data.messages)) return

            const formattedMessages = data.messages.map(msg => ({
                content: msg?.content ?? "",
                role: msg?.role ?? "user",
            }))

            dispatch(addMessages({ chatId, messages: formattedMessages }))
            dispatch(setCurrentChatId(chatId))
        } catch (err) {
            dispatch(setError(err.message))
        } finally {
            dispatch(setLoading(false))
        }
    }


    async function handleRenameChat({ chatId, title }) {
        try {
            await renameChat({ chatId, title })
            console.log("Renaming:", chatId, title)  
            dispatch(renameExistingChat({ chatId, title }))
        } catch (err) {
            console.log("Rename error:", err)
            dispatch(setError(err.message))
        }
    }

    async function handleDeleteChat(chatId) {
        try {
            await deleteChat(chatId)
            dispatch(removeChatFromStore(chatId))
            dispatch(setCurrentChatId(null))
        } catch (err) {
            dispatch(setError(err.message))
        }
    }





const handleSendMessageStream = ({ message, chatId }) => {
    const socket = getSocket()
    const assistantId = uuid()

    if (!chatId) {
        const newChatId = uuid()
        dispatch(createNewChat({ chatId: newChatId, title: message.slice(0, 30) }))
        dispatch(setCurrentChatId(newChatId))
        chatId = newChatId
    }

    socket.off("stream_chunk")
    socket.off("stream_end")
    socket.off("stream_error")

    setTimeout(() => {
        // ← empty messages filter karo
        const conversationHistory = (chats[chatId]?.messages || []).filter(
            msg => msg.content && msg.content.trim() !== ""
        )
        dispatch(addNewMessage({ chatId, content: message, role: "user", id: uuid() }))
        dispatch(addNewMessage({ chatId, content: "", role: "ai", id: assistantId }))
        socket.emit("send_message", { message, chatId, messages: conversationHistory })
    }, 0)

    socket.on("stream_chunk", ({ text }) => {
        dispatch(appendToMessage({ chatId, id: assistantId, text }))
    })

    socket.on("stream_end", () => {
        socket.off("stream_chunk")
        socket.off("stream_end")
    })

    socket.on("stream_error", ({ message: errMsg }) => {
        console.error("Stream error:", errMsg)
        socket.off("stream_chunk")
        socket.off("stream_end")
        socket.off("stream_error")
    })
}

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleDeleteChat,
        handleRenameChat,
        handleSendMessageStream,
    }

}