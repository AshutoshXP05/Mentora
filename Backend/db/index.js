import mongoose from "mongoose";

import { DB_NAME } from "../constants/constant.js";

const connectDB = async () => {
    try {
        let dbUrl = process.env.MONGODB_URL;
        if (dbUrl.includes("?")) {
            const [base, query] = dbUrl.split("?");
            dbUrl = `${base.endsWith("/") ? base : base + "/"}${DB_NAME}?${query}`;
        } else {
            dbUrl = `${dbUrl.endsWith("/") ? dbUrl : dbUrl + "/"}${DB_NAME}`;
        }
        const connectionInstance = await mongoose.connect(dbUrl);
        console.log(`\n MongoDB connected: ${connectionInstance.connection.host} \n`);
    }

    catch(err) {
        console.log("MongoDB connection error", err);
        process.exit(1);
    }
}

export default connectDB;