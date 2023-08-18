import React, { useEffect } from "react";
import axios from "axios";
import { finalContext } from "../../Contexts/finalContext";
import { useContext } from "react";
import styles from "./result.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner.js";

const Result = () => {
  const { final, setFinal,flexmonth,setFlexmonth} = useContext(finalContext);
  const navigate = useNavigate();
  const [formattedDate, setFormattedDate] = useState("");

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
  myMap.set("Jammu and Kashmir Bank", "https://www.jkbank.com/others/common/intrates.php");
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
  myMap.set("IDFC Bank","https://www.idfcfirstbank.com/personal-banking/deposits/fixed-deposit/fd-interest-rates");
  myMap.set("Axis Bank","https://www.axisbank.com/interest-rate-on-deposits");
  myMap.set("HDFC Bank","https://www.hdfcbank.com/personal/save/deposits/fixed-deposit-interest-rate");
  myMap.set("Dhanlaxmi Bank","https://www.dhanbank.com/interest-rates/");



  const handleclick = (event) => {
    navigate("/");
  };

  useEffect(() => {
    const formattedDate = formatDate(final.date);
    setFormattedDate(formattedDate);
  }, [final.date]);

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const fetchBankData = async () => {
    try {
      const response = await axios.get("https://bankproject-beta.vercel.app/result", {
        params: {
          bankNames: JSON.stringify(final.bankNames),
          date: JSON.stringify(final.date),
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching bank data:", error);
      throw error;
    }
  };

  const fetchBankDataBetweenDates = async () => {
    try {
      const response = await axios.get("https://bankproject-beta.vercel.app/resultbtwdates", {
        params: {
          bankNames: JSON.stringify(final.bankNames),
          date: JSON.stringify(final.date),
          mindate:JSON.stringify(flexmonth.mindate),
          maxdate:JSON.stringify(flexmonth.maxdate),
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching bank data between dates:", error);
      throw error;
    }
  };

  const bankDataQuery = useQuery(["bankData"], fetchBankData);
  const bankDataBetweenDatesQuery = useQuery(
    ["bankDataBetweenDates"],
    fetchBankDataBetweenDates
  );

  if (bankDataQuery.isLoading || bankDataBetweenDatesQuery.isLoading) {
    return <Spinner/>;
  }

  if (bankDataQuery.isError || bankDataBetweenDatesQuery.isError) {
    return <p>Error fetching data</p>;
  }

  const listofbanksbtw = bankDataBetweenDatesQuery.data || [];
  const listofbanks = bankDataQuery.data || [];

  return (
    <div className={styles.main}>
      <div className={styles.NewSearchBtn} onClick={handleclick}>
        New Search
      </div>
      <br />
      <h2 className={styles.maturityDate}><strong>Maturity Date:</strong> Based on the provided maturity period from today, the calculated maturity date is {formattedDate}</h2>
      <div className={styles.note}>
        <div className={styles.noteText}>
          <strong>NOTE:</strong>If the banks you are looking for are not listed below, it is probably due to the reason that they are not included in our current dataset.
        </div>
      </div>

      <div className={styles.normal}>Normal Interest Rate among selected Banks</div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <tr>
            <th>Bank Name</th>
            <th>Interest Rate</th>
            <th>Maturity Period</th>
            <th>Book FD</th>
          </tr>
          {listofbanks.map((banks) => {
            const bankURL = myMap.get(banks.bank_id);
            return (
              <tr>
                <td>{banks.bank_id}</td>
                <td>{banks.maximuminterestrate}</td>
                <td>{banks.Maturity}</td>
                <td>
                <a href={bankURL} target="_blank" rel="noopener noreferrer">
                Visit Bank Website to Book FD
        </a>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <br />

      <div className={styles.normal}>Discover the Highest Interest Rate</div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <tr>
            <th>Bank Name</th>
            <th>Interest Rate</th>
            <th>Maturity Period</th>
            <th>Book FD</th>
          </tr>
          {listofbanksbtw.map((banks) => {
            const bankURL = myMap.get(banks.bank_id);
            return (
              <tr>
                <td>{banks.bank_id}</td>
                <td>{banks.maximuminterestrate}</td>
                <td>{banks.Maturity}</td>
                <td><a href={bankURL} target="_blank" rel="noopener noreferrer">
                Visit Bank Website to Book FD
        </a>
          </td>
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
