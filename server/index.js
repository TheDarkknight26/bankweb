import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { bankrouter } from "./routes/result.js";
import { bankrouternew } from "./routes/resultbtwdates.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";



const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const PORT=3001;

app.use("/result",bankrouter);
app.use("/resultbtwdates",bankrouternew);

app.listen(PORT,()=>{
    console.log(`server running fine at ${PORT}`);
})
