import { io } from "socket.io-client";

let socket = null; 
export const initializeSocketConnection = () => {
  socket = io("http://localhost:3000", {  
    withCredentials: true,
  })

  socket.on("connect", () => {
    console.log("Connected to Socket.IO server")
  })

  return socket
}

export function getSocket() {
  if (!socket) throw new Error("Socket not initialized")
  return socket
}