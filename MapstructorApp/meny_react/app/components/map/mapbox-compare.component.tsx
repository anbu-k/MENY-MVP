"use client";
import mapboxgl from 'mapbox-gl';
import moment from 'moment';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from "react";

export default function MapboxCompareWrapper(props: any) {
  const [MapboxCompare, setMapboxCompare] = useState<any>();
  const hasType = typeof props?.type !== "undefined";

  const mapRef = useRef();
  const beforeMapContainerRef = useRef<HTMLDivElement>(null);
  const afterMapContainerRef = useRef<HTMLDivElement>(null);
  const comparisonContainerRef = useRef<HTMLDivElement>(null);

  const mapStyle = { position: 'absolute', top: 0, bottom: 0, width: '100%' };

    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ';
    mapboxgl.config.ACCESS_TOKEN = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ'

  useEffect(() => {
    import('mapbox-gl-compare').then((mod) => {
        setMapboxCompare(() => mod.default);
        console.log("imported!")
    });
  }, []);

  useEffect(() => {
    if (mapRef.current || !MapboxCompare) return;

    const beforeMap = new mapboxgl.Map({
        container: 'before',
        style: 'mapbox://styles/nittyjee/cjooubzup2kx52sqdf9zmmv2j',
        center: [0, 0],
        hash: true,
        zoom: 0,
        attributionControl: false
      });
  
      const afterMap = new mapboxgl.Map({
        container: 'after',
        style: 'mapbox://styles/nittyjee/cjowjzrig5pje2rmmnjb5b0y2',
        center: [0, 0],
        hash: true,
        zoom: 0,
        attributionControl: false
      });

    mapRef.current = new MapboxCompare(
        beforeMap,
        afterMap,
        comparisonContainerRef.current
    );

    console.log(mapRef.current, afterMap, beforeMap);
  }, [MapboxCompare])

  return (
    <>
        <div
        id="comparison-container"
        ref={comparisonContainerRef}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        >
            <div id="before" ref={beforeMapContainerRef} style={mapStyle as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>}></div>
            <div id="after" ref={afterMapContainerRef} style={mapStyle as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>}></div>
        </div>
    </>
  )
}