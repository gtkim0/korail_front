'use client';
import React from 'react';
import styles from './MetroLineAtomic.module.scss';

interface Props {
    label: string;
    width?: number;
    height?: number;
    backgroundColor?: string;
    stripeColor?: string;
    textColor?: string;
    borderRadius?: number;

}

function getStripeColor(bgColor: string): string {
    const hex = bgColor.replace('#', '');
    if (hex.length !== 6) return 'rgba(255,255,255,0.3)';

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150
        ? 'rgba(0, 0, 0, 0.1)'
        : 'rgba(255, 255, 255, 0.3)';
}

export default function MetroLineAtomic(
    {
        label,
        width = 25,
        height = 25,
        backgroundColor = '#FFB800',
        textColor = '#fff',
        borderRadius = 4
    }: Props) {

    const stripeColor = getStripeColor(backgroundColor);

    // console.log(stripeColor);

    const customStyle = {
        width,
        height,
        borderRadius,
        color: textColor,
        backgroundColor: backgroundColor,
        backgroundImage: `repeating-linear-gradient(45deg,${stripeColor}, ${stripeColor} 1px,transparent 1px,transparent 3px)`,
    };

    return (
        <>
            <div className={styles.badge} style={customStyle}>
        <span className={styles.text}>
      {label}
        </span>

                <div className={styles.tooltip}><span>혼잡도</span><span>120%</span></div>
            </div>
        </>
    );
}