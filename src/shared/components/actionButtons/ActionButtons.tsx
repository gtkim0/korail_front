import React from 'react';
import styles from './ActionButtons.module.css';
import clsx from 'clsx';

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'normal' | 'primary' | 'outline' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit';
}

interface ActionButtonsProps {
  buttons: [ActionButton, ActionButton] | [ActionButton];
}

export const ActionButtons = ({ buttons }: ActionButtonsProps) => {
  return (
    <div className={styles.footer}>
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          type={btn.type || 'button'}
          className={clsx(styles.button, {
            [styles.normal]: btn.variant === 'normal',
            [styles.primary]: btn.variant === 'primary',
            [styles.outline]: btn.variant === 'outline' || !btn.variant,
            [styles.danger]: btn.variant === 'danger',
          })}
          onClick={btn.onClick}
          disabled={btn.disabled}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};