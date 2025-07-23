import NotificationTextView from "@/features/notification-text/components/NotificationTextView/NotificationTextView";

export default async function NotificationTextServer() {
<<<<<<< HEAD
  return (
    <NotificationTextView />
=======

  const initialFilter = {}

  return (
    <NotificationTextView
      initialFilter={initialFilter}
      initialData={[]}
    />
>>>>>>> 1e81324 (fit(비상 대응) - 알림 규칙 퍼블리싱)
  )
}