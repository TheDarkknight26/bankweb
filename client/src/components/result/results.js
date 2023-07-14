import React, { useEffect } from "react";
import axios from "axios";
import { finalContext } from "../../Contexts/finalContext";
import { useContext } from "react";
import styles from "./result.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const Result = () => {
  const { final, setFinal } = useContext(finalContext);
  const navigate = useNavigate();
  const [formattedDate, setFormattedDate] = useState("");

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
      const response = await axios.get("http://localhost:3001/result", {
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
      const response = await axios.get("http://localhost:3001/resultbtwdates", {
        params: {
          bankNames: JSON.stringify(final.bankNames),
          date: JSON.stringify(final.date),
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
    return <p>Loading...</p>;
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
      <h2 className={styles.maturityDate}>Maturity Date: {formattedDate}</h2>

      <h2>Normal Interest Rate among selected Banks</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <tr>
            <th>Bank Name</th>
            <th>Interest Rate</th>
            <th>Maturity Period</th>
            <th>Book FD</th>
          </tr>
          {listofbanksbtw.map((banks) => {
            return (
              <tr>
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

      <h2>Discover the Highest Interest Rate</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <tr>
            <th>Bank Name</th>
            <th>Interest Rate</th>
            <th>Maturity Period</th>
            <th>Book FD</th>
          </tr>
          {listofbanks.map((banks) => {
            return (
              <tr>
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
