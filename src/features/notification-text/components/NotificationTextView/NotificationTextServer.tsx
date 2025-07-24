import NotificationTextView from "@/features/notification-text/components/NotificationTextView/NotificationTextView";

export default async function NotificationTextServer() {
  const initialFilter = {}

  return (
    <NotificationTextView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}