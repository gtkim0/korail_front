'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {notificationLogColumns} from "@/features/notification-log/columns/notificationLogColumns";
import NotificationLogAddForm from "@/features/notification-log/components/NotificationLogAddForm/NotificationLogAddForm";
import {NotificationLogColumnType} from "@/types/notification-log";

export interface NotificationLogAddFormProps extends BaseModalFormProps<any> {}

export default function NotificationLogView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<NotificationLogColumnType, NotificationLogAddFormProps>
      pageType={PageType.NotificationLog}
      filterSchemaKey={PageType.NotificationLog}
      columns={withRowSelection(notificationLogColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={NotificationLogAddForm}
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