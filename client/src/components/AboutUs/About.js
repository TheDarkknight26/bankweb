
import React from 'react';
import styles from './About.module.css'; 
const AboutUsPage = () => {
    return (
        <div className={styles["about-us-container"]}>
            <div className={styles["about-us-content"]}>
                <h2>About Us</h2>
                <p>
We extend a warm welcome to our website, where our foremost commitment is delivering exceptional service to our esteemed users.</p>
                <p> Initiated by Professor Manish Kumar Singh, a distinguished member of the Economics faculty at the prestigious Indian Institute of Technology, Roorkee, the concept for this platform was brought to life through by Arunesh Pratap Singh Tomar and Anish Kumar. The vision was to create a resource that empowers individuals to make well-informed decisions regarding the selection of the most suitable fixed deposit schemes offered by a variety of banks. With a core focus on enabling users to optimize their financial returns and realize their aspirations with confidence and reliability, our mission is to foster a secure and knowledgeable financial environment for all.</p>
            </div>
        </div>
    );
};

export default AboutUsPage;