import React, { ChangeEvent, useState } from 'react';
import FormField from '../FormField/FormField';
import styles from './SignInCard.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface SignInCardProps {
  username?: string;
  password?: string;
  className?: string;
}

export default function SignInCard({
  username: _username,
  password: _password,
  className,
}: SignInCardProps) {
  const [username, setUsername] = useState(_username || '');
  const [password, setPassword] = useState(_password || '');

  const onSubmit = () => {
    fetch(`${process.env.REACT_APP_WAS_SERVER as string}/auth/login`, {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        alert('로그인 성공! 기모따!');
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className={classNames(className, styles.signInCard)}>
      <div className={styles.header}>
        <h1 className={styles.title}> signin </h1>
      </div>
      <form
        className={styles.forms}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        action="#"
      >
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
        <button className={styles.confirm} title="로그인" type="submit">
          로그인
        </button>
      </form>
      <div className={styles.menus}>
        <Link to="/signup">
          <span> 회원가입</span>
        </Link>

        {/*
        <span> 도움... </span>
        */}
      </div>
    </div>
  );
}
