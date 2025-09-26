import mongoose from 'mongoose';

const connectDB = async (URL: string) => {
    try {
        const conn = await mongoose.connect(URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
