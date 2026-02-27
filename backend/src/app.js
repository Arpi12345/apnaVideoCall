import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectToSocket } from "../src/controllers/scoketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = connectToSocket(server);



app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);


const start = async () =>{
   try {
        const connectionDb = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

        server.listen(app.get("port"), () =>{
            console.log(`Server running on port ${app.get("port")}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error);
    }
};
 


start();
export default server;