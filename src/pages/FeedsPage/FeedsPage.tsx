import React from 'react';
import styles from './FeedsPage.module.css';
import Feed from 'components/Feed';
import { FeedProps, AttachmentType, Img } from 'components/Feed/Feed';


export default function FeedsPage() {
  const feedsList: (FeedProps & { id: number })[] = [
    {
      id: 1,
      profile: {
        name: "주르르",
        id: "@jururu_twitch",
        url: "https://x.com/jururu_twitch",
        imgUrl: "https://pbs.twimg.com/profile_images/1723398787857854464/s7N2UgUv_200x200.jpg"
      },
      source: "x",
      title: "임시 제목~",
      content: "차세돌 엔딩기념! 연재전 컨셉아트 공개스 (여비날 님)",
      date: new Date(),
      url: "https://x.com/jururu_twitch/status/1816738805929632036",
      attachments: [
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMFVua0AAxu1l?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMFm4aIAEl2Ps?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMF2DbwAAo36P?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMGEob0AAyGn2?format=jpg&name=360x360"
        } as Img
      ],
      logoImgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/1134px-X_logo_2023.svg.png",
      logoUrl: "https://x.com/"
    },
    {
      id: 1,
      profile: {
        name: "주르르",
        id: "@jururu_twitch",
        url: "https://x.com/jururu_twitch",
        imgUrl: "https://pbs.twimg.com/profile_images/1723398787857854464/s7N2UgUv_200x200.jpg"
      },
      source: "x",
      title: "임시 제목~",
      content: "차세돌 엔딩기념! 연재전 컨셉아트 공개스 (여비날 님)",
      date: new Date(),
      url: "https://x.com/jururu_twitch/status/1816738805929632036",
      attachments: [
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMFVua0AAxu1l?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMFm4aIAEl2Ps?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMF2DbwAAo36P?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMGEob0AAyGn2?format=jpg&name=360x360"
        } as Img
      ],
      logoImgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/1134px-X_logo_2023.svg.png",
      logoUrl: "https://x.com/"
    },
    {
      id: 1,
      profile: {
        name: "주르르",
        id: "@jururu_twitch",
        url: "https://x.com/jururu_twitch",
        imgUrl: "https://pbs.twimg.com/profile_images/1723398787857854464/s7N2UgUv_200x200.jpg"
      },
      source: "x",
      title: "임시 제목~",
      content: "차세돌 엔딩기념! 연재전 컨셉아트 공개스 (여비날 님)",
      date: new Date(),
      url: "https://x.com/jururu_twitch/status/1816738805929632036",
      attachments: [
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMFVua0AAxu1l?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMFm4aIAEl2Ps?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMF2DbwAAo36P?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMGEob0AAyGn2?format=jpg&name=360x360"
        } as Img
      ],
      logoImgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/1134px-X_logo_2023.svg.png",
      logoUrl: "https://x.com/"
    },
    {
      id: 1,
      profile: {
        name: "주르르",
        id: "@jururu_twitch",
        url: "https://x.com/jururu_twitch",
        imgUrl: "https://pbs.twimg.com/profile_images/1723398787857854464/s7N2UgUv_200x200.jpg"
      },
      source: "x",
      title: "임시 제목~",
      content: "차세돌 엔딩기념! 연재전 컨셉아트 공개스 (여비날 님)",
      date: new Date(),
      url: "https://x.com/jururu_twitch/status/1816738805929632036",
      attachments: [
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMFVua0AAxu1l?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMFm4aIAEl2Ps?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMF2DbwAAo36P?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMGEob0AAyGn2?format=jpg&name=360x360"
        } as Img
      ],
      logoImgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/1134px-X_logo_2023.svg.png",
      logoUrl: "https://x.com/"
    },
    {
      id: 1,
      profile: {
        name: "주르르",
        id: "@jururu_twitch",
        url: "https://x.com/jururu_twitch",
        imgUrl: "https://pbs.twimg.com/profile_images/1723398787857854464/s7N2UgUv_200x200.jpg"
      },
      source: "x",
      title: "임시 제목~",
      content: "차세돌 엔딩기념! 연재전 컨셉아트 공개스 (여비날 님)",
      date: new Date(),
      url: "https://x.com/jururu_twitch/status/1816738805929632036",
      attachments: [
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMFVua0AAxu1l?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMFm4aIAEl2Ps?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMF2DbwAAo36P?format=jpg&name=360x360"
        } as Img,
        {
          type: "Img",
          url: "https://pbs.twimg.com/media/GAQMGEob0AAyGn2?format=jpg&name=360x360"
        } as Img
      ],
      logoImgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/1134px-X_logo_2023.svg.png",
      logoUrl: "https://x.com/"
    },
  ];

  return (
    <div className={styles.feedsPage}>
      <div className={styles.feedsArray}>
        <div className={styles.feeds}>
          {feedsList.map((f) => (
            <Feed
              className={styles.feed}
              key={f.id}
              profile={f.profile}
              source={f.source}
              title={f.title}
              content={f.content}
              date={f.date}
              url={f.url}
              attachments={f.attachments}
              logoImgUrl={f.logoImgUrl}
              logoUrl={f.logoUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
