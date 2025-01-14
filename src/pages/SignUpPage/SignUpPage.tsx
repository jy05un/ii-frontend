import SignUpCard from 'components/SignUpCard';
import styles from './SignUpPage.module.css';
import React from 'react';

export default function SignUpPage() {
  return (
    <div className={styles.signUpPage}>
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
  );
}
