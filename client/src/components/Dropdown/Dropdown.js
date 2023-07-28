import React, { useEffect, useState } from "react";
import styles from "./dropdown.module.css";
import { finalContext } from "../../Contexts/finalContext";
import { useContext } from "react";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const Dropdown = ({ placeHolder, options }) => {
  const { final, setFinal } = useContext(finalContext);
  const [showMenu, setShowMenu] = useState(false);
  const [value, setValue] = useState(null);
  const [selectAll, setSelectAll] = useState(false); // New state for tracking "Select All" status

  // ... (existing code)

  const handleSelectAll = (e) => {
    e.stopPropagation();
    setSelectAll(!selectAll);

    if (!selectAll) {
      // Select all banks
      const allBankValues = options.map((option) => option.value);
      setFinal((prevState) => ({
        ...prevState,
        bankNames: allBankValues,
      }));
    } else {
      // Deselect all banks
      setFinal((prevState) => ({
        ...prevState,
        bankNames: [],
      }));
    }
  };

  useEffect(() => {}, [final, setFinal]);

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
    console.log("click", showMenu);
  };
  const getDisplay = () => {
    if (value) {
      return value.label;
    }
    return placeHolder;
  };

  const handleItemClick = (value) => {
    // Toggle the selection of the clicked item
    const isItemSelected = final.bankNames.includes(value);
    if (isItemSelected) {
      const updatedBankNames = final.bankNames.filter((item) => item !== value);
      setFinal((prevState) => ({
        ...prevState,
        bankNames: updatedBankNames,
      }));
    } else {
      const newValue = value;
      const updatedBankNames = [...final.bankNames, newValue];
      setFinal((prevState) => ({
        ...prevState,
        bankNames: updatedBankNames,
      }));
    } // Since a specific option is clicked, "Select All" should be deselected
  };

  const handleOptionClick = (option) => {
    // Toggle the selection of the clicked option
    const isOptionSelected = final.bankNames.includes(option.value);
    if (isOptionSelected) {
      const updatedBankNames = final.bankNames.filter(
        (item) => item !== option.value
      );
      setFinal((prevState) => ({
        ...prevState,
        bankNames: updatedBankNames,
      }));
    } else {
      const newValue = option.value;
      const updatedBankNames = [...final.bankNames, newValue];
      setFinal((prevState) => ({
        ...prevState,
        bankNames: updatedBankNames,
      }));
    }
  };

  const isSelected = (option) => {
    const isValuePresent = final.bankNames.includes(option.value);
    return isValuePresent;
  };

  return (
    <div className={styles.combined}>
      <div className={styles.dropdownContainer}>
        <div onClick={handleInputClick} className={styles.dropdownInput}>
          <div className={styles.dropdownSelectedValue}>{getDisplay()}</div>
          <div className={styles.dropdownTools}>
            <div className={styles.dropdownTool}>
              <Icon />
            </div>
          </div>
        </div>
        {showMenu && (
          <div className={styles.dropdownMenu}>
            {options.map((option) => (
              <div key={option.value} className={styles.optionLabel}>
                <label>
                  <input
                    type="checkbox"
                    className={styles.optionCheckbox}
                    checked={isSelected(option)}
                    onChange={() => handleOptionClick(option)}
                  />
                 
                </label>
                <label>
                  <div
                    onClick={() => handleItemClick(option.value)}
                    className={`dropdownItem ${
                      isSelected(option) ? styles.selected : ""
                    }`}
                  >
                    {option.label}
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.selectAllCheckboxContainer}>
        <label className={styles.selectAllCheckboxLabel}>
          Select All
          <input
            type="checkbox"
            className={styles.selectAllCheckbox}
            checked={selectAll}
            onChange={handleSelectAll}
          />
        </label>
      </div>
    </div>
  );
};

export default Dropdown;
