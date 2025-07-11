// 기본정보 -> 메뉴정보 -> 배너정보
import BannerView from "@/features/banner/components/BannerView/page";
import PortalContentLayout from "@/features/lyaouts/PortalContentLayout/PortalContentLayout";
import {BaseMenu} from "@/types/menu";

export default async function Banner ({ path, menus }: { path: string, menus: BaseMenu[] }) {

  return (
    <PortalContentLayout path={path} menus={menus}>
      <BannerView />
    </PortalContentLayout>
  )
}