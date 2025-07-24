'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import { PageType } from "@/shared/enum/PageType";
import {notificationTextColumns} from "@/features/notification-text/columns/notificationTextColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import NotificationTextAddForm
  from "@/features/notification-text/components/NotificationTextAddForm/NotificationTextAddForm";

export interface NotificationTextAddFormProps extends BaseModalFormProps<any>{};

export default function NotificationTextView({initialFilter,initialData}: PageServerProps) {
  return (
    <ListPage
      pageType={PageType.NotificationText}
      filterSchemaKey={PageType.NotificationText}
      columns={withRowSelection(notificationTextColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={NotificationTextAddForm}
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