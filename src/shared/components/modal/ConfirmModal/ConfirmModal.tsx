'use client';

import {ReactNode, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './ConfirmModal.module.css';
import clsx from "clsx";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {ActionButtons} from "@/shared/components/actionButtons/ActionButtons";

interface Props {
  isOpen: boolean;
  onCloseAction: () => void;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: string;
  actionButtons?: ReactNode;
}

export default function ConfirmModal({isOpen, onCloseAction, title, children, maxWidth = 'lg', actionButtons}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={clsx(styles.modal, styles[`maxWidth-${maxWidth}`])}>
        <div className={styles.header}>
          <span>{title}</span>
          <button className={styles.closeButton} onClick={onCloseAction}>
            <ImageWrapper width={24} height={24} src={'/close.svg'}/>
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>

        <div className={styles.footer}>
          {actionButtons}
        </div>
      </div>
    </div>,
    document.body
  );
}