import SignUpCard from 'components/SignUpCard';
import styles from './SignUpPage.module.css';
import React from 'react';
import NavHeader from 'components/NavHeader';
import { useNavigate } from 'react-router';

export default function SignUpPage() {
  const navigate = useNavigate()
  return (
    <div className={styles.signUpPage}>
      <NavHeader className={styles.navheader} onReturn={() => navigate(-1)} />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1> header </h1>
        </div>
        <div className={styles.wrapper}>
          <SignUpCard className={styles.signUpCard} />
          <div className={styles.footer}>
            <p> footer </p>
          </div>
        </div>
      </div>
    </div>
  );
}
