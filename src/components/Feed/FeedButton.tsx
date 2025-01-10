import React from 'react';
import styles from './Feed.module.css';


interface FeedButtonProps {
  name: string;
  icons: string[];
  onclick?: () => undefined;
}

export default function NavButton({
  name,
  icons,
  onclick
}: FeedButtonProps) {
  return (
    <div className={styles.button} onClick={() => onclick?.()}>
      <img src={icons[0]} alt={name}/>
    </div>
  );
}
