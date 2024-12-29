import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import styles from './SignInCard.module.css';
import classNames from 'classnames';

interface InputItemProps {
  name: string;
  title: string;
  value: string;
  type: string;
  className: string;
  onChange?: any;
}

export default function FormField({
  name,
  title,
  value,
  type,
  className,
  onChange
}: InputItemProps) {

  return (
    <div className={classNames(className, styles.field)}>
      <label htmlFor={name}>{title}</label>
      <input
        className="form-field__input"
        id={name}
        type={type}
        name={name}
        value={value}
        title={title}
        onChange={onChange}
      />
    </div>
  );
}
