
import { useEffect, useState } from 'react';
import { SortingState, OnChangeFn } from '@tanstack/react-table';

interface UseSortingOptions<T> {
  defaultSortKey?: string;
  fetchFn: (params: { sortKey: string; sortOrder: 'asc' | 'desc' }) => Promise<T[]>;
}

export function useSorting<T>({ defaultSortKey = 'name', fetchFn }: UseSortingOptions<T>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: defaultSortKey, desc: false },
  ]);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const sort = sorting[0];
      const sortKey = sort?.id || defaultSortKey;
      const sortOrder = sort?.desc ? 'desc' : 'asc';
      const result = await fetchFn({ sortKey, sortOrder });
      setData(result);
      setLoading(false);
    };

    fetch();
  }, [sorting]);

  return {
    sorting,
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    data,
    loading,
  };
}