'use client';
import {TabProvider} from "@/shared/provider/TabProvider";
import TabList from "@/features/auth/components/TabList/TabList";
import TabContent from "@/features/auth/components/TabContent/TabContent";

export default function FindAccountForm () {
  return (
    <TabProvider initialTab={'find-id'}>
      <TabList />
      <TabContent />
    </TabProvider>
  )
}