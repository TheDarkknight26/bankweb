import React from "react";
import styles from "./homepage.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { finalContext } from "../../Contexts/finalContext";
import { useState } from "react";

const HomePage = () => {
    const navigate = useNavigate();
    const { final, setFinal } = useContext(finalContext);
    const options = [
        { value: "State Bank of India", label: "State Bank of India" },
        { value: "Punjab National Bank", label: "Punjab National Bank" },
        { value: "HDFC Bank", label: "HDFC Bank" },
        { value: "ICICI Bank", label: "ICICI Bank" }
    ];
    const handlesubmit = (event) => {
        event.preventDefault();
        const formattedDate = `${year}-${month}-${day}`;
        setFinal(prevState => ({
            ...prevState,
            date: formattedDate
          }));
        navigate("/result");
      };
    const [day,setDay] = useState("00");
    const [month,setMonth] = useState("00");
    const [year,setYear] = useState("0000");

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
    <form onSubmit={handlesubmit}>
        <div className={styles.main}>
            <div className={styles.title}>
                Find the bank with maximum interest
            </div>
            <Dropdown className={styles.selectBank} placeHolder="Choose Bank" options={options} />
           
                <span className={styles.heading}>Enter Maturity Period</span>
            <div>
                <input placeholder="Years" value={year} required onChange={handleyear} className= {`${styles.selectDays} ${styles.left}`} /><input placeholder="Months"  required value={month} onChange={handlemonth} className= {`${styles.selectDays} ${styles.mid}`} /><input placeholder="Days" onChange={handleday} value={day} required className= {`${styles.selectDays} ${styles.right}`} />
            </div>
            <div className={styles.submitBtn}>
                <button type ="submit" >Show Result</button>
            </div>
            {/* <img className={styles.bg} alt="" src="/assets/house.png" /> */}
        </div>
    </form>
    </>
    )
}

export default HomePage;