import React, { useState } from 'react';
import ReactDOM from "react-dom";
import styles from './Feed.module.css';
import { Attachment } from './Feed';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import uuid from 'react-uuid';


interface SliderWrapperProps {
  attachments?: Attachment[];
}

export default function SliderWrapper({
  attachments: _attachments
}: SliderWrapperProps) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(1);
  const [position, setPosition] = useState(0); // 요소의 현재 위치를 관리
  const [inProp, setInProp] = useState(true);
  const frameLength = _attachments?.length
  const nodeRef = React.useRef(null)

  const moveLeft = () => {
    setInProp(false); // 애니메이션 트리거 끄기
    setTimeout(() => {
      setPosition((prev) => prev + 100);
      setInProp(true); // 애니메이션 트리거 다시 켜기
    }, 0); // 애니메이션 재실행을 위해 약간의 딜레이
  };

  const moveRight = () => {
    setInProp(false); 
    setTimeout(() => {
      setPosition((prev) => prev - 100);
      setInProp(true);
    }, 0);
  };

  return (
    <div className={styles.sliderWrapper}>
      {currentFrameIndex == 1 ?
        "" :
        <div className={styles.viewBeforeButton} 
          onClick={() => {
            setCurrentFrameIndex(currentFrameIndex - 1 <= 0 ? currentFrameIndex : currentFrameIndex - 1 )
            moveLeft();
          }}>
          <div className={styles.viewBeforeButtonIcon}></div>
        </div>}
      {currentFrameIndex == frameLength ?
        "" :
        <div className={styles.viewNextButton}
          onClick={() => {
            setCurrentFrameIndex(currentFrameIndex + 1 > (frameLength || 0) ? currentFrameIndex : currentFrameIndex + 1 )
            moveRight();
          }}>
          <div className={styles.viewNextButtonIcon}></div>
        </div>}
      <div className={styles.viewIndex}>
        {
          _attachments?.map((_, index) => {
            return (
              <div
                className={currentFrameIndex == index+1 ? classNames(styles.viewIndexIcon, styles.current) : styles.viewIndexIcon}
                key={index}
              ></div>
            );
          })
        }
      </div>
      <CSSTransition
        in={inProp}
        key={uuid()}
        timeout={336}
        classNames={"slide"}
        nodeRef={nodeRef}
      >
        <div className={styles.sliderFrameWrapper}
          ref={nodeRef}
        >
          {
            _attachments?.map((_attachment, index) => {
              return (
                <div className={styles.sliderFrame} key={index}
                  style={index+1 == 1 ? {
                    marginLeft: `${position}%`,
                    transitionDuration: "0.336s"
                  } : {}}
                >
                  <div className={styles.sliderImg}>
                    <img className={styles.sliderImg} src={"url" in _attachment ? _attachment.url as string : ""}></img>
                  </div>
                </div>
              );
            })
          }
        </div>
      </CSSTransition>
    </div>
  );
}
