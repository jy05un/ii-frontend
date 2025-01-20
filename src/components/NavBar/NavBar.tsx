import React, { useRef, useState } from 'react';
import NavButton, { NavButtonProps } from './NavButton';
import styles from './NavBar.module.css';
import AccountUrl from './icon_account.svg';
import BoardUrl from './icon_board.svg';
import FeedsUrl from './icon_feeds.svg';
import PinUrl from './icon_pin.svg';
import SettingUrl from './icon_setting.svg';
import classNames from 'classnames';
import PageModal from 'components/PageModal';
import SignUpCard from 'components/SignUpCard';
import SignInCard from 'components/SignInCard';
import ProfileCard from 'components/ProfileCard';
import apiClient from 'api/apiClient';
import { useAuth } from 'hooks/useAuth';

export default function Navbar({ className }: { className?: string }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { identity, refresh } = useAuth();

  const signInModalRef = useRef<HTMLDialogElement>(null);
  const profileModalRef = useRef<HTMLDialogElement>(null);

  const buttonInfos: NavButtonProps[] = [
    {
      name: 'feeds',
      link: '/feeds',
      icon: FeedsUrl,
    },
    {
      name: 'board',
      link: '/board',
      icon: BoardUrl,
    },
    {
      name: 'pin',
      link: '/pinned',
      icon: PinUrl,
    },
  ];

  const onLoginChanged = ({ target }: { target: HTMLInputElement }) => {
    identity()
    setLoggedIn(target.checked);
  };

  const onClickAccount = () => {
    if (isLoggedIn) {
      profileModalRef.current?.showModal();
    } else {
      signInModalRef.current?.showModal();
    }
  };

  return (
    <div className={classNames(className, styles.navbar)}>
      <input type="checkbox" onChange={(e) => onLoginChanged(e)} />
      <NavButton name="account" icon={AccountUrl} onClick={onClickAccount} />

      <div className={styles.buttons}>
        {buttonInfos.map((info) => (
          <NavButton
            key={info.name}
            name="login"
            link={info.link}
            icon={info.icon}
          />
        ))}
      </div>
      <NavButton name="setting" link="/setting" icon={SettingUrl} />
      <PageModal ref={signInModalRef} link="/login">
        <SignInCard />
      </PageModal>
      <PageModal ref={profileModalRef} link="/profile">
        <ProfileCard />
      </PageModal>
    </div>
  );
}
