import React from "react";
import styles from "./homepage.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { finalContext } from "../../Contexts/finalContext";
import { useState } from "react";
import moment from 'moment-timezone';
import { useEffect } from "react";


const HomePage = () => {
    const navigate = useNavigate();
    const { final, setFinal } = useContext(finalContext);
    const [formatteddate,setFormatteddate] = useState("");
    
   
    


    const options = [
        { value: "State Bank of India", label: "State Bank of India" },
        { value: "Kotak Bank", label: "Kotak Bank" },
        { value: "Central Bank of India", label: "Central Bank of India" },
        { value: "ICICI Bank", label: "ICICI Bank" },
        { value:"Punjab National Bank",label:"Punjab National Bank"},
        {value:"YES Bank" ,label:"Yes bank"},
        {value:"Bank of baroda" ,label:"Bank of baroda"},
    ];
   
    
     const [day,setDay] = useState("");
     const [month,setMonth] = useState("");
     const [year,setYear] = useState("");

   
      useEffect(() => {
        const now = moment().tz('Asia/Kolkata');
        const newdate = now
        .add(year || 0, 'years')
        .add(month || 0, 'months')
        .add(day || 0, 'days');
          
        setFormatteddate(newdate.format('YYYY-MM-DD'));
         console.log(formatteddate);
       }, [year, month, day]);


      const handleSubmit = (event) =>{
        event.preventDefault();
        const formattedDate = formatteddate;
        setFinal(prevState => ({
            ...prevState,
            date: formattedDate
          }));
        console.log(final.bankNames)
        navigate("/result");
      };


    
    const handleyear = (event) =>{
        setYear(event.target.value);
        
    }
    const handlemonth = (event) =>{
        setMonth(event.target.value);
        
    }
    const handleday = (event) =>{
        setDay(event.target.value);
        
    }

   return (<>
    <form onSubmit={handleSubmit}>
        <div className={styles.main}>
            <div className={styles.title}>
            Discover the Best Interest Rates for Your Fixed Deposits!
            </div>
            <Dropdown className={styles.selectBank} placeHolder="Choose Bank" options={options} />
              <span className={styles.heading}>Enter Maturity Period</span>
            <div>
                <input placeholder="Years" value={year}  onChange={handleyear} className= {`${styles.selectDays} ${styles.left}`} /><input placeholder="Months"   value={month} onChange={handlemonth} className= {`${styles.selectDays} ${styles.mid}`} /><input placeholder="Days" onChange={handleday} value={day}  className= {`${styles.selectDays} ${styles.right}`} />
            </div>
            <div className={styles.submitBtn}>
            
            <button type="submit" >Show Result</button>
            </div>
            {/* <img className={styles.bg} alt="" src="/assets/house.png" /> */}
        </div>
    </form>
    </>
    )
}

export default HomePage;