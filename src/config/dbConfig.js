import mongoose from "mongoose";

const URI = "mongodb+srv://pilar:s3PL9k5Mci7eXlzN@cluster0.b6svs0q.mongodb.net/backemdProject?retryWrites=true&w=majority"

const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log('CONNECTED TO DATABASE')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB