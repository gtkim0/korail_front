'use client';
import {ReactNode, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './ConfirmModal.module.css';
import clsx from "clsx";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import { AnimatePresence, motion } from 'framer-motion';

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={clsx(styles.modal, styles[`maxWidth-${maxWidth}`])}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.header}>
              <span>{title}</span>
              <button className={styles.closeButton} onClick={onCloseAction}>
                <ImageWrapper width={24} height={24} src={'/close.svg'} />
              </button>
            </div>
            <div className={styles.content}>{children}</div>
            <div className={styles.footer}>{actionButtons}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}