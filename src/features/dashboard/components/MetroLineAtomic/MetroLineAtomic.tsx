'use client';
import React from 'react';
import styles from './MetroLineAtomic.module.scss';
import {useCongestStepStore} from "@/shared/store/slice/congestStepSlice";

interface Props {
    label: any;
}

function getStripeColor(bgColor: string): string {
    const hex = bgColor?.replace('#', '');
    if (hex?.length !== 6) return 'rgba(255,255,255,0.3)';

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
    }: Props) {

    const {congestStep} = useCongestStepStore();


    const step = congestStep.find((s) => s.dgcnStgNo === label);

    const stripeColor = getStripeColor(step?.indctClorNo);
    const customStyle = {
        backgroundColor: `#${step?.indctClorNo}`,
        backgroundImage: `repeating-linear-gradient(45deg,${stripeColor}, ${stripeColor} 1px,transparent 1px,transparent 3px)`,
    };
    if (!step) return null;
    return (
        <>
            <div className={styles.badge} style={customStyle}>
        <span className={styles.text}>
      {step?.stgNm}
        </span>

                <div className={styles.tooltip}><span>혼잡도</span><span>120%</span></div>
            </div>
        </>
    );
}