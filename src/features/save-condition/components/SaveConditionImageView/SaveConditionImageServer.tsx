import SaveConditionImageView from "@/features/save-condition/components/SaveConditionImageView/SaveConditionImageView";

export default async function SaveConditionImageServer() {

  const initialFilter = {

  }

  return (
    <SaveConditionImageView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}