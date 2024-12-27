import React from 'react';
import FormField from './FormField';
import styles from "./SignInCard.module.css"

interface LoginCardProps {
  id?: string;
  password?: string;
}

export default function SignInCard({ id, password }: LoginCardProps) {
  return (
    <div className={styles.root}>
      <span className={styles.title}> title </span>
      <FormField className="login-card__id" name="id" title="ID" value={id || ""} />
      <FormField
        className="login-card__password"
        name="password"
        title="PASSWORD"
        value={password || ""}
        isPassword={true}
      />
    </div>
  );
}
