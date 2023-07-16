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
  const [formatteddate, setFormatteddate] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const options = [
    { value: "State Bank of India", label: "State Bank of India" },
    { value: "Indian Bank", label: "Indian Bank" },
    { value: "Central Bank of India", label: "Central Bank of India" },
    { value: "Kotak Mahindra Bank", label: "Kotak Mahindra Bank" },
    { value: "ICICI Bank", label: "ICICI Bank" },
    { value: "Bank of Baroda", label: "Bank of Baroda" },
    { value: "Canara Bank", label: "Canara Bank" },
    { value: "Punjab National Bank", label: "Punjab National Bank" },
    { value: "Union Bank of India", label: "Union Bank of India" },
    { value: "IDBI Bank", label: "IDBI Bank" },
    { value: "Bank of India", label: "Bank of India" },
    { value: "Federal Bank", label: "Federal Bank" },
    { value: "Bandhan Bank", label: "Bandhan Bank" },
    { value: "Punjab and Sind Bank", label: "Punjab and Sind Bank" },
    { value: "Bank of Maharashtra", label: "Bank of Maharashtra" },
    { value: "Yes Bank", label: "Yes Bank" },
    { value: "IndusInd Bank", label: "IndusInd Bank" },
    { value: "Jammu Kashmir Bank", label: "Jammu Kashmir Bank" },
    { value: "UCO Bank", label: "UCO Bank" },
    { value: "Indian Overseas Bank", label: "Indian Overseas Bank" },
    { value: "Karnataka Bank", label: "Karnataka Bank" },
    { value: "RBL Bank", label: "RBL Bank" },
    { value: "South Indian Bank", label: "South Indian Bank" },
    { value: "Tamilnad Mercantile Bank", label: "Tamilnad Mercantile Bank" },
    { value: "Karur Vyasa Bank", label: "Karur Vyasa Bank" },
    { value: "Nainital Bank", label: "Nainital Bank" },
    { value: "DCB Bank", label: "DCB Bank" },
    { value: "CSB Bank", label: "CSB Bank" }
  ];
  

  useEffect(() => {
    const now = moment().tz('Asia/Kolkata');
    const newdate = now
      .add(year || 0, 'years')
      .add(month || 0, 'months')
      .add(day || 0, 'days');

    setFormatteddate(newdate.format('YYYY-MM-DD'));
  }, [year, month, day]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedDate = formatteddate;
    setFinal(prevState => ({
      ...prevState,
      date: formattedDate
    }));
    navigate("/result");
  };

  const handleyear = (event) => {
    setYear(event.target.value);
  };

  const handlemonth = (event) => {
    setMonth(event.target.value);
  };

  const handleday = (event) => {
    setDay(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.main}>
          <div className={styles.title}>
            Discover the Best Interest Rates for Your Fixed Deposits!
          </div>
          <Dropdown className={styles.selectBank} placeHolder="Choose Bank" options={options} />
          <span className={styles.heading}>Enter Maturity Period</span>
          <div>
            <input placeholder="Years" value={year} onChange={handleyear} className={`${styles.selectDays} ${styles.left}`} />
            <input placeholder="Months" value={month} onChange={handlemonth} className={`${styles.selectDays} ${styles.mid}`} />
            <input placeholder="Days" onChange={handleday} value={day} className={`${styles.selectDays} ${styles.right}`} />
          </div>
          <div className={styles.submitBtn}>
            <button type="submit">Show Result</button>
          </div>
          <div className={styles.note}>
            <p className={styles.noteText}>
            <strong>Note:</strong> While we strive to provide updated and accurate data, please note that we cannot be held responsible for any discrepancies that may occur.
            </p>
          </div>
          
          
        </div>
      </form>
    </>
  );
};

export default HomePage;
