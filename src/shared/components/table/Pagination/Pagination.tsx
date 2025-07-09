import styles from './Pagination.module.css'

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
}

export default function Pagination({
                                     pageIndex,
                                     pageSize,
                                     pageCount,
                                     setPageIndex,
                                     setPageSize,
                                   }: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button onClick={() => setPageIndex(0)} disabled={pageIndex === 0}>
        {'<<'}
      </button>
      <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
        {'<'}
      </button>
      <span>
        {pageIndex + 1} / {pageCount}
      </span>
      <button onClick={() => setPageIndex(pageIndex + 1)} disabled={pageIndex + 1 >= pageCount}>
        {'>'}
      </button>
      <button onClick={() => setPageIndex(pageCount - 1)} disabled={pageIndex + 1 >= pageCount}>
        {'>>'}
      </button>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[10, 20, 30, 50].map((size) => (
          <option key={size} value={size}>
            {size}개씩 보기
          </option>
        ))}
      </select>
    </div>
  );
}