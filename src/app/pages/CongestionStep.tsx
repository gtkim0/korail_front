// 혼잡도 단계
import PortalContentLayout from "@/features/lyaouts/PortalContentLayout/PortalContentLayout";
import CongestionStepView from "@/features/congestionStep/components/congestionStepView/page";
import {dummyMenu} from "@/data/dummyMenu";

export default async function CongestionStep ({ path }: { path: string}) {
  return (
    <PortalContentLayout path={path} menus={dummyMenu}>
      <CongestionStepView />
    </PortalContentLayout>
  )
}