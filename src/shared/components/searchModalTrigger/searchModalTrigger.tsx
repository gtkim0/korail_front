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
  height?: string;
  isOpen: boolean;
  onOpen: ()=> void;
  onClose: ()=> void;
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
    placeholder,
    height = '3.6rem',
    isOpen,
    onOpen,
    onClose
  }: Props<T>) {

  // const {isOpen, open, close} = useModal();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<{ key: string; label: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [ selectedRow, setSelectedRow ] = useState(null);

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
      // const res = await fetch(`${endPoint}?sort=${sortKey}&order=${sortOrder}`);
      // return res.json();
      return [];
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

  const onSubmit = () => {}

  console.log('asd')

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
        <div onClick={onOpen} style={{display: 'inline-block', cursor: 'pointer'}}>
          {renderTrigger}
        </div>
      ) : (
        <div style={{display: 'flex', alignItems: 'flex-start', gap: '.8rem', alignSelf: 'stretch', cursor: 'pointer', flex: 1}}>
          <div onClick={onOpen} style={{height: height, width: '100%', cursor: 'pointer'}}>
            <SearchInput placeholder={placeholder} disabled={true}/>
          </div>
        </div>
      )}

      {isOpen && (
        <BaseModal title={title} isOpen={isOpen} onCloseAction={onClose}>
          <div style={{padding: '1.6rem', display: 'flex', flexDirection: 'column', flex: 1}}>
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, gap: '1.2rem', alignSelf: 'stretch'}}>
              <div style={{height: '3.6rem'}}>
                <SearchInput
                  ref={inputRef}
                  onKeyDown={() => {}}
                  onSubmit={() => {}}
                />
              </div>

              <Table
                columns={columns}
                // data={sortedData}
                data={[
                  {
                    number:'2',
                    name:'123'
                  }
                ]}
                sorting={sorting}
                onSortingChange={onSortingChange}
                rowSelection={rowSelection}
                onRowSelectionChange={onRowSelectionChange}
                onRowSelectChange={(row)=> {
                  console.log(row);
                  setSelectedRow(row)
                }}
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


