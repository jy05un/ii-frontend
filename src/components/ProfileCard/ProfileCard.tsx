import React, { ChangeEvent, useEffect, useState } from 'react';
import FormField from 'components/FormField';
import styles from './ProfileCard.module.css';
import classNames from 'classnames';

interface ProfileCardProps {
  username?: string;
  password?: string;
  email?: string;
  nickname?: string;
  className?: string;
}

export default function ProfileCard({
  username: _username,
  password: _password,
  email: _email,
  nickname: _nickname,
  className
}: ProfileCardProps) {
  const [username, setUsername] = useState(_username || '');
  const [isUsernameValid, setUsernameValid] = useState(true);

  const [password, setPassword] = useState(_password || '');

  const [email, setEmail] = useState(_email || '');
  const [isEmailValid, setEmailValid] = useState(true);

  const [nickname, setNickname] = useState(_nickname || '');

  useEffect(() => {
    const timeout = setTimeout(() => checkUsername(), 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [username]);

  useEffect(() => {
    const timeout = setTimeout(() => checkEmail(), 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [email]);

  const checkUsername = () => {
    if (username === '') return;
    fetch(`http://52.141.48.164:8080/api/users/exists/${username}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUsernameValid(result.status !== 'OK');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const checkEmail = () => {
    setEmailValid(emailPattern.test(email));
  };

  const onSubmit = () => {
    checkEmail()
    checkUsername()
    if (!isUsernameValid) {
      alert('username not valid');
      return;
    }

    if (!isEmailValid) {
      alert('email not valid');
      return;
    }
    fetch('http://52.141.48.164:8080/auth/register', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
        email,
        nickname,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        alert('회원가입 성공! 기모따!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={classNames(className, styles.profileCard)}>
      <div className={styles.header}>
        <h1 className={styles.title}> profile </h1>
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
      </form>
      <div className={styles.menus}>

      </div>
    </div>
  );
}
