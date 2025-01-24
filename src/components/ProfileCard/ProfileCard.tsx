import React, { ChangeEvent, useEffect, useState } from 'react';
import FormField from 'components/FormField';
import styles from './ProfileCard.module.css';
import classNames from 'classnames';
import { useAuth } from 'hooks/useAuth';
import FormCard from 'components/FormCard';
import { FormCardProps } from 'components/FormCard/FormCard';

interface ProfileCardProps extends FormCardProps {
  username?: string;
  email?: string;
  nickname?: string;
  className?: string;
}

export default function ProfileCard({
  username: _username,
  email: _email,
  nickname: _nickname,
  className,
  onConfirm
}: ProfileCardProps) {
  const { validate, register } = useAuth()
  const [username, setUsername] = useState(_username || '');
  const [isUsernameValid, setUsernameValid] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordValid, setPasswordValid] = useState(true);

  const [email, setEmail] = useState(_email || '');
  const [isEmailValid, setEmailValid] = useState(true);

  const [nickname, setNickname] = useState(_nickname || '');
  const [isNicknameValid, setNicknameValid] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {  return  }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [username, password, passwordCheck, email, nickname]);

  return (
    <FormCard className={classNames(className, styles.profileCard)} onSubmit={() => null}>
      <div className={styles.header}>
        <h1 className={styles.title}> profile </h1>
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
          invalid={!isUsernameValid}
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
        <FormField
          className={classNames(styles.field, styles.email)}
          name="email"
          title="Email"
          value={email}
          type="text"
          invalid={!isEmailValid}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <FormField
          className={classNames(styles.field, styles.nickname)}
          name="nickname"
          title="Nickname"
          value={nickname}
          type="nickname"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
          }
        />
        <button type="submit" hidden></button>
      </div>
      <div className={styles.menus}>

      </div>
    </FormCard>
  );
}
