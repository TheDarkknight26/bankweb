import React from "react";
import "./Spinner.css";

const Spinner = () => {
  const loadingMessage = "Loading data... Please wait.";

  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="loading-text">{loadingMessage}</p>
    </div>
  );
};

export default Spinner;
