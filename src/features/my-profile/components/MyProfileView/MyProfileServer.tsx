import MyProfileView from "@/features/my-profile/components/MyProfileView/MyProfileView";
import logger from "@/lib/logger";
import type {AuthMe} from "@/types/auth";
import {serverGetAuth} from "@/shared/api/serverAuth";

export default async function MyProfileServer() {
  const res = await serverGetAuth<AuthMe>("/api/auths/me", undefined, {
    returnTo: "/mypage/profile",
  });

  if (!res?.result?.profile) {
    logger.warn("MyProfileServer: profile 데이터 없음", {res});
    return (
      <div>
        <h2>프로필을 불러오지 못했습니다.</h2>
        <p>잠시 후 다시 시도해 주세요.</p>
      </div>
    );
  }

  return <MyProfileView editData={res.result.profile}/>;
}