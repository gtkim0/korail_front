import MenuView from "@/features/menu/components/MenuView/MenuView";

export default async function MenuServer() {

  const initialFilter = {}

  return (
    <MenuView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}