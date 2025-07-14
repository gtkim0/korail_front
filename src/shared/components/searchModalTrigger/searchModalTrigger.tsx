import useModal from "@/shared/hooks/useModal";
import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import {SearchInput} from "@/shared/components/Input/searchInput/SearchInput";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {dummyMenuData} from "@/features/menu/columns/menuColumns";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {useSorting} from "@/shared/hooks/useSorting";
import {useTableSelection} from "@/shared/hooks/useTableSelection";
import {ColumnDef} from "@tanstack/react-table";

interface Props<T extends object> {
  value: string;
  onSelect: (key: string) => void;
  endPoint: string;
  columns: ColumnDef<object, any>[];
  fetchFn?: (args: { sortKey: keyof T; sortOrder: 'asc' | 'desc' }) => Promise<T[]>;
  defaultSortKey?: keyof T;
  title?: string;
  minWidth?: string;
  onRowClick?: (row: T) => void;
  renderTrigger?: ReactNode;
  placeholder?: string;
}

export default function SearchModalTrigger<T extends object>(
  {
    value,
    onSelect,
    endPoint,
    columns,
    fetchFn,
    defaultSortKey = 'id' as keyof T,
    title = '검색',
    minWidth = 'auto',
    onRowClick,
    renderTrigger,
    placeholder
  }: Props<T>) {

  const {isOpen, open, close} = useModal();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<{ key: string; label: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: sortedData,
    sorting,
    onSortingChange,
    loading,
  } = useSorting<T>({
    defaultSortKey: 'name',
    fetchFn: async ({sortKey, sortOrder}) => {
      const res = await fetch(`${endPoint}?sort=${sortKey}&order=${sortOrder}`);
      return res.json();
    },
  });

  const sortedDummyData = useMemo(() => [
    {
      number: 'I26K6',
      name: '좌천역'
    }
  ], []);


  const {
    rowSelection,
    onRowSelectionChange,
    selectedIds,
  } = useTableSelection(sortedDummyData, (ids) => {
    console.log(ids);
  });

  const onSubmit = () => {
  }

  useEffect(() => {
    if (!isOpen || search.length < 2 || !endPoint) return;

    const delay = setTimeout(async () => {
      const res = await fetch(`${endPoint}?query=${encodeURIComponent(search)}`);
      const result = await res.json();
      setSearchResult(result);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, isOpen, endPoint]);

  return (
    <>
      {renderTrigger ? (
        <div onClick={open} style={{display: 'inline-block', cursor: 'pointer'}}>
          {renderTrigger}
        </div>
      ) : (
        <div style={{display: 'flex', alignItems: 'flex-start', gap: '.8rem', alignSelf: 'stretch', cursor: 'pointer'}}>
          <div onClick={open} style={{width: '100%', height: '3.6rem', cursor: 'pointer'}}>
            <SearchInput disabled={true}/>
          </div>
        </div>
      )}

      {isOpen && (
        <BaseModal title={title} isOpen={isOpen} onCloseAction={close}>
          <div style={{padding: '1.6rem', display: 'flex', flexDirection: 'column', flex: 1}}>
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, gap: '1.2rem', alignSelf: 'stretch'}}>
              <div style={{height: '3.6rem'}}>
                <SearchInput
                  placeholder={placeholder}
                  ref={inputRef}
                  onKeyDown={() => {}}
                  onSubmit={() => {}}
                />
              </div>

              <Table
                columns={columns}
                // data={sortedData}
                data={sortedDummyData}
                sorting={sorting}
                onSortingChange={onSortingChange}
                rowSelection={rowSelection}
                onRowSelectionChange={onRowSelectionChange}
                setPagination={setPagination}
                minWidth={minWidth}
              />
            </div>
          </div>
        </BaseModal>
      )}
    </>
  )
}


