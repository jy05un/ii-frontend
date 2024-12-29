import React from 'react';
import NavButton from './NavButton';
import styles from './NavBar.module.css';
import AccountUrl from './icon_account.svg';
import BoardUrl from './icon_board.svg';
import FeedsUrl from './icon_feeds.svg';
import PinUrl from './icon_pin.svg';
import SettingUrl from './icon_setting.svg';
import classNames from 'classnames';

interface ButtonInfo {
  name: string;
  link: string;
  icon: any;
}

export default function Navbar({className}: {className?: string}) {
  const buttonInfos: ButtonInfo[] = [
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

  return (
    <div className={classNames(className, styles.navbar)}>
      <NavButton link="/login" icon={AccountUrl}/>
      <div className={styles.buttons}>
        {buttonInfos.map((info) => (
          <NavButton key={info.name} link={info.link} icon={info.icon} />
        ))}
      </div>
      <NavButton link="/setting" icon={SettingUrl}/>
    </div>
  );
}
