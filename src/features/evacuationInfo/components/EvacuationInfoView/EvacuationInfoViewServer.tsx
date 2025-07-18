import EvacuationInfoView from "@/features/evacuationInfo/components/EvacuationInfoView/EvacuationInfoView";

export default async function EvacuationInfoViewServer() {

  const initialFilter = {
    category: ['1','2','3','4'],
    type: '',
    range1: {
      startDate: new Date(),
      endDate: new Date()
    }
  };

  return (
    <EvacuationInfoView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}