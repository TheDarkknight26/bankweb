
import React from 'react';
import styles from './About.module.css'; 
const AboutUsPage = () => {
    return (
        <div className={styles["about-us-container"]}>
            <div className={styles["about-us-content"]}>
                <h2>Welcome to bookFD.in!</h2>
                <p>
                We seek to help you sail past long and complex fixed deposit quotes of scheduled commercial banks in India. Fixed deposit quotes from commercial banks are often tricky, with ambiguous wordings and irregular grouping of tenures. Our website helps you identify maturities with higher interest rates close to your preferred maturity, enabling you to increase your return marginally without compromising on liquidity. Currently, we cover most scheduled commercial banks in India and are on our way to include all of them shortly.</p>
                <p>This platform was initiated and conceptualised by Professor Manish Kumar Singh, a member of the faculty at IIT Roorkee. The website was developed and maintained by Arunesh Pratap Singh Tomar and Anish Kumar. </p>
            </div>
        </div>
    );
};

export default AboutUsPage;