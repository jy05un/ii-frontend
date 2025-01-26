import React, { ReactElement } from 'react';
import styles from './NavButton.module.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export interface NavButtonProps {
  name: string;
  icon: string;
  className?: string;
  link?: string;
  onClick?: () => void;
}

export default function NavButton({ icon, link, onClick, className }: NavButtonProps) {
  if (link) {
    return (
      <Link to={link}>
        <div className={classNames(className, styles.button)}>
          <img src={icon} alt="button" />
        </div>
      </Link>
    );
  } else {
    return (
      <div className={classNames(className, styles.button)} onClick={() => onClick?.()}>
        <img src={icon} alt="button" />
      </div>
    );
  }
}
