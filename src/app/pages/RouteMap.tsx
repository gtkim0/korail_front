import RouteMapView from "@/features/routeMap/components/RouteMapView/RouteMapView";
import PortalContentLayout from "@/features/lyaouts/PortalContentLayout/PortalContentLayout";
import {BaseMenu} from "@/types/menu";

export default async function RouteMap ({ path, menus }: { path: string, menus: BaseMenu[] }) {
  return (
    <PortalContentLayout path={path} menus={menus}>
      <RouteMapView />
    </PortalContentLayout>
  )
}