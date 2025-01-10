import React, { ReactElement } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

export default function NavButton({
  icon,
  link,
}: {
  icon: any;
  link: string;
}) {
  return (
    <Link to={link}>
      <div className={styles.button}>
        <img src={icon} alt='button'/>
      </div>
    </Link>
  );
}
