import styles from './CustomPagination.module.scss';
import clsx from "clsx";
import Image from "next/image";
import ArrowLeft from '@/shared/assets/images/arrow-left.svg';
import ArrowRight from '@/shared/assets/images/arrow-right.svg'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  blockSize?: number;
}

export default function CustomPagination(
  {
    currentPage = 1,
    totalPages,
    onChange,
    blockSize = 10
  }: PaginationProps
) {

  const clamp = (n: number) => Math.min(Math.max(n, 1), totalPages)

  const cp = Math.max(1, currentPage);
  const blockIndex = Math.floor((cp - 1) / blockSize);
  const start = blockIndex * blockSize + 1;
  const end = Math.min(start + blockSize - 1, totalPages);

  const pages = Array.from({length: end - start + 1}, (_, i) => start + i)

  const goFirst = () => onChange(1);
  const goLast = () => onChange(totalPages);

  const goPrev = () => onChange(clamp(currentPage - 1));
  const goNext = () => onChange(clamp(currentPage + 1));

  const goPrevBlock = () => onChange(clamp(start - 1));
  const goNextBlock = () => onChange(clamp(end + 1));

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '3.2rem'
      }}
    >
      <nav aria-label={'pagination'} style={{display: 'flex', gap: 6}}>

        <button
          onClick={goPrev}
          style={{
            background: 'inherit',
            padding: '0 6px 0 2px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Image width={20} height={20} src={ArrowLeft} alt={'icon'}/>
        </button>
        {
          pages.map((p) => (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={(p === currentPage) ? clsx(styles.page, styles.checked) : styles.page}
            >
              {p}
            </button>
          ))
        }
        <button
          onClick={goNext}
          style={{
            background: 'inherit',
            padding: '0 2px 0 6px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Image width={20} height={20} src={ArrowRight} alt={'icon'}/>
        </button>
      </nav>
    </div>
  )
}