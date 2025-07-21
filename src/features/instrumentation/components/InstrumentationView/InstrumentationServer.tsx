import InstrumentationView from "./InstrumentationView";

export default async function InstrumentationServer() {

  const initialFilter = {
    category: ['1','2','3','4'],
    operatingStatus: null,
    range1: {
      startDate: new Date(),
      endDate: new Date(),
    }
  }

  return (
    <InstrumentationView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}