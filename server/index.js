import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { bankrouter } from "./routes/result.js";
import { bankrouternew } from "./routes/resultbtwdates.js";
import bodyParser from "body-parser";


const app = express();

app.use(express.json());
app.use(cors({
    origin:["https://deploy-mern-1whq.vercel.app"];
    methods:["POST","GET"],
    credentials:true
}
));

const PORT=3001;

app.use("/result",bankrouter);
app.use("/resultbtwdates",bankrouternew);

app.listen(PORT,()=>{
    console.log(`server running fine at ${PORT}`);
})
