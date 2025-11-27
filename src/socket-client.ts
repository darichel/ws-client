import { Manager } from "socket.io-client"


export const connectoServer = () => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js")  
    
  return manager.socket("/") 
}