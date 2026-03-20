import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
// import { setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages,  } from "../chat.slice";
import { setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages, removeChatFromStore } from "../chat.slice";
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()


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
            acc[ chat._id ] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }

    // async function handleOpenChat(chatId, chats) {

    //     console.log(chats[ chatId ]?.messages.length)

    //     if (chats[ chatId ]?.messages.length === 0) {
    //         const data = await getMessages(chatId)
    //         const { messages } = data

    //         const formattedMessages = messages.map(msg => ({
    //             content: msg.content,
    //             role: msg.role,
    //         }))

    //         dispatch(addMessages({
    //             chatId,
    //             messages: formattedMessages,
    //         }))
    //     }
    //     dispatch(setCurrentChatId(chatId))
    // }

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
        await renameChat({ chatId, title }) // your API call
        dispatch(renameExistingChat({ chatId, title })) // slice action
    } catch (err) {
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

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleDeleteChat,
        handleRenameChat,
    }

}