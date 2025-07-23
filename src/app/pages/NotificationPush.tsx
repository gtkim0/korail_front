<<<<<<< HEAD
export default async function NotificationPush() {
  return (
    <>
    </>
=======
import NotificationPushServer
  from "@/features/notification-push/components/NotificationPushView/NotificationPushServer";

export default async function NotificationPush() {
  return (
    <NotificationPushServer />
>>>>>>> 1e81324 (fit(비상 대응) - 알림 규칙 퍼블리싱)
  )
}