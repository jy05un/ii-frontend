import React, { ReactElement } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

export interface NavButtonProps {
  name: string;
  icon: string;
  link?: string;
  onClick?: () => void;
}

export default function NavButton({ icon, link, onClick }: NavButtonProps) {
  if (link) {
    return (
      <Link to={link}>
        <div className={styles.button}>
          <img src={icon} alt="button" />
        </div>
      </Link>
    );
  } else {
    return (
      <div className={styles.button} onClick={() => onClick?.()}>
        <img src={icon} alt="button" />
      </div>
    );
  }
}
