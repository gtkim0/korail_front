import React, {
  useRef,
  useState,
  useEffect,
  PropsWithoutRef,
  RefAttributes,
  ForwardRefExoticComponent,
  useMemo,
  useCallback, ComponentType
} from 'react';
import useModal from '@/shared/hooks/useModal';
import TableWrapper from '@/shared/components/table/TableWrapper/TableWrapper';
import BaseModal from '@/shared/components/modal/BaseModal/BaseModal';
import {BaseModalFooter} from '@/shared/components/modal/BaseModal/BaseModalFooter/BaseModalFooter';
import {SearchFilter} from "@/shared/components/searchFilter/SearchFilter";
import {PageType} from "@/shared/enum/PageType";
import {MODAL_MESSAGES, MODAL_TITLE} from "@/shared/contants/modalMessage";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {useTableSelection} from "@/shared/hooks/useTableSelection";
import {ActionButtons} from "@/shared/components/actionButtons/ActionButtons";
import ConfirmModal from "@/shared/components/modal/ConfirmModal/ConfirmModal";
import {ColumnDef} from "@tanstack/react-table";
import {PaginationResponseType} from "@/types/common";

export interface BaseModalFormProps<T> {
  editData: T | null;
  onCanSubmitChange: (v: boolean) => void;
}

export interface FilterProps<V> {
  value: V;
  onChange: (v: V) => void;
  onSubmit: () => void;
  onAdd: () => void;
  type: PageType;
  enabledAdd: boolean;
  CustomFilterSubRender: any;
}

type PolymorphicComponent<P> =
  | ComponentType<P>
  | React.ForwardRefExoticComponent<P & React.RefAttributes<HTMLInputElement>
>

interface ListPageProps<T extends { id: string | number }, F, V = Record<string, any>> {
  pageType: PageType;
  filterSchemaKey: PageType;
  FilterComponent?: PolymorphicComponent<FilterProps<V | undefined>>
  CustomFilterSubRender?: ComponentType<FilterProps<V>>;
  columns: ColumnDef<T, any>[];
  fetchData: (params: {
    sortKey: string;
    sortOrder: string;
    filter: V;
    page: number;
    pagePerSize: number;
  }) => Promise<PaginationResponseType<T>>;
  ModalBody?: ForwardRefExoticComponent<PropsWithoutRef<F> & RefAttributes<any>> | any;
  modalBodyProps?: Omit<F, keyof BaseModalFormProps<T>>;
  initialFilter: V;
  initialSortKey?: string;
  onSubmitEdit?: (formData: Partial<T>) => Promise<boolean>;
  onSubmitAdd?: (formData: Partial<T>) => Promise<boolean>;
  onDelete?: (id: string) => void;
  onDownload?: () => void;
  initialData?: T[]
  modalMaxWidth?: 'lg' | 'xl'
}


function ListPage<T extends { id: string | number }, F, V>(
  {
    pageType,
    filterSchemaKey,
    FilterComponent = SearchFilter,
    CustomFilterSubRender,
    columns,
    fetchData,
    ModalBody,
    modalBodyProps,
    initialFilter,
    initialSortKey,
    onSubmitEdit,
    onSubmitAdd,
    onDelete,
    onDownload,
    initialData,
    modalMaxWidth = 'lg'
  }: ListPageProps<T, F, V>,
) {
  const {isOpen, open, close} = useModal();

  const {isOpen: closeModalIsOpen, open: closeModalOpen, close: closeModalClose} = useModal();

  const inputRef = useRef<HTMLInputElement>(null);
  const editAreaRef = useRef<any>(null);

  const [editTarget, setEditTarget] = useState<T | null>(null);
  const [pagination, setPagination] = useState({pageIndex: 1, pageSize: 10});
  const [clickedItem, setClickedItem] = useState<T | null>(null);
  const [filter, setFilter] = useState<V>(initialFilter);

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

  const {data: dataSource, isLoading, isFetching, refetch} = useQuery({
    queryKey: ['list', pageType],
    queryFn: () => {
      return fetchData({
        sortKey,
        sortOrder,
        filter,
        page: pagination.pageIndex,
        pagePerSize: pagination.pageSize
      });
    },
    // initialData: initialData,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled
  });

  const {rowSelection, onRowSelectionChange} = useTableSelection<T>(dataSource?.list || [], ids => {
    console.log(dataSource);
    console.log(`${pageType} selected`, ids);
  });

  const handleSubmit = () => {
    setFilterVersion(prev => prev + 1)
    setPagination(prev => ({...prev, pageIndex: 0}));
  };

  const handleEdit = () => {
    if (!clickedItem) {
      toast.error('수정할 항목을 선택해주세요.')
      return;
    }

    setEditTarget(clickedItem)
    open();
  }

  const handleDownload = () => {
  }

  const handleAdd = useCallback(() => {
    setEditTarget(null);
    open();
  }, [setEditTarget, open]);

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
      toast.success(editTarget ? '수정이 완료되었습니다.' : '등록되었습니다.');
      refetch();
      close();
    } else {
      toast.error('처리에 실패했습니다.');
    }
  }

  const handleDelete = useCallback(() => {
    if (Object.keys(rowSelection).length === 0) {
      toast.error('삭제할 항목을 선택해주세요.');
      return;
    }
    closeModalOpen();
  }, [rowSelection])

  const handleChangeFilter = (val: any) => {
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

  console.log(dataSource);

  // @ts-ignore
  return (
    <>
      <FilterComponent
        onAdd={handleAdd}
        ref={inputRef}
        value={filter}
        onChange={handleChangeFilter}
        type={filterSchemaKey}
        onSubmit={handleSubmit}
        enabledAdd={!!onSubmitAdd}
        CustomFilterSubRender={CustomFilterSubRender}
        // customFilterSubProps={dataSource}
        // customFilterSubProps 에 현재 날짜랑 응답 데이터 같이 넣어줘야함.
      />
      {
        dataSource &&
          <TableWrapper<T>
              onSelect={() => {
              }}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownload={onDownload}
              columns={columns}
              data={dataSource?.list || []}
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
              pageCount={Math.ceil(dataSource?.totalCount / pagination.pageSize)}
              setPageIndex={index => setPagination(prev => ({...prev, pageIndex: index}))}
              setPageSize={size => setPagination(prev => ({...prev, pageSize: size}))}
              enabledEdit={!!onSubmitEdit}
              enabledDelete={!!onDelete}
          />
      }

      {
        ModalBody &&
          <BaseModal
              title={MODAL_TITLE[pageType]}
              isOpen={isOpen}
              onCloseAction={close}
              maxWidth={modalMaxWidth}
              footer={<BaseModalFooter disabled={!canSubmit} onSubmit={handleSubmitForm} close={close}/>}
          >
              <ModalBody
                  ref={editAreaRef}
                  {...(modalBodyProps as Omit<F, keyof BaseModalFormProps<T>>)}
                  editData={editTarget}
                  onCanSubmitChange={setCanSubmit}
              />
          </BaseModal>
      }

      <ConfirmModal
        title={'삭제'}
        isOpen={closeModalIsOpen}
        onCloseAction={closeModalClose}
        actionButtons={
          <ActionButtons
            buttons={[
              {
                label: '취소',
                onClick: close,
                variant: 'normal',
              },
              {
                label: '삭제',
                onClick: () => {
                },
                variant: 'primary',
                disabled: false,
              },
            ]}
          />
        }
      >
        {MODAL_MESSAGES.deleteContent.message}
      </ConfirmModal>
    </>
  );
}

export default ListPage;

