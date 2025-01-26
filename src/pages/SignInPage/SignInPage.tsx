import SignInCard from 'components/SignInCard';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './SignInPage.module.css';
import classNames from 'classnames';
import NavHeader from 'components/NavHeader';

export default function SignInPage() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [isActive, setIsActive] = useState(true)

  const changeHeaderTopBg = () => {
    setIsActive(false)
    setTimeout(() => {
      setIndex((index + 1) % 4)
      setIsActive(true)
    }, 1000)
  }

  useEffect(() => {
    const interval = setInterval(changeHeaderTopBg, 5000)
    return () => clearInterval(interval)
  })

  return (
    <div className={styles.signInPage}>
      <NavHeader className={styles.navheader} onReturn={() => navigate(-1)} />
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={
            classNames(styles.headerTop,
              {
                [styles.headerTopX]: index == 0
              },
              {
                [styles.headerTopIg]: index == 1
              },
              {
                [styles.headerTopCafe]: index == 2
              },
              {
                [styles.headerTopSoop]: index == 3
              },
              {
                [styles.headerTopActive]: isActive
              })
          }></div>
        </div>
        <div className={styles.wrapper}>
          <SignInCard className={styles.signInCard} onConfirm={() => navigate("/feeds")} />
          <div className={styles.footer}>
            <p> footer </p>
          </div>
        </div>
      </div>
    </div>
  );
}
