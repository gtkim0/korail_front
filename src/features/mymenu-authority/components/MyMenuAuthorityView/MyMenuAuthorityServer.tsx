import MyMenuAuthorityView from "@/features/mymenu-authority/components/MyMenuAuthorityView/MyMenuAuthorityView";
import {serverGet} from "@/shared/api/serverFetcher";
import {AuthMe} from "@/types/auth";

async function getUser() {
  const response = await serverGet<AuthMe>('/api/auths/me');
  if (response.resultCode !== '0000') {
    return;
  }
  return response.result
}

export default async function MyMenuAuthorityServer() {

  const me = await getUser();

  console.log(me);

  const initialFilter = {
    authList: me?.profile.tptlUserAuthrtrs
  }

  // const codes = useGlobalStore(state => state.codes);

  return (
    <MyMenuAuthorityView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}