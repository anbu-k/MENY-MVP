'use client'
import moment from 'moment';
import { MutableRefObject, useEffect, useRef, useState } from "react";
import SliderWithDatePanel from "./components/slider/slider-with-date-panel.component";
import { GenericPopUpProps } from "./models/popups/generic-pop-up.model";
import SliderPopUp from "./components/right-info-bar/popups/pop-up";
import { SectionLayer, SectionLayerGroup, SectionLayerItem } from "./models/layers/layer.model";
import { IconColors } from "./models/colors.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import SectionLayerComponent from "./components/layers/section-layer.component";
import { FontAwesomeLayerIcons } from "./models/font-awesome.model";
import {CSSTransition} from 'react-transition-group';
import MapComparisonComponent from "./components/map/map-compare-container.component";
import mapboxgl, { FilterSpecification, LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapFiltersGroup } from './models/maps/map-filters.model';
import MapFilterWrapperComponent from './components/map-filters/map-filter-wrapper.component';
import { MapItem, MapZoomProps } from './models/maps/map.model';
import LayerFormButton from './components/forms/buttons/layer-form-button.component';
import Modal from 'react-modal';
import MapFormButton from './components/forms/buttons/map-form-button.component';
import {Map as PrismaMap, LayerSection as PrismaLayerSection, LayerData as PrismaLayer, LayerGroup as PrismaLayerGroup, MapFilterGroup as PrismaMapFilterGroup, MapFilterItem as PrismaMapFilterItem, MapFilterItem, LayerSection} from '@prisma/client';
import EditForm from './components/forms/EditForm';
import './popup.css';
import { getFontawesomeIcon } from './helpers/font-awesome.helper';
import NewLayerSectionForm from './components/forms/NewLayerSectionForm';
import EditSectionData from './components/forms/EditSectionData';


const beforeMapItem: MapItem = {
  name: '1660 Original Castello Plan',
  mapId: 'cjooubzup2kx52sqdf9zmmv2j',
  center: [-74.01454, 40.70024],
  zoom: 15.09,
  bearing: -51.3,
  styleId: 'cjooubzup2kx52sqdf9zmmv2j',
  groupId: ''
}

