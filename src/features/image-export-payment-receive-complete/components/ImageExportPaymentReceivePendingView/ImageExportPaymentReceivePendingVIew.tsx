'use client';
import ListPage, {RenderToolbarRight, ToolbarCtx, ToolbarHelpers} from "@/shared/components/listPage/ListPage";
import {PageServerProps, PaginationResponseType} from "@/types/common";
import {PageType} from "@/shared/enum/PageType";
import {
  receivePendingColumns
} from "@/features/image-export-payment-receive-pending/columns/paymentReceivePendingColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import useModal from "@/shared/hooks/useModal";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import ConfirmModal from "@/shared/components/modal/ConfirmModal/ConfirmModal";
import {ImageExportPaymentReceivePending} from "@/types/image-export-payment-receive-pending";

export default function ImageExportPaymentReceivePendingView({initialFilter, initialData}: PageServerProps) {

  const {isOpen: rejectOpen, open: setRejectOpen, close: setRejectClose} = useModal();
  const {isOpen: subRejectOpen, open: setSubRejectOpen, close: setSubRejectClose} = useModal();

  return (
    <ListPage
      renderToolbarRight={({selectedIds, selectedRows, clickedItem, totalRows}) => {
        return (
          <div style={{display: 'flex', gap: '1rem', height: '3.2rem'}}>
            <button>삭제</button>
            <button onClick={setSubRejectOpen}>반려</button>
            <button onClick={setRejectOpen}>승인</button>
          </div>
        )
      }}
      pkColumn={'exportRequestDate'}
      pageType={PageType.ImageExportPaymentReceivePending}
      filterSchemaKey={PageType.ImageExportPaymentReceivePending}
      columns={withRowSelection(receivePendingColumns)}
      fetchData={async ({sortKey, sortOrder, filter, page, pagePerSize}) => {
        return {} as PaginationResponseType<ImageExportPaymentReceivePending>
      }}
      initialFilter={initialFilter}
      renderModals={(
        {
          selectedRows,
          selectedIds,
          clickedItem,
          totalRows,
          refetch
        }: ToolbarCtx<any> & ToolbarHelpers
      ) => {

        // console.log(selectedRows);
        // console.log(selectedIds);
        // console.log(clickedItem);
        // console.log(totalRows);
        // console.log(refetch);

        return (
          <>
            <BaseModal
              isOpen={rejectOpen}
              title={'승인'}
              onCloseAction={setRejectClose}
            >
              asd
            </BaseModal>

            <ConfirmModal isOpen={subRejectOpen} onCloseAction={setSubRejectClose}>
              반려?
            </ConfirmModal>
          </>
        )
      }}
    />
  )
}

/**
 * renderModals 가 있으면 ModalBody 가 없어야되나? 아님 이걸 각자 봐야되나 모르겠네.
 */