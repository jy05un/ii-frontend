import SignInCard from 'components/SignInCard';
import React from 'react';
import { useNavigate } from 'react-router';
import styles from './SignInPage.module.css';

export default function SignInPage() {
  const navigate = useNavigate()
  return (
    <div className={styles.signInPage}>
      <div className={styles.header}>
        <h1> header </h1>
      </div>
      <div className={styles.wrapper}>
        <SignInCard className={styles.signInCard} onConfirm={() => navigate("/feeds")}/>
        <div className={styles.footer}>
          <p> footer </p>
        </div>
      </div>
    </div>
  );
}
