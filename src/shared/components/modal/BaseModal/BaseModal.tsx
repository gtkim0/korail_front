'use client';
import {ReactNode, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './BaseModal.module.css';
import clsx from "clsx";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {AnimatePresence, motion} from "framer-motion";
import {PageType} from "@/shared/enum/PageType";

interface Props {
    isOpen: boolean;
    onCloseAction: () => void;
    children: ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';
    title?: string;
    footer?: ReactNode;
    isDashboard?: boolean
}

export default function BaseModal({
                                      isOpen,
                                      onCloseAction,
                                      title,
                                      children,
                                      maxWidth = 'md',
                                      footer,
                                      isDashboard = false
                                  }: Props) {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <motion.div
                        className={clsx(styles.modal, styles[`maxWidth-${maxWidth}`], isDashboard && styles.darkMode)}
                        initial={{scale: 0.95, opacity: 0, y: -20}}
                        animate={{scale: 1, opacity: 1, y: 0}}
                        exit={{scale: 0.95, opacity: 0, y: -20}}
                        transition={{duration: 0.2}}
                    >
                        <div className={styles.header}>
                            <span className={styles.title}>{title}</span>
                            <button className={styles.closeButton} onClick={onCloseAction}>
                                <ImageWrapper src={'/close.svg'} alt={'logo'} width={24} height={24}/>
                            </button>
                        </div>
                        {children}
                        {footer && <div className="modal-footer">{footer}</div>}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}