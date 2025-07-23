import {
  useRef,
  useState,
  useEffect,
  PropsWithoutRef,
  RefAttributes,
  ForwardRefExoticComponent,
  useMemo,
  useCallback
} from 'react';
import useModal from '@/shared/hooks/useModal';
import TableWrapper from '@/shared/components/table/TableWrapper/TableWrapper';
import BaseModal from '@/shared/components/modal/BaseModal/BaseModal';
import {BaseModalFooter} from '@/shared/components/modal/BaseModal/BaseModalFooter/BaseModalFooter';
import {SearchFilter} from "@/shared/components/searchFilter/SearchFilter";
import {PageType} from "@/shared/enum/PageType";
import {MODAL_TITLE} from "@/shared/contants/modalMessage";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {useTableSelection} from "@/shared/hooks/useTableSelection";

export interface BaseModalFormProps<T> {
  editData: T | null;
  onCanSubmitChange: (v: boolean) => void;
}

interface ListPageProps<T extends { id: string | number }, F extends BaseModalFormProps<T>> {
  pageType: PageType;
  filterSchemaKey: PageType;
  columns: any;
  fetchData: (opts: {
    sortKey: string;
    sortOrder: string;
    filter: Record<string, any>;
    page: number;
    size: number;
  }) => Promise<T[]>;
  ModalBody: ForwardRefExoticComponent<PropsWithoutRef<F> & RefAttributes<any>> | any;
  modalBodyProps?: Omit<F, keyof BaseModalFormProps<T>>;
  initialFilter?: Record<string, any>;
  initialSortKey?: string;
  onSubmitEdit?: (formData: Partial<T>) => Promise<boolean>;
  onSubmitAdd?: (formData: Partial<T>) => Promise<boolean>;
  onDelete?: (id: string) => void;
  initialData?: T[]
}

function ListPage<T extends { id: string | number }, F extends BaseModalFormProps<T>>(
  {
    pageType,
    filterSchemaKey,
    columns,
    fetchData,
    ModalBody,
    modalBodyProps,
    initialFilter,
    initialSortKey,
    onSubmitEdit,
    onSubmitAdd,
    onDelete,
    initialData
  }: ListPageProps<T, F>,
) {
  const {isOpen, open, close} = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  const editAreaRef = useRef<any>(null);

  const [editTarget, setEditTarget] = useState<T | null>(null);
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 10});

  const [clickedItem, setClickedItem] = useState<T | undefined>();

  const [filter, setFilter] = useState<Record<string, any>>(initialFilter || {});

  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([
    {id: initialSortKey || 'id', desc: false}
  ]);

  const [enabled, setEnabled] = useState(false);
  const [filterVersion, setFilterVersion] = useState(0);

  const currentSort = useMemo(() => {
    return sorting[0] || {id: initialSortKey || 'id', desc: false};
  }, [sorting, initialSortKey]);

  const sortKey = currentSort.id;
  const sortOrder = currentSort.desc ? 'desc' : 'asc';

  const [canSubmit, setCanSubmit] = useState(false);

  const {data: dataSource = [], isLoading, isFetching, refetch} = useQuery({
    queryKey: ['list', pageType],
    queryFn: () => {
      return fetchData({
        sortKey,
        sortOrder,
        filter,
        page: pagination.pageIndex,
        size: pagination.pageSize
      });
    },
    initialData: initialData,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled
  });

  const {rowSelection, onRowSelectionChange} = useTableSelection<T>(dataSource, ids => {
    console.log(`${pageType} selected`, ids);
  });

  const handleSubmit = () => {
    setFilterVersion(prev => prev + 1)
    setPagination(prev => ({...prev, pageIndex: 0}));
  };

  const handleEdit = (row: T) => {
    setEditTarget(row);
    open();
  }

  const handleAdd = useCallback(() => {
    setEditTarget(null);
    open();
  },[setEditTarget, open]);

  const handleSubmitForm = async () => {

    if (!editAreaRef.current?.submit) return;
    const result = await editAreaRef.current.submit();

    if (!result) return;
    let success = false;

    if (editTarget && onSubmitEdit) {
      success = await onSubmitEdit(result);
    } else if (onSubmitAdd) {
      success = await onSubmitAdd(result);
    }

    if (success) {
      toast.success(editTarget ? '수정 완료' : '등록 완료');
      refetch();
      close();
    } else {
      toast.error('처리에 실패했습니다.');
    }
  }

  const handleDelete = useCallback(() => {},[])

  const handleChangeFilter = (val: any) => {
    console.log(val);
    setFilter(val);
  }

  // @TODO tanstack/react-table 에서 항상 새로운 배열만들면서 참조달라짐. query key 에 넣을수없을듯.
  // 추후 방법 찾아보기.
  useEffect(() => {
    if (enabled) {
      refetch();
    }
  }, [sortKey, sortOrder, pagination.pageSize, pagination.pageIndex, filterVersion])

  useEffect(() => {
    setEnabled(true);
  }, []);

  // @ts-ignore
  return (
    <>
      <SearchFilter
        onAdd={handleAdd}
        ref={inputRef}
        value={filter}
        onChange={handleChangeFilter}
        type={filterSchemaKey}
        onSubmit={handleSubmit}
      />

      <TableWrapper<T>
        onSelect={() => {}}
        onEdit={handleEdit}
        onDelete={handleDelete}
        columns={columns}
        data={dataSource}
        sorting={sorting}
        clickedItem={clickedItem}
        onChangeClickedItem={(item) => setClickedItem(item)}
        onSortingChange={(updater) => {
          const next = typeof updater === 'function' ? updater(sorting) : updater;
          if (Array.isArray(next)) {
            setSorting(next);
          }
        }}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        pageCount={Math.ceil(dataSource.length / pagination.pageSize)}
        setPageIndex={index => setPagination(prev => ({...prev, pageIndex: index}))}
        setPageSize={size => setPagination(prev => ({...prev, pageSize: size}))}
      />

      <BaseModal
        title={MODAL_TITLE[pageType]}
        isOpen={isOpen}
        onCloseAction={close}
        maxWidth={'lg'}
        footer={<BaseModalFooter disabled={!canSubmit} onSubmit={handleSubmitForm} close={close}/>}
      >
        <ModalBody
          ref={editAreaRef}
          {...(modalBodyProps as Omit<F, keyof BaseModalFormProps<T>>)}
          editData={editTarget}
          onCanSubmitChange={setCanSubmit}
        />
      </BaseModal>
    </>
  );
}

export default ListPage;

