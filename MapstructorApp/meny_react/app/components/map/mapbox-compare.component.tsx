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

  const mapStyle: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {
    style: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%'
    }
};

    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ';
    mapboxgl.config.ACCESS_TOKEN = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ';

  useEffect(() => {
    import('mapbox-gl-compare').then((mod) => {
        setMapboxCompare(() => mod.default);
        console.log("imported!")
    });
  }, []);

  useEffect(() => {
    if (mapRef.current || !MapboxCompare || !comparisonContainerRef.current) return;

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

    if(beforeMapContainerRef.current) {
        beforeMapContainerRef.current.style.position = 'absolute';
        beforeMapContainerRef.current.style.top = '0';
        beforeMapContainerRef.current.style.bottom = '0';
        beforeMapContainerRef.current.style.width = '100%';
    }
    if(afterMapContainerRef.current) {
        afterMapContainerRef.current.style.position = 'absolute';
        afterMapContainerRef.current.style.top = '0';
        afterMapContainerRef.current.style.bottom = '0';
        afterMapContainerRef.current.style.width = '100%';
    }

    if(window) {
        console.log(window)
        window.addEventListener('resize', () => {
        // Your code to execute on window resize
        console.log('Window resized!');
        });
    }

    console.log(mapRef.current, afterMap, beforeMap, comparisonContainerRef);
  }, [MapboxCompare])

  return (
    <>
        <div
        id="comparison-container"
        ref={comparisonContainerRef}
        style={{ height: '100%', position: 'relative' }}
        >
            <div id="before" ref={beforeMapContainerRef} style={mapStyle}></div>
            <div id="after" ref={afterMapContainerRef} style={mapStyle}></div>
        </div>
    </>
  )
}