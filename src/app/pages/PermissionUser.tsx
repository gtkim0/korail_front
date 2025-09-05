import PermissionUserServer from "@/features/permission-user/components/PermissionUserView/PermissionUserServer";
import {Suspense} from "react";

export default async function PermissionUser() {
  return (
    // <Suspense fallback={<>loading..</>}>
    <PermissionUserServer/>
    // </Suspense>
  )
}