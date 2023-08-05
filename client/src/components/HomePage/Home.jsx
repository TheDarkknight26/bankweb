import React from "react";
import styles from "./homepage.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { finalContext } from "../../Contexts/finalContext";
import { useState } from "react";
import moment from 'moment-timezone';
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const navigate = useNavigate();
  const { final, setFinal,flexmonth,setFlexmonth } = useContext(finalContext);
  const [formatteddate, setFormatteddate] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [flexmon,setFlexmon] = useState("");
  const [minimumdate,setMinimumdate] = useState("");
  const [maximumdate,setMaximumdate] = useState("");

  const options = [
    { value: "State Bank of India", label: "State Bank of India" },
    { value: "Indian Bank", label: "Indian Bank" },
    { value: "Kotak Bank", label: "Kotak Mahindra Bank" },
    { value: "ICICI Bank", label: "ICICI Bank" },
    { value: "Bank of Baroda", label: "Bank of Baroda" },
    { value: "Canara Bank", label: "Canara Bank" },
    { value: "Punjab National Bank", label: "Punjab National Bank" },
    { value: "Union Bank of India", label: "Union Bank of India" },
    { value: "IDBI Bank", label: "IDBI Bank" },
    { value: "Bank of India", label: "Bank of India" },
    { value: "Federal Bank", label: "Federal Bank" },
    { value: "Bandhan Bank", label: "Bandhan Bank" },
    { value: "Punjab and Sindh Bank", label: "Punjab and Sindh Bank" },
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
    { value:"City Union Bank",label:"City Union Bank"},
    { value: "Nanital Bank", label: "Nainital Bank" },
    { value: "DCB Bank", label: "DCB Bank" },
    { value: "CSB Bank", label: "CSB Bank" },
    {value:"IDFC Bank",label:"IDFC Bank"},
  ];
  
  const InfoIcon = () => {
    return (
      <div className={styles.infoIcon}>
      <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{color: "#252f41",}} />
      <div className={styles.tooltip}>Our financial products offer flexibility in choosing the maturity date. You can select a maturity date with an added flexibility of several months before and after it. This extended period allows you to take advantage of the highest interest rates available in that period, optimizing your returns based on your chosen maturity date.</div>
    </div>
    );
  };

  useEffect(() => {
    const now = moment().tz('Asia/Kolkata');
    const newdate = now
      .add(year || 0, 'years')
      .add(month || 0, 'months')
      .add(day || 0, 'days');
      setFormatteddate(newdate.format('YYYY-MM-DD'));

    const min = moment.tz('Asia/Kolkata');
    const mindate = newdate.subtract(flexmon || 0 , 'months');
    setMinimumdate(mindate.format('YYYY-MM-DD'));

    const max = moment.tz('Asia/Kolkata');
    const newnow  = max
    .add(year || 0, 'years')
    .add(month || 0, 'months')
    .add(day || 0, 'days');
    const maxdate = newnow.add(flexmon || 0 , 'months');
    setMaximumdate(maxdate.format('YYYY-MM-DD'));
    
  }, [year,month, day,flexmon]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedDate = formatteddate;
    setFinal(prevState => ({
      ...prevState,
      date: formattedDate
    }));
    const minimumDate = minimumdate;
    const maximumDate = maximumdate;
    setFlexmonth(prevState =>({
      ...prevState,
      mindate:minimumDate,
      maxdate:maximumDate
    }))
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
   
 const handleflexmonth = (event) =>{
  setFlexmon(event.target.value)
 }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.main}>
          <div className={styles.title}>
            Discover the Best Interest Rates for Your Fixed Deposits!
          </div>
          <div className={styles.whatWeDoi}>
            <div className={styles.whatWeDo}>What We Do ?</div>
            <div className={styles.whatWeDoContent}>
             We empower you to optimize your financial growth effortlessly. Our website allows you to leverage your funds wisely, making the most of your investments. Simply input your maturity date, desired flexibility, and preferred banks, and let our smart algorithm do the rest. Discover the highest interest rates available within your chosen period, enabling you to make informed decisions and maximize your returns.
            </div>
          </div>
          <div className={styles.dropdown}>
          <Dropdown className={styles.selectBank} placeHolder="Choose Bank" options={options} />
          </div>
          <div className={styles.combined}>
          <span className={styles.heading}>Enter Maturity Period</span>
          <span className={`${styles.heading2}`}>Flexibility</span>
          </div>
          <div className={styles.combined2}>
            <div>
            <input placeholder="Years" value={year} onChange={handleyear} className={`${styles.left}`} />
            <input placeholder="Months" value={month} onChange={handlemonth} className={` ${styles.mid}`} />
            <input placeholder="Days" onChange={handleday} value={day} className={`${styles.right}`} />
            <input placeholder="Months"  value={flexmon} onChange={handleflexmonth} className={`${styles.selectflex} ${styles.flexmonth}`}/>
            <FontAwesomeIcon icon={faCircleInfo} size="lg" style={{color: "#252f41",}} className={styles.infoIcon}/>
            <div className={styles.tooltip}>Our financial products offer flexibility in choosing the maturity date. You can select a maturity date with an added flexibility of several months before and after it. This extended period allows you to take advantage of the highest interest rates available in that period, optimizing your returns based on your chosen maturity date.</div>
            </div>
          </div>
          <div className={styles.submitBtn}>
          <button type="submit" >Show Result</button>
          </div>
         <div className={styles.note}>
            <p className={styles.noteText}>
            <strong>
              Disclaimer:  
              </strong> 
              Information provided on our website is for informational purposes only and based on publicly available data. We strive for accuracy, but we cannot guarantee its completeness. Always verify data before making financial decisions. We are not liable for errors or inaccuracies. Use the platform at your own discretion.
            </p>
          </div>
          </div>
      </form>
    </>
  );
};

export default HomePage;
