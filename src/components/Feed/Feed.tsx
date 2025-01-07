import React, { ChangeEvent, useEffect, useState } from 'react';
import FeedButton from './FeedButton'
import styles from './Feed.module.css';
import YoutubeUrl from './icon_youtube.svg';
import LikeUrl from './icon_like_border.svg';
import LikeFilledUrl from './icon_like_filled.svg';
import BookmarkUrl from './icon_bookmark_border.svg';
import BookmarkFilledUrl from './icon_like_filled.svg';
import ShareUrl from './icon_share.svg';
import classNames from 'classnames';

export type sources = 'youtube' | 'soup';

const sourceUrls: {
  [key in sources]?: string;
} = {
  youtube: YoutubeUrl,
};

export interface FeedProps {
  profileUrl?: string;
  name: string;
  source: sources;
  date: Date;
  content: string;
}

export default function Feed({
  profileUrl: _profileUrl,
  name: _name,
  source: _source,
  date: _date,
  content: _content,
  className
}: FeedProps & {className?: string}) {
  return (
    <div className={classNames(className, styles.feed)}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <img src={_profileUrl} />
        </div>
        <div className={styles.identity}>
          <span className={styles.name}>{_name}</span>
          <span className={styles.source}>
            <img src={sourceUrls[_source] || ""} alt={_source} />
          </span>
        </div>
        <div className={styles.date}>{_date.toISOString().split('T')[0]}</div>
      </div>
      <div className={styles.content}>{_content}</div>
      <div className={styles.buttons}>
        <FeedButton name="like" icons={[LikeUrl, LikeFilledUrl]}/>
        <FeedButton name="bookmark" icons={[BookmarkUrl, BookmarkFilledUrl]} />
        <FeedButton name="share" icons={[ShareUrl]} />
      </div>
    </div>
  );
}
