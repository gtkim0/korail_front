import PortalLayout from "@/features/lyaouts/PortalLayout/PortalLayout";
import PortalContentLayout from "@/features/lyaouts/PortalContentLayout/PortalContentLayout";
import {notFound, redirect} from "next/navigation";
import {serverFetcher} from "@/lib/serverFetcher";
import {NormalizeResponseType, ResponseType} from "@/types/common";
import {BaseMenu} from "@/types/menu";
import {isUnauthorized} from "@/lib/errors";

export const dynamic = "force-dynamic";

const DASHBOARD_MENU: BaseMenu = {
  depth: 1,
  lnkgUrlAddrCn: "/dashboard",
  menuExplnCn: "대시보드",
  menuId: "DASHBOARD",
  menuNm: "대시보드",
  upMenuId: "ROOT",
  insdPrgrmIdntfNm: "Dashboard",
  menuSortSn: 1,
  tptlMenuAuthrtrs: null as any,
};

/** 동적 import 로 routing **/
export default async function PageMapper({params}: { params: Promise<{ page: string[] }> }) {

  const {page} = await params;
  if (page?.[0] === '.well-known') {
    return <div>Not Found</div>;
  }
  const path = "/" + (page?.join("/") ?? "");
  const isDashboard = path == "/dashboard";

  //@TODO serverGetAuth 로 변경하여 인증 처리.
  try {
    const response = await serverFetcher<ResponseType<NormalizeResponseType<BaseMenu[]>>>('/api/menus/get-list/render');
    if (response.resultCode !== '0000') return;

    const menuList = response?.result?.list ?? [];

    const menus = [DASHBOARD_MENU, ...menuList];

    const currentMenu = menus?.find(i => i.lnkgUrlAddrCn === path);
    if (!currentMenu?.insdPrgrmIdntfNm) notFound();

    const Component = (await import(`@/app/pages/${currentMenu.insdPrgrmIdntfNm}`))
      .default;

    return (
      <PortalLayout menus={menus} isDashboard={isDashboard}>
        <PortalContentLayout path={path} menus={menus}>
          <Component/>
        </PortalContentLayout>
      </PortalLayout>
    )
  } catch (e) {
    if (isUnauthorized(e)) {
      await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/logout`, {method: "POST"});
      redirect(`/auth/login?redirect=${encodeURIComponent(path)}`);
    }
    throw e;
  }
}