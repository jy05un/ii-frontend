import React, { ReactNode } from 'react';
import styles from './FormCard.module.css'
import classNames from 'classnames';


export default function FormCard({ className, children, onSubmit }: {
  className?: string,
  children?: ReactNode,
  onSubmit?: () => void;
}) {
  return <div className={classNames(className, styles.formCard)}>
    <form className={styles.form} onSubmit={(e) => {e.preventDefault(); onSubmit?.();}}>
      {children}
    </form>
  </div>;
}

export interface FormCardProps {
  onConfirm?: () => void;
}