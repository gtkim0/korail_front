import NotificationRuleView from "@/features/notification-rules/components/NotificationRuleView/NotificationRuleView";

export default async function NotificationRuleServer () {

  const initialFilter = {}

  return (
    <NotificationRuleView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}