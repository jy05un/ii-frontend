import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import styles from './FormField.module.css';
import classNames from 'classnames';

interface InputItemProps {
  name: string;
  title: string;
  value: string;
  type: string;
  invalid?: boolean;
  className: string;
  onChange?: any;
}

export default function FormField({
  name,
  title,
  value,
  type,
  invalid,
  className,
  onChange,
}: InputItemProps) {
  return (
    <div className={classNames(className, styles.field)}>
      <input
        className={classNames(
          styles.fieldInput,
          invalid? styles.fieldInputWrong : '',
        )}
        type={type}
        name={name}
        value={value}
        title={title}
        placeholder={title}
        onChange={onChange}
      />
      <label className={styles.fieldLabel} htmlFor={name}>
        {title}
      </label>
    </div>
  );
}
