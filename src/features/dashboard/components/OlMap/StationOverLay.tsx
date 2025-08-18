import {Feature} from "ol";

export default function StationOverLay({feature}: { feature: Feature }) {
    return <div>{feature.get("name")}</div>
}