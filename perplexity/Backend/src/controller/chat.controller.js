import { generateResponse } from "../services/ai.service.js";
import { generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel  from "../models/message.model.js"


export async function sendMessage(req, res) {

    const { message } = req.body;

    console.log(message);

    const title = await generateChatTitle(message)
    console.log(title)

    const result = await generateResponse(message)

    const chat = await chatModel.create({
        user: req.user.id,
        title
    })

    const aiMessage = await messageModel.create({
        user: req.user._id,
        chat: chat._id,  
        content: result,
        role: "ai"

    })

    res.status(201).json({
        title,
        chat,
        aiMessage
    })


}

