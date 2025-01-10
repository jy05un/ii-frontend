import SignInCard from 'components/SignInCard';
import React from 'react';
import styles from "./SignInPage.module.css"

export default function SignInPage() {
  return <div className={styles.signInPage}>
    <SignInCard className={styles.signInCard}/>
  </div>;
}
