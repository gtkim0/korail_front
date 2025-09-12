import styles from './404.module.scss';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.emoji}>🚧</div>
            <h1 className={styles.title}>페이지를 찾을 수 없습니다</h1>
            <p className={styles.description}>
                존재하지 않거나 삭제된 페이지입니다.
            </p>
            <Link href="/" className={styles.homeButton}>
                홈으로 돌아가기
            </Link>

            {/*<div*/}
            {/*    style={{*/}
            {/*        marginTop: '10rem',*/}
            {/*        display: 'flex',*/}
            {/*        gap: '1px'*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <MetroLineAtomic label={'혼잡'} backgroundColor={'#F4AA21'}/>*/}
            {/*    <MetroLineAtomic label={'심각'} backgroundColor={'#FF1500'}/>*/}
            {/*    <MetroLineAtomic label={'보통'} backgroundColor={'#009856'}/>*/}
            {/*    <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>*/}
            {/*    <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>*/}
            {/*    <CongestionStats*/}
            {/*        time="14:00"*/}
            {/*        levels={[*/}
            {/*            {key: 'normal', label: '보통', count: 402, percent: 60},*/}
            {/*            {key: 'warning', label: '주의', count: 108, percent: 18},*/}
            {/*            {key: 'congested', label: '혼잡', count: 94, percent: 14},*/}
            {/*            {key: 'critical', label: '심각', count: 32, percent: 8},*/}
            {/*        ]}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
}