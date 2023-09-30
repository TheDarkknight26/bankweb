import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { bankrouter } from "./routes/result.js";
import { bankrouternew } from "./routes/resultbtwdates.js";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { getGlobals } from 'common-es'
const { __dirname, __filename } = getGlobals(import.meta.url)
import { fdratesrouter } from "./routes/fdrates.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin:["https://bookfdfrontend.vercel.app"],
  methods:["POST","GET"],
  credentials:true
}
));

const PORT=process.env.PORT || 5000;
app.use("/" ,(req,res)=>{
  res.json("Hello");
})

app.use("/result",bankrouter);
app.use("/resultbtwdates",bankrouternew);
app.use("/fdrates",fdratesrouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../client/build')));
   
    app.get('*',(req,res)=>
        res.sendFile(
            path.resolve(__dirname,'../','client','build','index.html')
        )
    );
} else {
    app.get('/',(req,res)=> res.send('Please set to production')
    );
  
}

app.listen(PORT,()=>{
    console.log(`server running fine at ${PORT}`);
})
