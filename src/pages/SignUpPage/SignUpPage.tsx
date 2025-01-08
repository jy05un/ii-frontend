import SignUpCard from 'components/SignUpCard';
import styles from './SignUpPage.module.css';
import React from 'react';

export default function SignUpPage() {
  return (
    <div className={styles.signUpPage}>
      <SignUpCard className={styles.signUpCard} />
    </div>
  );
}
