import React, { ChangeEvent, useState } from 'react';
import FormField from '../FormField/FormField';
import styles from './SignInCard.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import Cookies from 'js-cookie';
import FormCard from 'components/FormCard';
import { FormCardProps } from 'components/FormCard/FormCard';

interface SignInCardProps extends FormCardProps{
  username?: string;
  password?: string;
  className?: string;
}

export default function SignInCard({
  username: _username,
  password: _password,
  className,
  onConfirm
}: SignInCardProps) {
  const [username, setUsername] = useState(_username || '');
  const [password, setPassword] = useState(_password || '');

  const { login } = useAuth()

  const onSubmit = () => {
    login({username, password})
      .then(() => {
        alert('okay')
        onConfirm?.()
      })
      .catch((e) => {
        alert('아이고')
        console.log(e)
      })
  };
  return (
    <FormCard className={classNames(className, styles.signInCard)} onSubmit={()=> onSubmit()}>
      <div className={styles.header}>
        <h1 className={styles.title}> signin </h1>
      </div>
      <div
        className={styles.fields}
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
      </div>
      <div className={styles.menus}>
        <Link to="/signup">
          <span> 회원가입</span>
        </Link>

        {/*
        <span> 도움... </span>
        */}
      </div>
    </FormCard>
  );
}
