'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {NotificationRuleColumnType} from "@/types/notification-rule";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {notificationRuleColumns} from "@/features/notification-rules/columns/notificationRuleColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import NotificationRuleAddForm, {
  NotificationRuleFormType
} from "@/features/notification-rules/components/NotificationRuleAddForm/NotificationRuleAddForm";

export interface NotificationRuleAddFormProps extends BaseModalFormProps<NotificationRuleFormType> {
}

export default function NotificationRuleView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<NotificationRuleColumnType, NotificationRuleAddFormProps, any>
      pageType={PageType.NotificationRule}
      filterSchemaKey={PageType.NotificationRule}
      columns={withRowSelection(notificationRuleColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async () => {
        return []
      }}
      ModalBody={NotificationRuleAddForm}
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