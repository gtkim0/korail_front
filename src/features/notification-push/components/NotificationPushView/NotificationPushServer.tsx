import NotificationPushView from "@/features/notification-push/components/NotificationPushView/NotificationPushView";

export default async function NotificationPushServer() {

  const initialFilter = {}

  return (
    <NotificationPushView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}