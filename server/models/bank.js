import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
bank:{
    type:"String" ,required:true,unique:true
},
interest_rates:[{
    Maturity:{
        type:"String",
        required:true
    },
    General_Public:{
       type:Number,
       required:true,
    },
    Senior_Citizen:{
        type:Number,
        required:true,
    },
    min:{
        type:Date,
        required:true,
    },
    max:{
        type:Date,
        required:true,
    }


}]
,
});

export const User = mongoose.model('interest_rates',UserSchema);