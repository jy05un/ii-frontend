import React, { ChangeEvent, useEffect, useState } from 'react';
import FormField from 'components/FormField';
import styles from './SignUpCard.module.css';
import classNames from 'classnames';
import FormCard, { FormCardProps } from 'components/FormCard/FormCard';
import { useAuth } from 'hooks/useAuth';

interface SignUpCardProps extends FormCardProps {
  username?: string;
  email?: string;
  nickname?: string;
  className?: string;
}

export default function SignUpCard({
  username: _username,
  email: _email,
  nickname: _nickname,
  className,
  onConfirm
}: SignUpCardProps) {
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
    const timeout = setTimeout(() => validateFields(), 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [username, password, passwordCheck, email, nickname]);

  const notice = (message: string) => {
    alert(message)
  }

  const validateFields = async () => {
    try {
      if (password !== passwordCheck) {
        throw Error('password and passwordCheck does not match', { cause: { source: 'password', reason: 'pair' } })
      }
      await validate({
        username: username || undefined,
        password: password || undefined,
        email: email || undefined,
        nickname: nickname || undefined
      })
      .catch((error) => {throw error})
      if (username) setUsernameValid(true);
      if (password) setPasswordValid(true);
      if (email) setEmailValid(true);
      if (nickname) setNicknameValid(true);
    }
    catch ({ cause: { source, reason } }: any) {
      console.log('caught')
      switch (source) {
        case 'username': {
          if (reason === 'pattern') {
            notice('username은 최소 5자, 최대 32자의 영문 대문자, 소문자, 숫자, 특수문자 -, _만 사용 가능합니다.')
          } else if (reason === 'unique') {
            notice('이미 존재하는 username입니다.')
          }
          setUsernameValid(false)
          break;
        }
        case 'password': {
          if (reason === 'pair') {
            notice('password가 서로 일치하지 않습니다.')
          } else if (reason === 'pattern') {
            notice('비밀번호는 최소 8자, 최대 32자의 대문자, 소문자, 숫자, 특수 문자를 포함해야 합니다.')
          }
          setPasswordValid(false)
          break;
        }
        case 'email': {
          if (reason === 'pattern') {
            notice(`${email}은 유효한 이메일이 아닙니다.`)
          }
          break;
        }
        case 'nickname': {
          if (reason === 'pattern') {
            notice('nickname은 최소 2자, 최대 16자여야 합니다.')
          }
          break;
        }
        case 'register': {
          notice('서버 측에서 register에 실패했습니다')
          break;
        }
      }
      return false
    }
  }

  const onSubmit = async () => {
    if (await validateFields()) {
      const identity = await register({ username, password, email, nickname })
      alert(`hello, ${identity}!`)
      onConfirm?.()
    }
  };

  return (
    <FormCard className={classNames(className, styles.signUpCard)} onSubmit={() => onSubmit()}>
      <div className={styles.header}>
        <h1 className={styles.title}> signup </h1>
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
          title="password"
          value={password}
          type="password"
          invalid={!isPasswordValid}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <FormField
          className={classNames(styles.field, styles.password)}
          name="password 확인"
          title="password 확인"
          value={passwordCheck}
          type="password"
          invalid={!isPasswordValid}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPasswordCheck(e.target.value)
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
          invalid={!isNicknameValid}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
          }
        />
        <button className={styles.confirm} title="회원가입" type="submit">회원가입</button>
      </div>
      <div className={styles.menus}>
      </div>
    </FormCard>
  );
}
