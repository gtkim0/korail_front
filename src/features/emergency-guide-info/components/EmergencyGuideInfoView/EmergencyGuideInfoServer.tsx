import EmergencyGuideInfoView
  from "@/features/emergency-guide-info/components/EmergencyGuideInfoView/EmergencyGuideInfoView";

async function fetchEmergencyGuideList() {
  const res = await fetch(`${process.env.API_URL}/emergency-guide`, {
    // cache: 'no-store',
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("공통코드 fetch 실패");
  return res.json();
}

// export async function fetchEmergencyGuidePageData() {
//   const [listData, commonCodeData] = await Promise.all([
//     fetch(`${process.env.API_URL}/emergency-guide`, { cache: 'no-store' }).then(res => res.json()),
//     fetch(`${process.env.API_URL}/common-codes`, { cache: 'no-store' }).then(res => res.json())
//   ]);
//
//   const groupBy = (arr, key) =>
//     arr.reduce((acc, cur) => {
//       const group = cur.groupCode;
//       if (!acc[group]) acc[group] = [];
//       acc[group].push(cur);
//       return acc;
//     }, {} as Record<string, any[]>);
//
//   return {
//     listData,
//     commonCodes: groupBy(commonCodeData.codes, 'groupCode'), // 예: { shiftType: [...], area: [...] }
//   };
// }

export default async function EmergencyGuideInfoServer () {

  const initialFilter = {}

  return (
    <EmergencyGuideInfoView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}