import React, { ChangeEvent, useState } from 'react';
import FormField from '../FormField/FormField';
import styles from './SignInCard.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import Cookies from 'js-cookie';

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

  const { login } = useAuth()

  const onSubmit = () => {
    login({username, password})
      .then(() => {
        alert('okay')
        alert(`access Token: ${Cookies.get('accessToken')}`)
      })
      .catch((e) => {
        alert('아이고')
        console.log(e)
      })
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
