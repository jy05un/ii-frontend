import React, { ChangeEvent } from 'react';
import { useState } from 'react';

interface InputItemProps {
  name: string;
  title: string;
  value: string;
  isPassword?: boolean;
  className: string;
}

export default function FormField({
  name,
  title,
  value,
  isPassword,
  className,
}: InputItemProps) {
  const [val, setVal] = useState(value);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value)
  }
  return (
    <div className={className + ' ' + 'form-field'}>
      <label htmlFor={name}>{title}</label>
      <input
        className="form-field__input"
        id={name}
        type={isPassword?"password":"text"}
        name={name}
        value={val}
        title={title}
        onChange={onChange}
      />
    </div>
  );
}
