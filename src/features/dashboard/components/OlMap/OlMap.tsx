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
import ReactDOM from "react-dom/client";
import {DEVICE_PIXEL_RATIO} from "ol/has"
import {hexToRgba} from "@/utils/darkenHexColor";
import {defaults as defaultControls} from "ol/control"

function Popup({name}: { name: string }) {
    return (
        <div
            id="popup-container"
            style={{
                backgroundColor: "red",
                padding: "5px 10px",
                border: "1px solid black",
                borderRadius: "4px",
            }}
        >
            <strong>{name}</strong>
        </div>
    );
}

export default function OlMap() {
    const pixelRatio = DEVICE_PIXEL_RATIO;

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<Map | null>(null);
    const overlayRef = useRef<Overlay | null>(null);
    const overlayRootRef = useRef<ReactDOM.Root | null>(null);
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
        const container = document.createElement("div");
        container.id = "garam"
        const overlay = new Overlay({
            element: container,
            offset: [0, -15],
            positioning: "bottom-center",
        });
        map.addOverlay(overlay);
        overlayRef.current = overlay;

        // 한 번만 createRoot
        if (!overlayRootRef.current) {
            overlayRootRef.current = ReactDOM.createRoot(container);
        }

        // 클릭 이벤트 (polygonLayer만)
        map.on("click", (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
                if (layer === polygonLayerRef.current) return feat;
            });

            if (feature) {
                overlay.setPosition(evt.coordinate);

                overlayRootRef.current?.render(
                    <Popup name={feature.get("name") || "No Name"}/>,
                );
            } else {
                overlay.setPosition(undefined);
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

    return <div className={styles.container} ref={mapRef}></div>
}
