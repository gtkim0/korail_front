import {useTab} from "@/shared/provider/TabProvider";
import FindUsernameForm from "@/features/auth/components/FindUsernameForm/FindUsernameForm";
import FindPasswordForm from "@/features/auth/components/FindPasswordForm/FindPasswordForm";

export default function TabContent() {
  const { activeTab } = useTab();

  return (
    <div style={{ width:'100%' }}>
      {activeTab === 'find-id' && <FindUsernameForm />}
      {activeTab === 'find-password' && <FindPasswordForm />}
    </div>
  );
}