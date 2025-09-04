import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const baseMongoseeOpts = { serverSelectionTimeoutMS: 10000 }

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(uri, baseMongoseeOpts);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}
export const connectMongoDBAtlas = async () => {
    try {
        const uri = process.env.MONGO_URI_ATLAS;
        if (!uri) {
            throw new Error("MONGO_URI_ATLAS is not defined in environment variables");
        }
        await mongoose.connect(uri, baseMongoseeOpts);
        console.log("MongoDB Atlas connected successfully");

    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

export const connectAuto = async () => {
    const target = (process.env.MONGO_TARGET || "LOCAL").toUpperCase();
    if (target === "ATLAS") {
        await connectMongoDBAtlas();
    } else {
        await connectDB();
    }
}