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
import SliderWrapper from './SliderWrapper';

export type sources = 'youtube' | 'soup' | 'x' | 'instagram';

const sourceUrls: {
  [key in sources]?: string;
} = {
  youtube: YoutubeUrl,
};

export interface Profile {
  name: string;
  id: string;
  url: string;
  imgUrl: string;
}

export interface XProfile extends Profile {
  subs: number;
}

export const attachmentType = {
  Img: "Img",
  Video: "Video",
  Poll: "Poll"
} as const;
export type AttachmentType = typeof attachmentType[keyof typeof attachmentType];

export interface Attachment {
  type: AttachmentType;
}

export interface Img extends Attachment {
  name?: string;
  url: string;
  alt?: string;
}

export interface FeedProps {
  profile: Profile;
  source: sources;
  title?: string;
  content: string;
  date: Date;
  url: string;
  attachments?: Attachment[];
  logoImgUrl: string;
  logoUrl: string;
}

export default function Feed({
  profile: _profile,
  source: _source,
  title: _title,
  content: _content,
  date: _date,
  url: _url,
  attachments: _attachments,
  logoImgUrl: _logoImgUrl,
  logoUrl: _logoUrl,
  className
}: FeedProps & {className?: string}) {

  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.profileAvatar}>
            <img className={styles.profileAvatarImg} src={_profile.imgUrl}/>
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileNameAndId}>
              <div className="profileName">
                {_profile.name}
              </div>
              <div className={styles.profileId}>
                {_profile.id}
              </div>
            </div>
            {"subs" in _profile ? <div className={styles.profileSubs}></div> : null}
          </div>
        </div>
        <div className={styles.viewProfileButton}>
          <a className={styles.viewProfileButtonA} href={_profile.url}>프로필 보기</a>
        </div>
      </div>
      <div className={styles.attachmentArea}>
        <SliderWrapper attachments={_attachments}></SliderWrapper>
      </div>
      <div className={styles.viewMore}>
        <a className={styles.viewMoreA} href={_logoUrl}>
          {`${_source.toUpperCase()}에서 더보기`}
        </a>
      </div>
      <div className={styles.feedback}>
        <div className={styles.like}></div>
        <div className={styles.comment}></div>
        <div className={styles.share}></div>
        <div className={styles.save}></div>
      </div>
      <div className={styles.caption}>
        <b>{_profile.id}</b><br/><br/>
        {_content}
      </div>
      <div className={styles.footer}>
        <div className={styles.date}>
          {_date.toDateString()}
        </div>
        <img className={styles.logo} src={_logoImgUrl}/>
      </div>
    </div>
  );

  
}
