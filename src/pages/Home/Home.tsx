import React from 'react';
import { Outlet } from 'react-router';
import styles from "./Home.module.css"
import Navbar from 'components/NavBar';

export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar className={styles.navbar}/>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
}
