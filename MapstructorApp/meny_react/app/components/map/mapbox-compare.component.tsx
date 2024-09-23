"use client";
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from "react";
import { CSSProperties } from 'react';
import { addBeforeLayers } from '../maps/beforemap';  

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ';

export default function MapboxCompareWrapper(props: any) {
  const [MapboxCompare, setMapboxCompare] = useState<any>();
  const beforeMapContainerRef = useRef<HTMLDivElement>(null);
  const afterMapContainerRef = useRef<HTMLDivElement>(null);
  const comparisonContainerRef = useRef<HTMLDivElement>(null);

  const mapStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  };

  
  const compareSwiperStyle: CSSProperties = {
    width: '3px',                
    height: '100%',
    background: '#ffffff',
    boxShadow: '0px 0px 3px rgba(0,0,0,0.5)',
    position: 'absolute',
    zIndex: 10,
    cursor: 'ew-resize',
    left: '50%',
  };


  const circleHandleStyle: CSSProperties = {
    backgroundColor: '#007aff',  
    width: '20px',               
    height: '20px',
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    left: '-8.5px',              
    transform: 'translateY(-50%)',
    cursor: 'pointer',           
    zIndex: 20,                  
  };

  useEffect(() => {
    import('mapbox-gl-compare').then((mod) => {
      setMapboxCompare(() => mod.default);
    });
  }, []);

  useEffect(() => {
    if (!MapboxCompare || !comparisonContainerRef.current) return;

    const beforeMap = new mapboxgl.Map({
      container: 'before',
      style: 'mapbox://styles/nittyjee/cjooubzup2kx52sqdf9zmmv2j',
      center: [-74.01454, 40.70024],
      zoom: 15.09,
      bearing: -51.3,
      attributionControl: false,
    });

    const afterMap = new mapboxgl.Map({
      container: 'after',
      style: 'mapbox://styles/nittyjee/cjowjzrig5pje2rmmnjb5b0y2',
      center: [-74.01454, 40.70024],
      zoom: 15.09,
      bearing: -51.3,
      attributionControl: false,
    });

    const mapboxCompare = new MapboxCompare(beforeMap, afterMap, comparisonContainerRef.current);

    beforeMap.on('load', () => {
      addBeforeLayers(beforeMap, '2024-09-16');
    });

    
    const compareSwiper = document.querySelector('.compare-swiper') as HTMLElement;
    if (compareSwiper) {
      Object.assign(compareSwiper.style, compareSwiperStyle); 

   
      const circleHandle = document.createElement('div');
      Object.assign(circleHandle.style, circleHandleStyle);  
      compareSwiper.appendChild(circleHandle);  

      
      circleHandle.onmousedown = function (e) {
        e.preventDefault();

        document.onmousemove = function (e) {
          const newLeft = e.clientX;  

          

        
          mapboxCompare._onMove(newLeft);  
        };

        
        document.onmouseup = function () {
          document.onmousemove = null;
        };
      };
    }
  }, [MapboxCompare]);

  return (
    <div
      id="comparison-container"
      ref={comparisonContainerRef}
      style={{ height: '100vh', width: '100vw', position: 'relative' }}
    >
      {/* Before and After Maps */}
      <div id="before" ref={beforeMapContainerRef} style={mapStyle}></div>
      <div id="after" ref={afterMapContainerRef} style={mapStyle}></div>

      {/* Compare Swiper */}
      <div className="compare-swiper" style={compareSwiperStyle}></div>
    </div>
  );
}