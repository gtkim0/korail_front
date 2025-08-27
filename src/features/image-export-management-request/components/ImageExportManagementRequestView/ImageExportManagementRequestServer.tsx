import ImageExportManagementRequestView
  from "@/features/image-export-management-request/components/ImageExportManagementRequestView/ImageExportManagementRequestView";

export default async function ImageExportManagementRequestServer() {

  const initialFilter = {}

  return (
    <ImageExportManagementRequestView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}