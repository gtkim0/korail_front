'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {notificationPushColumns} from "@/features/notification-push/columns/notificationPushColumns";
import NotificationPushAddForm, {
  NotificationPushFormType
} from "@/features/notification-push/components/NotificationPushAddForm/NotificationPushAddForm";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {NotificationPushColumnType} from "@/types/notification-push";

export interface NotificationPushAddFormProps extends BaseModalFormProps<NotificationPushFormType> {}

export default function NotificationPushView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<NotificationPushColumnType, NotificationPushAddFormProps>
      pageType={PageType.NotificationPush}
      filterSchemaKey={PageType.NotificationPush}
      columns={withRowSelection(notificationPushColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={NotificationPushAddForm}
      modalBodyProps={{}}
      onSubmitEdit={async ()=> {
        return true;
      }}
      onSubmitAdd={async (value)=> {
        console.log(value);
        return true;
      }}
      onDelete={async (ids)=> {
        return true;
      }}
      initialData={initialData}
    />
  )
}