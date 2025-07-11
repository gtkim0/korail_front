import PortalContentLayout from "@/features/lyaouts/PortalContentLayout/PortalContentLayout";
import {BaseMenu} from "@/types/menu";
import OperationInfoView from "@/features/operationInfo/components/OperationInfoView/OperationInfoView";

export default async function OperationInfo ({path, menus}: { path: string, menus: BaseMenu[] }) {
  return (
    <PortalContentLayout path={path} menus={menus}>
      <OperationInfoView />
    </PortalContentLayout>
  )
}