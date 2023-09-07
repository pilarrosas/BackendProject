import MessagesManager from "../dao/managers/msjManager.js"
const msgManager = new MessagesManager()

const socketChat = (socketServer) => {
    socketServer.on("connection",async(socket)=>{

      socket.on("mensaje", async (info) => {
          console.log(info)
          await msgManager.createMessage(info);
          socketServer.emit("chat", await msgManager.getMessages());
        })
        socket.on("clearchat", async () => {
          await msgManager.deleteAllMessages();
          socketServer.emit("chatCleared");
      });
      
    
    })
};

export default socketChat
