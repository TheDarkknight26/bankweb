import React, { useEffect } from "react";
import axios from "axios";
import { finalContext } from "../../Contexts/finalContext";
import { useContext } from "react";
import styles from './result.module.css'
import { useState } from "react";
import { useNavigate } from "react-router";

const Result = () => {
  const { final ,setFinal} = useContext(finalContext);
  const [listofbanks,setListofbanks] = useState([]);
  const navigate = useNavigate();
  const [listofbanksbtw,setListofbanksbtw] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");

  const handleclick=(event) =>{
    navigate("/");
    
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/result", {
          params:{
            bankNames: JSON.stringify(final.bankNames),
            date: JSON.stringify(final.date)
          }
        });
        console.log(response.data,final.bankNames,final.date);
        setListofbanks(response.data);
      } catch (e) {
        console.log("Error fetching result:", e);
      }
    };

    fetchData();
  }, [setFinal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/resultbtwdates", {
          params:{
            bankNames: JSON.stringify(final.bankNames),
            date: JSON.stringify(final.date)
          }
        });
        console.log(response.data);
        setListofbanksbtw(response.data);
      } catch (e) {
        console.log("Error fetching result:", e);
      }
    };

    fetchData();
  }, [setFinal]);


  useEffect(() => {
    const formattedDate = formatDate(final.date);
    setFormattedDate(formattedDate);
  }, [final.date]);

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
<div className={styles.main}>
<div className={styles.NewSearchBtn} onClick={handleclick}>
New Search
</div>
<br />
<br />
<h2>Maximum Interest Rate among seleted Banks {formattedDate}</h2>
<div className={styles.tableContainer}>
<table className={styles.table}>
  <tr>
    <th>Bank Name</th>
    <th>Interest Rate</th>
    <th>Maturity Period</th>
    <th>Book FD</th>
  </tr>
  {listofbanksbtw?.map((banks)=>{
    return(<tr>
    <td>{banks.bank_id}</td>
    <td>{banks.maximuminterestrate}</td>
    <td>{banks.Maturity}</td>
    <td>Data 4</td>
  </tr>
    );
  })}
</table>
</div>
<br />

<h2>Discover the Highest Interest Rate until {formattedDate}</h2>
<div className={styles.tableContainer}>
<table className={styles.table}>
  <tr>
    <th>Bank Name</th>
    <th>Interest Rate</th>
    <th>Maturity Period</th>
    <th>Book FD</th>
  </tr>
  {listofbanks?.map((banks)=>{
    return(<tr>
    <td>{banks.bank_id}</td>
    <td>{banks.maximuminterestrate}</td>
    <td>{banks.Maturity}</td>
    <td>Data 4</td>
  </tr>
    );
  })}
</table>
</div>
<br />
<br />
</div>
 );
};

export default Result;