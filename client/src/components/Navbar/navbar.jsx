import React from 'react';
import styles from './navbar.module.css'; // Import your CSS module

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
       
        <li className={styles.navItem}>
          <a href="/about">About Us</a>
        </li>
        <li className={styles.navItem}>
          <a href="/fddata">FD Rates</a>
        </li>
        {/* <li className={styles.navItem}>
          <a href="/team">FAQ</a>
        </li>
        <li className={styles.navItem}>
          <a href="/career">Testimonies</a>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