const afterMapItem: MapItem = {
  name: 'Castello Plan',
  mapId: 'cjowjzrig5pje2rmmnjb5b0y2',
  center: [-74.01454, 40.70024],
  zoom: 15.09,
  bearing: -51.3,
  styleId: 'cjowjzrig5pje2rmmnjb5b0y2',
  groupId: ''
}

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ';
export default function Home() {
  const [currDate, setCurrDate] = useState<moment.Moment | null>(null);
  const [popUp, setPopUp] = useState<GenericPopUpProps | null>(null);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [layerPopupBefore, setLayerPopupBefore] = useState(false);
  const [layerPanelVisible, setLayerPanelVisible] = useState(true);
  const [MapboxCompare, setMapboxCompare] = useState<any>(null);
  const beforeMapContainerRef = useRef<HTMLDivElement>(null);
  const afterMapContainerRef = useRef<HTMLDivElement>(null);
  const comparisonContainerRef = useRef<HTMLDivElement>(null);
  const [activeLayerIds, setActiveLayerIds] = useState<string[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mappedFilterItemGroups, setMappedFilterItemGroups] = useState<MapFiltersGroup[]>([]);
  const [currMaps, setCurrMaps] = useState<PrismaMap[]>([]);
  const [currLayers, setCurrLayers] = useState<PrismaLayer[]>([]);
  const [defaultBeforeMap, setDefaultBeforeMap] = useState<mapboxgl.Map>();
  const [defaultAfterMap, setDefaultAfterMap] = useState<mapboxgl.Map>();
  const [currSectionLayers, setSectionLayers] = useState<SectionLayer[]>();
  const currBeforeMap = useRef<mapboxgl.Map | null>(null);
  const currAfterMap = useRef<mapboxgl.Map | null>(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editFormId, setEditFormId] = useState("");
  const [groupFormOpen, setGroupFormOpen] = useState<boolean>(false);

  const setMapStyle = (map: MutableRefObject<mapboxgl.Map | null>, mapId: string) => {
    if(map?.current) {
      map.current.setStyle(`mapbox://styles/mapny/${mapId.trim()}`);

      // Replace this later
      setTimeout(() => {
        addAllMapLayers();
      }, 1000)
    }
  }

  const addMapLayer = (map: MutableRefObject<mapboxgl.Map | null>, layerConfig: PrismaLayer) => {
    if(map?.current == null) return;
    let hoveredId: string | number | null = null;

    let layerTypes: string[] = ["symbol", "fill", "line", "circle", "heatmap", "fill-extrusion", "raster", "raster-particle", "hillshade", "model", "background", "sky", "slot", "clip"]
    if(layerTypes.includes(layerConfig.type)) {
      let layerStuff =         {
        id: layerConfig.id,
        type: layerConfig.type as unknown as any,
        source: {
          type: 'vector',
          url: layerConfig.sourceUrl,
        },
        layout: {
          visibility: "none"
        },
        "source-layer": layerConfig.sourceLayer,
        paint: {
          "fill-color": "#e3ed58",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.8,
            0.45,
          ],
          "fill-outline-color": "#FF0000",
        }
      }

      var date = parseInt(currDate!.format("YYYYMMDD"));
      var dateFilter: FilterSpecification = [
        "all", 
        ["<=", ["get", "DayStart"], date], 
        [">=", ["get", "DayEnd"], date]
      ];

      if(!map.current?.getLayer(layerConfig.id)) {
        if(layerConfig.time) {
          map.current.addLayer(
            {
              ...layerStuff as any,
              filter: dateFilter
            }
          );
        } else {
          map.current.addLayer(layerStuff as any)
        }
        const handleEvent = createHandleEvent(map, layerConfig);
        map.current.on("mousemove", layerConfig.id, handleEvent);
        map.current.on("mouseleave", layerConfig.id, handleEvent);
        map.current.on("click", layerConfig.id, handleEvent);
        // Store the reference to the handler in a way you can access it later if needed
        (map.current as any)._eventHandlers = (map.current as any)._eventHandlers || {};
        (map.current as any)._eventHandlers[layerConfig.id] = handleEvent;
      }
    }
  }

  function createHandleEvent(map: MutableRefObject<mapboxgl.Map | null>, layerConfig: PrismaLayer) {
    let hoveredId: string | number | null = null;
    let hoverStyleString: string;
    var popUpType: "castello-taxlot" | "lot-event" | "long-island-native-groups" | "dutch-grant";
    var clickVisible: boolean = popUpVisible;
    var previousNid: number | string | undefined;
    var previousName: string | undefined;
    let hoverPopup = new mapboxgl.Popup({ closeOnClick: false, closeButton: false});
    let clickHoverPopUp = new mapboxgl.Popup({ closeOnClick: false, closeButton: false});
    /**
     * This is gross and needs to be redone
     * Popups type needs to be reactified
     * Right now I pass the e event into the popup props
     * and determine type by the type field
     * Same think with hover popup styling Idk how we
     * want to drive this.
     */
    if(layerConfig.layerName === "dutch_grants-5ehfqe")
    {
      popUpType = "dutch-grant";
      hoverStyleString = "<div class='infoLayerDutchGrantsPopUp'><b>Name:</b> {name}<br><b>Dutch Grant Lot:</b> {Lot}</div>";
    }
    else if (layerConfig.layerName === "lot_events-bf43eb")
    {
      popUpType = "lot-event"
      hoverStyleString = "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/{TAXLOT}' target='_blank'>{TAXLOT}</a></h2></b></div>";
    }
    else
    {
      popUpType = "castello-taxlot"
      hoverStyleString = "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b> <br/> {LOT2}</div>";
    }
    return (e: any) => {
        if (e.type === 'click' && layerConfig.click) 
        {
          if(clickHoverPopUp.isOpen())
            {
              clickHoverPopUp.remove();
            }
            clickHoverPopUp
              .setHTML(hoverStyleString)
              .setLngLat(e.lngLat)
              .addTo(map.current!);
            if(clickVisible && previousNid && (previousNid === e.features![0].properties!.nid))
            {
              clickVisible = false;
              setPopUpVisible(clickVisible);
              clickHoverPopUp.remove();
            }
            else if (clickVisible && previousName && (previousName === e.features![0].properties!.name))
            {
              clickVisible = false;
              setPopUpVisible(clickVisible);
              clickHoverPopUp.remove();
            }
            else
            {
              previousName = e.features![0].properties!.name ?? undefined;
              previousNid = e.features![0].properties!.nid ?? undefined;
              setPopUp({
                Aligned: e.features![0].properties!.Aligned ?? undefined,
                DayEnd1: e.features![0].properties!.DayEnd1 ?? undefined,
                notes: e.features![0].properties!.notes ?? undefined,
                styling1: e.features![0].properties!.styling1 ?? undefined,
                block: e.features![0].properties!.block ?? undefined,
                id: e.features![0].properties!.id ?? undefined,
                lot: e.features![0].properties!.lot ?? undefined,
                new_link: e.features![0].properties!.new_link ?? undefined,
                old_link_2: e.features![0].properties!.old_link_2 ?? undefined,
                tax_lots_2: e.features![0].properties!.tax_lots_2 ?? undefined,
                tax_lots_3: e.features![0].properties!.tax_lots_3 ?? undefined,
                DayEnd: e.features![0].properties!.DayEnd ?? undefined,
                DayStart: e.features![0].properties!.DayStart ?? undefined,
                TAXLOT: e.features![0].properties!.TAXLOT ?? undefined,
                color: e.features![0].properties!.color ?? undefined,
                color_num: e.features![0].properties!.color_num ?? undefined,
                end_date: e.features![0].properties!.end_date ?? undefined,
                num: e.features![0].properties!.num ?? undefined,
                start_date: e.features![0].properties!.start_date ?? undefined,
                title: e.features![0].properties!.title ?? undefined,
                FID_1: e.features![0].properties!.FID_1 ?? undefined,
                lot2: e.features![0].properties!.lot2 ?? undefined,
                tax_lots_1: e.features![0].properties!.tax_lots_1 ?? undefined,
                nid: e.features![0].properties!.nid ?? undefined,
                Lot: e.features![0].properties!.Lot ?? undefined,
                name: e.features![0].properties!.name ?? undefined,
                day1: e.features![0].properties!.day1 ?? undefined,
                day2: e.features![0].properties!.day2 ?? undefined,
                year1: e.features![0].properties!.year1 ?? undefined,
                year2: e.features![0].properties!.year2 ?? undefined,
                descriptio: e.features![0].properties!.descriptio ?? undefined,
                type: popUpType,
              });
              clickVisible = true;
              setPopUpVisible(clickVisible);
            }
        } 
        else if (e.type === 'mousemove' && layerConfig.hover) 
        {
          if (e.features?.length) {
            if (hoveredId !== null) {
              map.current!.setFeatureState({ source: layerConfig.id, sourceLayer: layerConfig.sourceLayer, id: hoveredId }, { hover: false });
            }
    
            if (e.features[0].id !== undefined) {
              hoveredId = e.features[0].id;
              map.current!.setFeatureState({ source: layerConfig.id, sourceLayer: layerConfig.sourceLayer, id: hoveredId }, { hover: true });
              map.current!.getCanvas().style.cursor = "pointer";
            }
            hoverPopup
            .setHTML(hoverStyleString)
            .setLngLat(e.lngLat)
            .addTo(map.current!);
          }
        }
        else if (e.type === 'mouseleave' && layerConfig.hover) 
        {
          map.current!.getCanvas().style.cursor = "";
            if (hoveredId) {
              map.current!.setFeatureState({ source: layerConfig.id, sourceLayer: layerConfig.sourceLayer, id: hoveredId  }, { hover: false });
              hoveredId = null;
            }
            hoverPopup.remove();
        }
    };
}

  const removeMapLayer = (map: MutableRefObject<mapboxgl.Map | null>, id: string) => {
    if (map === null) return;
    //Remove the layer
    if (map.current!.getLayer(id)) {
      //Retrieve the stored event handlers
      const handler = (map.current as any)._eventHandlers?.[id];
        
      //Remove event listeners if the handler exists
      if (handler) {
          map.current!.off('mousemove', id, handler);
          map.current!.off('mouseleave', id, handler);
          map.current!.off('click', id, handler);
      }
      //Remove layer and source from map
      map.current!.removeLayer(id);
      map.current!.removeSource(id);
      //Clean up the stored handler
      delete (map.current as any)._eventHandlers[id];
    }
  }

  const addAllMapLayers = () => {
    if(currLayers !== null) {
      currLayers.forEach((x: PrismaLayer) => {
        addMapLayer(currBeforeMap, x)
        addMapLayer(currAfterMap, x)
      })
    }
  }

  const getLayerSections = () => {
    fetch('http://localhost:3000/api/LayerSection', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(sections => {
      sections.json()?.then(parsed => {
        if(!!parsed && !!parsed.LayerSections && parsed.LayerSections.length > 0) {
          let sections: PrismaLayerSection[] = parsed.LayerSections;

          let returnSectionLayers: SectionLayer[] = sections.map((x: PrismaLayerSection, idx_x) => {
            let layer: SectionLayer = {
              id: x.id,
              label: x.name,
              groups: x.layerGroups.map((y: PrismaLayerGroup, idx_y: number) => {
                let mappedGroup: SectionLayerGroup = {
                  id: y.id,
                  label: y.name,
                  iconColor: y.iconColor ?? IconColors.YELLOW,
                  iconType: FontAwesomeLayerIcons.PLUS_SQUARE,
                  isSolid: true,
                  items: y.layers?.map((z: PrismaLayer, z_idx: number) => {
                    setCurrLayers(currLayers => [...currLayers, z]);
                    let newDBMap: SectionLayerItem = {
                      id: z.id,
                      layerId: z.id,
                      label: z.label,
                      iconColor: z.iconColor ?? IconColors.YELLOW,
                      iconType: FontAwesomeLayerIcons.PLUS_SQUARE,
                      isSolid: false
                    };
                    return newDBMap;
                  }) ?? []
                }
                return mappedGroup
              })
            }
            return layer;
          })
          console.log(returnSectionLayers);
          setSectionLayers(returnSectionLayers)
        }
      });
    })
  }

  const getMaps = () => {
    fetch('http://localhost:3000/api/map', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    }).then(maps => {
        maps.json()?.then(parsed => {
          if(!!parsed && !!parsed.groups && parsed.groups.length) {
            let groups: PrismaMapFilterGroup[] = parsed.groups;
            let mapFilterGroups: MapFiltersGroup[] = groups.map((grp, idx) => {
              
              let mappedGroup: MapFiltersGroup = {
                id: idx,
                name: grp.groupName,
                label: grp.label,
                groupId: grp.groupId,
                maps: grp.maps.map((x: PrismaMap) => {
                  let newDBMap: MapItem = {
                    mapId: x.mapId,
                    groupId: grp.groupId,
                    center: [x.longitude, x.latitude],
                    zoom: x.zoom,
                    bearing: x.bearing,
                    styleId: x.styleId,
                    name: x.mapName
                  }
                  return newDBMap
                }),
                mapfilteritems: grp.mapfilteritems.map((x: PrismaMapFilterItem) => {
                  let filterItem: MapFilterItem = {
                    id: x.id,
                    groupId: grp.groupId,
                    label: x.label,
                    itemId: x.itemId,
                    itemName: x.itemName,
                    defaultCheckedForBeforeMap: x.defaultCheckedForBeforeMap,
                    defaultCheckedForAfterMap: x.defaultCheckedForAfterMap,
                    showInfoButton: x.showInfoButton,
                    showZoomButton: x.showZoomButton
                  }
                  return filterItem;
                })
              }

              return mappedGroup;
            })
            setMappedFilterItemGroups(mapFilterGroups)
          }
        }).catch(err => {
          console.error('failed to convert to json: ', err)
        })
    }).catch(err => {
      console.error(err);
    });
  }

  const beforeLayerFormModalOpen = () => {
    console.log('shouldnt be visible')
    setLayerPanelVisible(false);
    setLayerPopupBefore(popUpVisible);        //Store popupVisibile before value to call after modal closes
    setPopUpVisible(false);                   //Then set popupVisible to false
  }
  const afterLayerFormModalCloseLayers = () => {
    setLayerPanelVisible(true);
    setPopUpVisible(layerPopupBefore);        //After modal close set popupVisible to whatever it was before modal call
    setCurrLayers([]);
    getLayerSections();
  }

  const beforeModalOpen = () => {
    setLayerPanelVisible(false);
    setLayerPopupBefore(popUpVisible);    //Store popupVisibile before value to call after modal closes
    setPopUpVisible(false);               //Then set popupVisible to false
    setModalOpen(true);
  }

  const afterModalClose = () => {
    setLayerPanelVisible(true);
    setPopUpVisible(layerPopupBefore);    //After modal close set popupVisible to whatever it was before modal call
    setModalOpen(false);
  }

  const afterModalCloseLayers = () => {
    afterModalClose();
    setCurrLayers([]);
    getLayerSections();
  }

  const afterModalCloseMaps = () => {
    afterModalClose();
    getMaps();
  }


  /**
   * When the page is loaded, get all maps / layers from the API, parse these to work with our frontend models.
   */
  useEffect(() => {
    getMaps();
    console.log('getting layer groups')
    getLayerSections();
  }, [])

  /**
   * Dynamic import for mapbox-gl-compare package to allow it to be imported. Once they release a TS package, that can be added to NPM and this can be removed.
   */
  useEffect(() => {
    import('mapbox-gl-compare').then((mod) => {
      setMapboxCompare(() => mod.default);
    });
  }, []);

  /**
   * On first load (When Mapbox defaults haven't been loaded yet, but the dynamic import is complete), create defaults for the before/after map and initialize everything
   */
  useEffect(() => {
    if (!MapboxCompare || !comparisonContainerRef.current) return;
    if (defaultBeforeMap === null || defaultAfterMap === null) return;
    setMapLoaded(true);

    const defBeforeMap = new mapboxgl.Map({
      container: beforeMapContainerRef.current as HTMLElement,
      style: 'mapbox://styles/nittyjee/cjooubzup2kx52sqdf9zmmv2j',
      center: [-74.01454, 40.70024],
      zoom: 15.09,
      bearing: -51.3,
      attributionControl: false,
    });
  
    const defAfterMap = new mapboxgl.Map({
      container: afterMapContainerRef.current as HTMLElement,
      style: 'mapbox://styles/nittyjee/cjowjzrig5pje2rmmnjb5b0y2',
      center: [-74.01454, 40.70024],
      zoom: 15.09,
      bearing: -51.3,
      attributionControl: false,
    });

    setDefaultBeforeMap(defBeforeMap);
    setDefaultAfterMap(defAfterMap);


    currBeforeMap.current = defBeforeMap;
    currAfterMap.current = defAfterMap;

    const mapboxCompare = new MapboxCompare(currBeforeMap.current, currAfterMap.current, comparisonContainerRef.current as HTMLElement);

    const compareSwiper = document.querySelector('.compare-swiper') as HTMLElement;
    if (compareSwiper && !modalOpen) {
      compareSwiper.innerHTML = ''; 

      const circleHandle = document.createElement('div');
      circleHandle.classList.add('compare-circle');  
      circleHandle.innerHTML = '<span>⏴⏵</span>';  

      compareSwiper.appendChild(circleHandle);

      circleHandle.onmousedown = function (e: MouseEvent) {
        e.preventDefault();

        const containerWidth = comparisonContainerRef.current?.offsetWidth || 1;

        document.onmousemove = function (e) {
          let newLeft = e.clientX;

          newLeft = Math.max(0, Math.min(newLeft, containerWidth));

          compareSwiper.style.left = `${newLeft}px`;

          const swiperPosition = newLeft / containerWidth;  
          mapboxCompare.setSlider(swiperPosition * containerWidth);  
        };

          document.onmouseup = function () {
          document.onmousemove = null;
        };
      };
    }

}, [MapboxCompare]);

  useEffect(() => {
    if (!MapboxCompare || !comparisonContainerRef.current) return;
    const mapboxCompare = new MapboxCompare(currBeforeMap.current, currAfterMap.current, comparisonContainerRef.current as HTMLElement);

    const compareSwiper = document.querySelector('.compare-swiper') as HTMLElement;
    if (compareSwiper && !modalOpen) {
      compareSwiper.innerHTML = ''; 

      const circleHandle = document.createElement('div');
      circleHandle.classList.add('compare-circle');  
      circleHandle.innerHTML = '<span>⏴⏵</span>';  

      compareSwiper.appendChild(circleHandle);

      circleHandle.onmousedown = function (e: MouseEvent) {
        e.preventDefault();

        const containerWidth = comparisonContainerRef.current?.offsetWidth || 1;

        document.onmousemove = function (e) {
          let newLeft = e.clientX;

          newLeft = Math.max(0, Math.min(newLeft, containerWidth));

          compareSwiper.style.left = `${newLeft}px`;

          const swiperPosition = newLeft / containerWidth;  
          mapboxCompare.setSlider(swiperPosition * containerWidth);  
        };

          document.onmouseup = function () {
          document.onmousemove = null;
        };
      };
    }
  }, [currBeforeMap, currAfterMap])

  useEffect(() => {
    if(currBeforeMap !== null && currAfterMap !== null) {
      addAllMapLayers();
    }
  }, [currLayers, currBeforeMap, currAfterMap]);

  useEffect(() => {
    if(!mapLoaded) return;
    if(currBeforeMap === null || currAfterMap === null) return;

    currLayers.forEach((layer) => {
      if (activeLayerIds.includes(layer.id) && currBeforeMap.current?.getLayer(layer.id)) {
        currBeforeMap.current!.setLayoutProperty(layer.id, 'visibility', 'visible');
        currAfterMap.current!.setLayoutProperty(layer.id, 'visibility', 'visible');
      } else {
        currBeforeMap.current!.setLayoutProperty(layer.id, 'visibility', 'none');
        currAfterMap.current!.setLayoutProperty(layer.id, 'visibility', 'none');
      }
    });
  }, [activeLayerIds]);

  useEffect(() => {
    if(!currDate) return;

    var date = parseInt(currDate.format("YYYYMMDD"));
    var dateFilter: FilterSpecification = [
      "all", 
      ["<=", ["get", "DayStart"], date], 
      [">=", ["get", "DayEnd"], date]
    ];

    activeLayerIds.forEach(lid => {
      if((currBeforeMap.current?.getLayer(lid) !== null) && (currBeforeMap.current?.getLayer(lid)?.filter !== undefined)) 
      {
        currBeforeMap.current?.setFilter(lid, dateFilter);
      }
    })
  }, [currDate, activeLayerIds])

  // Necessary for the Modal to know what to hide
  // Modal.setAppElement('#app-body-main');

  return (
    <>
    <div id='app-body-main'>
      <input className="checker" type="checkbox" id="o" hidden />
      <div className="modal">
        <div className="modal-body">
          <div className="modal-header">
            <h1>ABOUT</h1>
            <label htmlFor="o" id="close" title="Close">&times;</label>
          </div>
          <div className="modal-content">
            New York City was founded by the Dutch in 1624 as
            <i>New Amsterdam</i>, the capital of New Netherland. The New Amsterdam
            History Center is devoted to documenting and mapping New Amsterdam,
            its diverse people, landscapes, institutions and global legacy today.
            <p>
              We’ve presented several versions of the <i>Castello Plan</i> and the
              <i>Dutch Grants Map</i> here. You can see the settlement of houses,
              farms, taverns and workshops, surrounded by walls. Over the three
              centuries that followed, the area became the Financial District. The
              east wall was torn down and named Wall Street. The canals were paved
              over and turned into streets and in between developed skysrapers,
              and the island was expanded with infill. Above ground, almost
              nothing remains of New Amsterdam except the original street pattern.
              Underground, archeologists have found evidence of the plots of
              houses and gardens, Amsterdam yellow brick, and pollen samples of
              plants.
            </p>
            You can swipe the map to compare the Castello Plan in 1660 to the
            present, and explore each lot, where it shows what was there and who
            lived there. Our next steps are to expand through the full history of
            New Amsterdam with a timeline from 1624 to 1664, when it was taken
            over by the English.
            <p>
              We need your help to make this work happen. Donate now to develop
              the map and expand the research.
            </p>
          </div>
        </div>
      </div>

      <div className="header">
        <a href="http://newamsterdamhistorycenter.org" className="logo">
          <img
            id="logo-img-wide"
            src="http://newamsterdamhistorycenter.org/wp-content/uploads/2018/02/cropped-cropped-sprite-1.png"
          />
          <img id="logo-img" src="icons/icon_57x57.png" />
        </a>

        <div id="header_text" className="headerText">
          <span id="headerTextSuffix">|</span> Mapping Early New York
        </div>

        <div className="header-right">
          <a
            className="encyclopedia"
            href="https://newamsterdamhistorycenter.org/full-3d-model/"
            target="_blank"
            >3D Map
            <img
              className="img2"
              height="18"
              src="https://encyclopedia.nahc-mapping.org/sites/default/files/inline-images/external_link_icon.png"
              width="18"
          /></a>
          <a
            className="encyclopedia"
            href="https://encyclopedia.nahc-mapping.org/"
            target="_blank"
            >Encyclopedia
            <img
              className="img2"
              height="18"
              src="https://encyclopedia.nahc-mapping.org/sites/default/files/inline-images/external_link_icon.png"
              width="18"
          /></a>

          <MapFormButton
          beforeOpen={beforeModalOpen}
          afterClose={afterModalCloseMaps}
          ></MapFormButton>

          <Modal
            style={{
                content: {
                    width: '30%',
                    right: '5px'
                }
            }}
            isOpen={editFormOpen}
            onRequestClose={() => {
              setEditFormOpen(false);
              setEditFormId("");
              afterModalCloseLayers();
            }}
            contentLabel='New Layer'
            >
            <EditForm
            id={editFormId}
            afterSubmit={(closeForm: boolean) => {
              setEditFormOpen(closeForm);
              removeMapLayer(currBeforeMap, editFormId);
              removeMapLayer(currAfterMap, editFormId);
              setEditFormId("");
              afterModalCloseLayers();
            }}/>
          </Modal>

          <label htmlFor="o" id="open-popup" style={{display: "none"}}>Open PopUp</label>
          <label id="about" className="trigger-popup" title="Open">ABOUT</label>
          <i className="fa fa-2x fa-info-circle trigger-popup" id="info"></i>
        </div>
      </div>

      {
        !modalOpen && (
          <button id={modalOpen ? "" : "view-hide-layer-panel"} onClick={() => {
            setLayerPanelVisible(!layerPanelVisible);
            setPopUpVisible(!popUpVisible);
          }}>
            <br />
            <span id="dir-txt">&#9204;</span> <br /><br />
          </button>
        )
      }
      
       
      {popUp && <CSSTransition
        in={popUpVisible}
        timeout={500}
        classNames="popup"
        unmountOnExit>
          <SliderPopUp popUpProps={popUp}/>
      </CSSTransition>}

      <div id="studioMenu" style={{ visibility: layerPanelVisible ? 'visible' : 'hidden' }}>
        <FontAwesomeIcon id="mobi-hide-sidebar" icon={faArrowCircleLeft} />
        <p className="title">LAYERS</p>
        <br />

        <>
          {
            (currSectionLayers ?? []).map(secLayer => {

              return (
                <SectionLayerComponent activeLayers={activeLayerIds} activeLayerCallback={(newActiveLayers: string[]) => {
                  console.log('layers selected: ', newActiveLayers);
                  setActiveLayerIds(newActiveLayers);
                } } layersHeader={secLayer.label} layer={secLayer}
                beforeOpen={beforeLayerFormModalOpen}
                afterClose={afterLayerFormModalCloseLayers}
                openWindow={beforeModalOpen}
                editFormVisibleCallback={(isOpen: boolean) => {
                  setEditFormOpen(isOpen);
                }}
                editFormIdCallback={(id: string) => {
                  setEditFormId(id);
                }}/>
              )
            })
          }
          {
            !groupFormOpen &&
            <div style={{paddingLeft: '15px', paddingRight: '10px', textAlign: 'center'}}>
              <a style={{width: '100%', backgroundColor: 'grey', color: 'white', margin: 'auto', padding: '2px 7px 2px 7px'}} onClick={() => setGroupFormOpen(true)}>
                  <FontAwesomeIcon icon={getFontawesomeIcon(FontAwesomeLayerIcons.PLUS_SQUARE, true)}></FontAwesomeIcon> New Group Folder
              </a>
            </div>
          }
          {
            groupFormOpen &&
            <NewLayerSectionForm afterSubmit={() => setGroupFormOpen(false)}></NewLayerSectionForm>
          }
        </>

        <MapFilterWrapperComponent beforeMapCallback={(map) => {
          // Set beforeMap to selected map by changing the mapId
          setMapStyle(currBeforeMap, map.styleId);
        }} afterMapCallback={(map) => {
          // Set afterMap to selected map by changing the mapId

          setMapStyle(currAfterMap, map.styleId);
        }} defaultMap={beforeMapItem} mapGroups={mappedFilterItemGroups} mapZoomCallback={(zoomProps: MapZoomProps) => {
          currBeforeMap.current?.easeTo({
            center: zoomProps.center,
            zoom: zoomProps.zoom,
            speed: zoomProps.speed,
            curve: zoomProps.curve,
            duration: zoomProps.duration,
            easing(t) {
              return t;
            }
          })
        }} />
      </div>

      <MapComparisonComponent
        comparisonContainerRef={comparisonContainerRef}
        beforeMapContainerRef={beforeMapContainerRef}
        afterMapContainerRef={afterMapContainerRef}
        beforeMap={beforeMapItem} 
        afterMap={afterMapItem}
        beforeMapRef={currBeforeMap}
        afterMapRef={currAfterMap}
      ></MapComparisonComponent>

      <div id="mobi-view-sidebar"><i className="fa fa-bars fa-2x"></i></div>

      <SliderWithDatePanel callback={(date: moment.Moment | null) => setCurrDate(date)}></SliderWithDatePanel>

      <div id="loading">
        <i className="fa fa-sync fa-10x fa-spin" id="loading-icon"></i>
      </div>
      </div>
    </>
  );
}
