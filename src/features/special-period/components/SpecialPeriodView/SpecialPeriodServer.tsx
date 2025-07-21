import SpecialPeriodView from "@/features/special-period/components/SpecialPeriodView/SpecialPeriodView";

export default async function SpecialPeriodServer() {

  const initialFilter = {}

  return (
    <SpecialPeriodView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}