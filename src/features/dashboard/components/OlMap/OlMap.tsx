"use client";
import styles from "./OlMap.module.scss"
import {useEffect, useRef, useState} from "react";
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
import {line_dummy} from "@/data/dashboard-dummy";
import {DEVICE_PIXEL_RATIO} from "ol/has"
import {hexToRgba} from "@/utils/darkenHexColor";
import {defaults as defaultControls} from "ol/control"
import {createRoot} from "react-dom/client";
import StationOverLay from "@/features/dashboard/components/OlMap/StationOverLay";


export default function OlMap() {
    const pixelRatio = DEVICE_PIXEL_RATIO;

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<Map | null>(null);
    const polygonLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
    const [data, setData] = useState<any[] | null>(null);

    useEffect(() => setData(line_dummy), []);

    useEffect(() => {
        if (!mapRef.current) return;

        // 대한민국 지도 레이어
        const vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(polygonData, {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
            }),
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: new Style({
                stroke: new Stroke({color: "#2C2F3A", width: 2}),
                fill: new Fill({color: "rgba(43,82,198,0.2)"}),
            }),
        });
        const zoom = pixelRatio == 1 ? 7.9 : 7.5
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

        let currentOverlay: Overlay | null = null;

        // 클릭 이벤트 (polygonLayer만)
        map.on("click", (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
                if (layer === polygonLayerRef.current) return feat;
            });

            const coordKey = `${evt.coordinate[0]} - ${evt.coordinate[1]}`
            if (feature) {
                if (currentOverlay) {
                    map.removeOverlay(currentOverlay);
                    currentOverlay = null;
                }
                const container = document.createElement("div");
                const root = createRoot(container);
                container.id = "overlay-container"
                const overlay = new Overlay({
                    element: container,
                    offset: [0, -15],
                    positioning: "bottom-center",
                });
                map.addOverlay(overlay);
                overlay.setPosition(evt.coordinate);

                root.render(
                    <StationOverLay feature={feature} coordKey={coordKey}/>
                )
                currentOverlay = overlay;
            } else {
                if (currentOverlay) {
                    map.removeOverlay(currentOverlay);
                    currentOverlay = null
                }
            }
        });

        mapInstance.current = map;
        return () => {
            map.setTarget(undefined);
            mapInstance.current = null;
        };
    }, []);

    useEffect(() => {
        if (!mapInstance.current || !data || data.length === 0) return;
        // 호선 별 폴리건 레이어
        const vectorSource = new VectorSource();

        data.forEach((d) => {
            const feature = new Feature({
                geometry: new LineString(d.list.map((i) => fromLonLat([i.x, i.y]))),
                name: d.name,
            });

            const outLineStyle = new Style({
                stroke: new Stroke({color: hexToRgba(d.color, 0.3), width: 10}),
            });
            const strokeStyle = new Style({
                stroke: new Stroke({
                    color: d.color,
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
        polygonLayerRef.current = polygonLayer;
    }, [data]);

    return <div className={styles.container} ref={mapRef}>
        {data && data.length > 0 && <div className={styles.legend}>
            {data.map((el, idx) => {
                return <div key={idx} className={styles.item}>
                    <div className={styles.dot} style={{background: el.color}}></div>
                    <div>{el.name}</div>
                </div>
            })}
        </div>}
    </div>
}
