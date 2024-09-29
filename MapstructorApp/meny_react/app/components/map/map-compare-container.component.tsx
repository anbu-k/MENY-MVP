'use client';
import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxCompareWrapper from './mapbox-compare.component';
import { MapItem } from '@/app/models/maps/map.model';

const isClient = typeof window !== 'undefined'

type MapComparisonComponentProps = {
  afterMap: MapItem,
  beforeMap: MapItem
}

const MapComparisonComponent = (props: MapComparisonComponentProps) => {  
    return (
      <>
      <MapboxCompareWrapper afterMap={props.afterMap} beforeMap={props.beforeMap}></MapboxCompareWrapper>
      </>
    );
}

export default MapComparisonComponent;