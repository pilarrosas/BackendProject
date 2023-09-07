import messageModel from "../models/msg.models.js";

class MessagesManager {
    getMessages = async () => {
      try {
        return await messageModel.find().lean().exec();
      } catch (error) {
        return error;
      }
    }

    createMessage = async (message) => {
        if (message.user.trim() === '' || message.message.trim() === '') {
            // Evitar crear mensajes vacíos
            return null;
        }
    
        try {
            return await messageModel.create(message);
        } catch (error) {
            return error;
        }
    }

    deleteAllMessages = async () => {
        try {
            console.log("DELETING...");
            const result = await messageModel.deleteMany({});
            console.log("DELETED:", result);
            return result;
        } catch (error) {
            console.error("FAIL TO DELETE:", error);
            return error;
        }
    }
}

export default MessagesManager