"use client";
import styles from "./OlMap.module.scss"
import {useEffect, useRef} from "react";
import Map from "ol/Map";
import {GeoJSON} from "ol/format";
import VectorSource from "ol/source/Vector";
import polygonData from "@/data/koreaPolygon.json"
import VectorLayer from "ol/layer/Vector";
import {Fill, Stroke, Style} from "ol/style";
import {Feature, View} from "ol";
import {fromLonLat} from "ol/proj";
import Overlay from "ol/Overlay";
import {LineString} from "ol/geom";
import {DEVICE_PIXEL_RATIO} from "ol/has"
import {hexToRgba} from "@/utils/darkenHexColor";
import {defaults as defaultControls} from "ol/control"
import {createRoot} from "react-dom/client";
import StationOverLay from "@/features/dashboard/components/OlMap/StationOverLay";
import {RouteDirectionListType} from "@/types/routes-direction";
import {useGetRoutesList} from "@/features/dashboard/hooks/queryHooks";

interface Props {
    initialData: RouteDirectionListType
}


export default function OlMap({initialData}: props) {
    const pixelRatio = DEVICE_PIXEL_RATIO;

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<Map | null>(null);
    const polygonLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
    const currentOverlay = useRef<Overlay | null>(null);
    const {data} = useGetRoutesList(initialData);

    useEffect(() => {
        if (!mapRef.current) return;

        // 대한민국 지도 레이어
        const vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(polygonData, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
            }),
        });
        const seoulFeature = vectorSource.getFeatures().find((r) => r.get("CTP_ENG_NM") == "Seoul")
        // const extent = seoulFeature.getGeometry().getExtent();

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: new Style({
                stroke: new Stroke({color: "rgba(255,255,255,0.05)", width: 2}),
                fill: new Fill({color: "rgba(43,82,198,0.2)"}),
            }),
        });
        const zoom = pixelRatio == 1 ? 7.9 : 7.5;
        const map = new Map({
            target: mapRef.current,
            view: new View({
                center: fromLonLat([127.8, 36.5]),
                zoom: zoom,
            }),
            controls: defaultControls({zoom: false, rotate: false})
        });

        map.addLayer(vectorLayer);

        // 오버레이 생성

        const targetEl = map.getTargetElement()

        map.on("pointermove", (evt) => {
            const hit = map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
                if (layer == polygonLayerRef.current) return true;
            })
            targetEl.style.cursor = hit ? "pointer" : ""
        })


        // 클릭 이벤트 (polygonLayer만)
        map.on("click", (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (feat, layer) =>
                layer === polygonLayerRef.current ? feat : undefined
            );

            const coordKey = `${evt.coordinate[0]} - ${evt.coordinate[1]}`;

            if (feature) {
                if (currentOverlay.current) {
                    map.removeOverlay(currentOverlay.current);
                    currentOverlay.current = null;
                }

                const container = document.createElement("div");
                const root = createRoot(container);
                container.id = "overlay-container";

                const overlay = new Overlay({
                    element: container,
                    offset: [0, -15],
                    positioning: "bottom-center",
                });
                map.addOverlay(overlay);
                overlay.setPosition(evt.coordinate);

                root.render(<StationOverLay feature={feature} coordKey={coordKey}/>);
                currentOverlay.current = overlay;
            } else {
                if (currentOverlay.current) {
                    map.removeOverlay(currentOverlay.current);
                    currentOverlay.current = null;
                }
            }
        });

        // map.getTargetElement().addEventListener("wheel", () => {
        //     if (currentOverlay) {
        //         map.removeOverlay(currentOverlay);
        //         currentOverlay = null;
        //     }
        // })

        mapInstance.current = map;
        return () => {
            map.setTarget(undefined);
            mapInstance.current = null;
            currentOverlay.current = null;
        };
    }, []);

    useEffect(() => {
        if (!mapInstance.current || !data.list) return;

        // 기존 레이어 제거
        if (polygonLayerRef.current) {
            mapInstance.current.removeLayer(polygonLayerRef.current);
            polygonLayerRef.current = null;
        }
        // 기존 오버레이 제거
        if (currentOverlay.current) {
            mapInstance.current.removeOverlay(currentOverlay.current);
            currentOverlay.current = null;
        }

        // 새 VectorSource 생성
        const vectorSource = new VectorSource();

        data?.list?.forEach((d) => {
            console.log(d)
            const feature = new Feature({
                geometry: new LineString(d?.trifStnms?.map((i) => fromLonLat([i?.stnPstnYcod, i?.stnPstnXcod]))),
                lnNm: d.lnNm,
            });

            const outLineStyle = new Style({
                stroke: new Stroke({color: hexToRgba(d.lnClorNo, 0.3), width: 10}),
            });
            const strokeStyle = new Style({
                stroke: new Stroke({
                    color: d.lnClorNo,
                    width: 3,
                    lineDash: [0, 12],
                    lineCap: "square",
                }),
            });

            feature.setStyle([outLineStyle, strokeStyle]);
            vectorSource.addFeature(feature);
        });

        const polygonLayer = new VectorLayer({source: vectorSource});
        mapInstance.current.addLayer(polygonLayer);
        mapInstance.current.getView().setCenter(fromLonLat([127.8, 36.5])); // 초기 중심
        mapInstance.current.getView().setZoom(7.9); // 초기 줌 (pixelRatio 고려 가능)
        polygonLayerRef.current = polygonLayer; // 참조 업데이트
    }, [data]);

    return <div className={styles.container} ref={mapRef}>
        {data?.list?.length > 0 && <div className={styles.legend}>
            {data?.list?.map((el, idx) => {
                return <div key={idx} className={styles.item}>
                    <div className={styles.dot} style={{background: `#${el.lnClorNo}`}}></div>
                    <div>{el.lnNm}</div>
                </div>
            })}
        </div>}
    </div>
}
