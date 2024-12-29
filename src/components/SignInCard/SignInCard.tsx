import React, { ChangeEvent, useState } from 'react';
import FormField from './FormField';
import styles from './SignInCard.module.css';
import classNames from 'classnames';

interface SignInCardProps {
  _username?: string;
  _password?: string;
}

export default function SignInCard({ _username, _password }: SignInCardProps) {
  const [username, setUsername] = useState(_username || '');
  const [password, setPassword] = useState(_password || '');

  const onSubmit = () => {
    fetch('http://52.141.48.164:8080/auth/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className={styles['signin-card']}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        action="#"
      >
        <span className={styles.title}> title </span>
        <FormField
          className={classNames(styles.field, styles.id)}
          name="username"
          title="ID"
          value={username}
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <FormField
          className={classNames(styles.field, styles.password)}
          name="password"
          title="PASSWORD"
          value={password}
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button type="submit" hidden></button>
      </form>
    </div>
  );
}
