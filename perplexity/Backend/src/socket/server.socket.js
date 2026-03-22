import { Server } from "socket.io"
import { agent } from "../services/ai.service"
import { HumanMessage, AIMessage } from "@langchain/core/messages"

let io;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true
    }
  })

  console.log("Socket io is running")

  io.on("connection", (socket) => {
    console.log("A user Connected: " + socket.id)

    socket.on("send_message", async ({ message, chatId, messages }) => {
      try {
        const stream = await agent.stream({
          messages: messages.map(msg => {
            if (msg.role === "user") return new HumanMessage(msg.content)
            if (msg.role === "ai") return new AIMessage(msg.content)
          })
        })

        for await (const chunk of stream) {
          const text = chunk.messages?.[chunk.messages.length - 1]?.content
          if (text) socket.emit("stream_chunk", { chatId, text })
        }

        socket.emit("stream_end", { chatId })

      } catch (error) {
        socket.emit("stream_error", { message: error.message })
      }
    })
  })
}

export function getIO() {
  if (!io) throw new Error("Socket.io not initialized")
  return io
}