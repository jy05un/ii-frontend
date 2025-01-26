import React, { ReactNode } from 'react';
import styles from './FormCard.module.css'
import classNames from 'classnames';


export default function FormCard({ className, children, onSubmit }: {
  className?: string,
  children?: ReactNode,
  onSubmit?: () => void;
}) {
  return <form className={classNames(className, styles.formCard)} onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}>
    {children}
  </form>
}

export interface FormCardProps {
  onConfirm?: () => void;
}