import React, { ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import styles from './PageModal.module.css';
import classNames from 'classnames';
import { ModalProps } from 'types/modal';
import { ModalRootId } from 'ModalRoot';
import { Link } from 'react-router-dom';

export default function PageModal({
  ref,
  children,
  buttons,
  link,
  onClose,
}: ModalProps & {link: string}) {
  const [isDOMReady, setDOMReady] = useState(false);

  useEffect(() => {
    setDOMReady(true);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    const target = e.target as HTMLDialogElement
    if (target.nodeName === 'DIALOG') {
      target.close()
    }
  }

  return isDOMReady
    ? (ReactDOM.createPortal(
      <dialog className={styles.modal} ref={ref} onClose={() => onClose?.()} onClick={(e) => handleClick(e)}>
        <div className={styles.wrapper}>
          <div className={styles.controls}>
            <Link to={link} >
              <span> original </span>
            </Link>
          </div>
          <div className={styles.content}>{children}</div>
          <div className={styles.buttons}>
            <form method="dialog">
              {buttons?.map((b) => (
                <button
                  className={styles.button}
                  key={b.name}
                  name={b.name}
                  title={b.name}
                  type="button"
                  onClick={() => b.onClick?.()}
                />
              ))}
            </form>
          </div>
        </div>
      </dialog>,
      document.getElementById(ModalRootId) as HTMLElement,
    ))
    : null;
}
