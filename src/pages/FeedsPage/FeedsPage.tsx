import React from 'react';
import styles from './FeedsPage.module.css';
import Feed from 'components/Feed';
import { FeedProps } from 'components/Feed/Feed';

export default function FeedsPage() {
  const feedsList: (FeedProps & { id: number })[] = [
    {
      id: 1,
      profileUrl: 'https://placehold.co/64x64',
      name: 'Necesarilly Long Name',
      source: 'youtube',
      date: new Date(),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 2,
      profileUrl: 'https://placehold.co/64x64',
      name: 'name',
      source: 'youtube',
      date: new Date(),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 3,
      profileUrl: 'https://placehold.co/64x64',
      name: 'name',
      source: 'youtube',
      date: new Date(),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 4,
      profileUrl: 'https://placehold.co/64x64',
      name: 'name',
      source: 'youtube',
      date: new Date(),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 5,
      profileUrl: 'https://placehold.co/64x64',
      name: 'name',
      source: 'youtube',
      date: new Date(),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  return (
    <div className={styles.feedsPage}>
      <div className={styles.feedsArray}>
        <div className={styles.feeds}>
          {feedsList.map((f) => (
            <Feed
              className={styles.feed}
              key={f.name}
              profileUrl={f.profileUrl}
              name={f.name}
              source={f.source}
              date={f.date}
              content={f.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
