import React, { useEffect } from "react";
import axios from "axios";
import { finalContext } from "../../Contexts/finalContext";
import { useContext } from "react";

const Result=()=>{
const { final, setFinal } = useContext(finalContext);
useEffect(()=>{
const fetchdata= async() =>{
    try{
    const response = await axios.get("http://localhost:3001/result",{
     bankNames: final.bankNames,
      date: final.date
    }
      );
    console.log(response.data);
    }catch(e){
        console.log(`The error in fetching result is ${e} and  `,final);
    }
};

fetchdata();
},[]);


return (
<>

</>
);


}

export default Result ;