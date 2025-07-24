import NotificationRecipientView
  from "@/features/notification-recipient/components/NotificationRecipientView/NotificationRecipientView";

export default async function NotificationRecipientServer() {
  const initialFilter = {

  }

  return (
    <NotificationRecipientView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}