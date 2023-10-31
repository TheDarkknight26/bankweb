
import React from 'react';
import styles from './About.module.css'; 
const AboutUsPage = () => {
    return (
        <div className={styles["about-us-container"]}>
            <div className={styles["about-us-content"]}>
                <h2>About Us</h2>
                <p>Welcome to our website. We are dedicated to providing high-quality service to our users.</p>
                <p> The idea for this website was conceived by Professor Manish Kumar Singh, an Economics faculty member at the Indian Institute of Technology, Roorkee. The development of this platform was undertaken by Arunesh Pratap Singh Tomar and Anish Kumar. The vision behind this initiative was to empower the public in making informed decisions regarding the selection of the most suitable fixed deposit schemes offered by various banks. Our mission is to enable individuals to maximize their returns and achieve their financial goals with confidence and security.</p>
            </div>
        </div>
    );
};

export default AboutUsPage;