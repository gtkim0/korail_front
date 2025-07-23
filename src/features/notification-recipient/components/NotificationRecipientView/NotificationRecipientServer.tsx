import NotificationRecipientView
  from "@/features/notification-recipient/components/NotificationRecipientView/NotificationRecipientView";

export default async function NotificationRecipientServer() {
<<<<<<< HEAD
  return (
    <NotificationRecipientView />
=======

  const initialFilter = {

  }

  return (
    <NotificationRecipientView
      initialFilter={initialFilter}
      initialData={[]}
    />
>>>>>>> 1e81324 (fit(비상 대응) - 알림 규칙 퍼블리싱)
  )
}