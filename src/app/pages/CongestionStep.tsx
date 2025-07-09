// 혼잡도 단계
import PortalContentLayout from "@/features/lyaouts/PortalContentLayout/PortalContentLayout";
import {dummyMenu} from "@/app/pages/Menu";
import CongestionStepView from "@/features/congestionStep/components/congestionStepView/page";

export default async function CongestionStep ({ path }: { path: string}) {
  return (
    <PortalContentLayout path={path} menus={dummyMenu}>
      <CongestionStepView />
    </PortalContentLayout>
  )
}