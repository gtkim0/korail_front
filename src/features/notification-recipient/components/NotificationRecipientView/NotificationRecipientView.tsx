'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {notificationRecipientColumns} from "@/features/notification-recipient/columns/notificationRecipientColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import NotificationRecipientAddForm, {
  NotificationRecipientFormType
} from "@/features/notification-recipient/components/NotificationRecipientAddForm/NotificationRecipientAddForm";
import {NotificationRecipientColumnType} from "@/types/notification-recipient";

export interface NotificationRecipientAddFormProps extends BaseModalFormProps<NotificationRecipientFormType> {
}

export default function NotificationRecipientView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<NotificationRecipientColumnType, NotificationRecipientAddFormProps>
      pageType={PageType.NotificationRecipient}
      filterSchemaKey={PageType.NotificationRecipient}
      columns={withRowSelection(notificationRecipientColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async () => {
        return []
      }}
      ModalBody={NotificationRecipientAddForm}
      modalBodyProps={{}}
      onSubmitEdit={async () => {
        return true;
      }}
      onSubmitAdd={async (value) => {
        console.log(value);
        return true;
      }}
      onDelete={async (ids) => {
        return true;
      }}
      initialData={initialData}
    />
  )
}