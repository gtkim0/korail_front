'use client';

import {ReactNode, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './ConfirmModal.module.css';
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onCloseAction: () => void;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: string;
}

export default function ConfirmModal({ isOpen, onCloseAction, title, children, maxWidth = 'md' }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={clsx(styles.modal, styles[`maxWidth-${maxWidth}`])}>
        <div className={styles.header}>
          <span>{ title }</span>
          <button className={styles.closeButton} onClick={onCloseAction}>×</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}