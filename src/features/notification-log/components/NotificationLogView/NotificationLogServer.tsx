import NotificationLogView from "@/features/notification-log/components/NotificationLogView/NotificationLogView";

export default async function NotificationLogServer() {

  const initialFilter = {}

  return (
    <NotificationLogView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}