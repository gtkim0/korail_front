// 기본정보 -> 메뉴정보 -> 배너정보
import BannerView from "@/features/banner/BannerView/page";
import PortalContentLayout from "@/features/lyaouts/PortalContentLayout/PortalContentLayout";
import {dummyMenu} from "@/app/pages/Menu";

export default async function Banner ({ path }: { path: string }) {


  console.log('asdasd')

  // 서버컴포넌트랑 breadcrumb 은  여기서 path 받은거 기준으로 서버컴포넌트 처리.

  // 여기서 path 해가지고 이름 넘기기

  // 전체 메뉴가져오는 api 하나 호출,
  // 현재 path
  // 다 contentLayout 에 넘겨서 현재 title, breadCrumb 를 서버 컴포넌트로 적용

  // 나중에 메뉴관리에서 수정하거나 등록하거나 하면 menu 가져오는 함수 다시부르기.

  return (
    <PortalContentLayout path={path} menus={dummyMenu}>
      <BannerView />
    </PortalContentLayout>
  )
}