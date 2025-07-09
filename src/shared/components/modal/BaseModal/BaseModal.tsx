'use client';
import {ReactNode, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './BaseModal.module.css';
import clsx from "clsx";
import Image from "next/image";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";

interface Props {
  isOpen: boolean;
  onCloseAction: () => void;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: string;
  footer?: ReactNode;
}

export default function BaseModal({ isOpen, onCloseAction, title, children, maxWidth = 'md',footer }: Props) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={clsx(styles.modal, styles[`maxWidth-${maxWidth}`])}>
        <div className={styles.header}>
          <span className={styles.title}>{ title }</span>
          <button className={styles.closeButton} onClick={onCloseAction}>
            <ImageWrapper src={'/close.svg'} alt={'logo'} width={24} height={24}/>
          </button>
        </div>
        {children}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}