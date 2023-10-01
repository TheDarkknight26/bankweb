import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner.js";
import styles from "./fddata.module.css";
import { useNavigate } from "react-router";


const Fdrates = () =>{
    const myMap = new Map();
    myMap.set("State Bank of India", "https://sbi.co.in/web/interest-rates/deposit-rates/retail-domestic-term-deposits");
    myMap.set("Indian Bank", "https://www.indianbank.in/departments/deposit-rates/#!");
    myMap.set("Central Bank of India", "https://centralbankofindia.co.in/en/interest-rates-on-deposit'");
    myMap.set("Kotak Mahindra Bank", "https://www.kotak.com/en/personal-banking/deposits/fixed-deposit/fixed-deposit-interest-rate.html");
    myMap.set("ICICI Bank", "https://www.icicibank.com/personal-banking/deposits/fixed-deposit/fd-interest-rates");
    myMap.set("Bank of Baroda", "https://www.bankofbaroda.in/interest-rate-and-service-charges/deposits-interest-rates");
    myMap.set("Canara Bank", "https://canarabank.com/User_page.aspx?othlink=9");
    myMap.set("Punjab National Bank", "https://www.pnbindia.in/interest-rates-deposit.html");
    myMap.set("Union Bank of India", "https://www.unionbankofindia.co.in/english/interest-rate.aspx");
    myMap.set("IDBI Bank", "https://www.idbibank.in/interest-rates.aspx");
    myMap.set("Bank of India", "https://bankofindia.co.in/interest-rate/rupee-term-deposit-rate");
    myMap.set("Federal Bank", "https://www.federalbank.co.in/deposit-rate");
    myMap.set("Bandhan Bank", "https://bandhanbank.com/rates-charges");
    myMap.set("Punjab and Sind Bank", "https://punjabandsindbank.co.in/content/fdds");
    myMap.set("Bank of Maharashtra", "https://bankofmaharashtra.in/domestic-term-deposits");
    myMap.set("Yes Bank", "https://www.yesbank.in/personal-banking/yes-individual/deposits/fixed-deposit");
    myMap.set("IndusInd Bank", "https://www.indusind.com/in/en/personal/rates.html");
    myMap.set("Jammu & Kashmir Bank", "https://www.jkbank.com/others/common/intrates.php");
    myMap.set("UCO Bank", "https://www.ucobank.com/english/interest-rate-deposit-account.aspx");
    myMap.set("Indian Overseas Bank", "https://www.iob.in/Domestic_Rates");
    myMap.set("Karnataka Bank", "https://karnatakabank.com/personal/term-deposits/interest-rates");
    myMap.set("RBL Bank", "https://www.rblbank.com/interest-rates/fd-rates");
    myMap.set("South Indian Bank", "https://www.southindianbank.com/interestrate/interestratelist.aspx");
    myMap.set("City Union Bank", "https://www.cityunionbank.com/deposit-interest-rate");
    myMap.set("Tamilnad Mercantile Bank", "https://www.tmb.in/deposit-interest-rates.aspx");
    myMap.set("Karur Vysya Bank", "https://www.kvb.co.in/interest-rates/resident-nro-deposits/");
    myMap.set("Nainital Bank", "https://www.nainitalbank.co.in/English/interest_rate.aspx");
    myMap.set("DCB Bank", "https://www.dcbbank.com/dcb-fixed-deposits/deposit-rates");
    myMap.set("CSB Bank", "https://www.csb.co.in/interest-rates");
    myMap.set("IDFC FIRST Bank","https://www.idfcfirstbank.com/personal-banking/deposits/fixed-deposit/fd-interest-rates");
    myMap.set("Axis Bank","https://www.axisbank.com/interest-rate-on-deposits");
    myMap.set("HDFC Bank","https://www.hdfcbank.com/personal/save/deposits/fixed-deposit-interest-rate");
    myMap.set("Dhanlaxmi Bank","https://www.dhanbank.com/interest-rates/");
  
    const navigate = useNavigate();
    const banks = Array.from(myMap.keys());

    const fetchBankfddata = async () => {
        try {
          const response = await axios.get("http://localhost:5000/fdrates", {
            params: {
              bankNames: JSON.stringify(banks),
            },
          });  
          console.log("Bank data fetched successfully:", response.data)
          return response.data;
        } catch (error) {
          console.log("Error fetching bank data:", error);
          throw error;
        }
      };

      const fddata = useQuery(["fddata"], fetchBankfddata);

      if (fddata.isLoading) {
        return <Spinner/>;
      }
      if (fddata.isError) {
        return <p>Error fetching data</p>;
      }
    const handleclick = (event) => {
        navigate("/");
      };
  
   const fddatanew = fddata.data || [];
   const desiredBankOrder = [
    "State Bank of India",
    "HDFC Bank",
    "Axis Bank",
    "ICICI Bank",
    "Punjab National Bank",
    "Indian Bank",
    "Kotak Mahindra Bank",
    "Central Bank of India",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "IDBI Bank",
    "Bank of India",
    "Federal Bank",
    "Bandhan Bank",
    "Punjab and Sind Bank",
    "Bank of Maharashtra",
    "Yes Bank",
    "IndusInd Bank",
    "Jammu & Kashmir Bank",
    "UCO Bank",
    "Indian Overseas Bank",
    "Karnataka Bank",
    "RBL Bank",
    "South Indian Bank",
    "Tamilnad Mercantile Bank",
    "Karur Vysya Bank",
    "City Union Bank",
    "Nainital Bank",
    "DCB Bank",
    "CSB Bank",
    "IDFC FIRST Bank",
    "Dhanlaxmi Bank"
  ];
  const reorderedFddatanew = fddatanew.sort((a, b) => {
    const indexA = desiredBankOrder.indexOf(a.bank);
    const indexB = desiredBankOrder.indexOf(b.bank);
    return indexA - indexB;
  });
  

return (
<div className={styles.main}>
      <div className={styles.NewSearchBtn} onClick={handleclick}>
      Go Back
      </div>
      <br />
      <div>
  {reorderedFddatanew.map((bank, bankIndex) => (
    <div className={styles.bank} key={bankIndex}>
      <div className={styles.normal}>{bank.bank}</div>
      <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Maturity Period</th>
            <th>Interest Rate</th>
          </tr>
        </thead>
        <tbody>
          {bank.maturityRates.map((rate, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{rate.maturity}</td>
              <td>{rate.InterestRate}</td>
            </tr>
          ))}
         
        </tbody>
      </table>
      </div>
    </div>
  ))}
</div>

      
    </div>
);

};

export default Fdrates;
