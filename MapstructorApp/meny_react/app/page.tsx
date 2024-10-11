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
"./global.css";
import MapComparisonComponent from "./components/map/map-compare-container.component";
import mapboxgl, { FilterSpecification } from 'mapbox-gl';
import { MapFiltersGroup } from './models/maps/map-filters.model';
import MapFilterWrapperComponent from './components/map-filters/map-filter-wrapper.component';
import { MapItem } from './models/maps/map.model';
import LayerFormButton from './components/forms/buttons/layer-form-button.component';
import Modal from 'react-modal';
import MapFormButton from './components/forms/buttons/map-form-button.component';
import {Map as PrismaMap, Layer as PrismaLayer, MapFilterGroup as PrismaMapFilterGroup, MapFilterItem as PrismaMapFilterItem, MapFilterItem} from '@prisma/client';
 
// Remove this when we have a way to get layers correctly

const manhattaSectionGroups: SectionLayerGroup[] = [
  {
    id: 0,
    label: "1609 | Manhatta",
    iconColor: IconColors.YELLOW,
    iconType: FontAwesomeLayerIcons.PLUS_SQUARE,
    isSolid: true,
    items: []
  }
]

const manhattaLayer: SectionLayer = {
  id: 0,
  label: "MANHATTAN",
  groups: manhattaSectionGroups
}
//Test Popup Props
const dutchGrantPopupTest: GenericPopUpProps = {
  DayEnd: 17000102,
  DayEnd1: 16550429,
  DayStart: 16430713,
  Lot: "B1",
  day1: "13-Jul",
  day2: "Apr. 29",
  descriptio: "Gr-br. to Cornelis Volckersen. (GG: 83.) Desc: A double lot for two hos. and two gardens, lying on the Common Highway, its br. along said road is 9 r. and 8 ft., and below on the marsh of the same br.; its length on the N. side is 18 r., 2 ft., 5 ins. an",
  lot2: "",
  name: "Cornelis Volckersen",
  nid: 19107,
  notes: "",
  styling1: "knownfull",
  year1: "1643",
  year2: "1655",
  type: "dutch-grant",
}

const beforeMapItem: MapItem = {
  name: '1660 Original Castello Plan',
  mapId: 'cjooubzup2kx52sqdf9zmmv2j',
  center: [-74.01454, 40.70024],
  zoom: 15.09,
  bearing: -51.3,
  styleId: 'cjooubzup2kx52sqdf9zmmv2j',
}

const afterMapItem: MapItem = {
  name: 'Castello Plan',
  mapId: 'cjowjzrig5pje2rmmnjb5b0y2',
  center: [-74.01454, 40.70024],
  zoom: 15.09,
  bearing: -51.3,
  styleId: 'cjowjzrig5pje2rmmnjb5b0y2',
}

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ';
export default function Home() {
  const [currDate, setCurrDate] = useState<moment.Moment | null>(null);
  const [popUp, setPopUp] = useState<GenericPopUpProps | null>(dutchGrantPopupTest);
  const [popUpVisible, setPopUpVisible] = useState(true);
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
  const currBeforeMap = useRef<mapboxgl.Map | null>(null);
  const currAfterMap = useRef<mapboxgl.Map | null>(null);

  const setMapStyle = (map: MutableRefObject<mapboxgl.Map | null>, mapId: string) => {
    if(map?.current) {
      map.current.setStyle(`mapbox://styles/nittyjee/${mapId.trim()}`);

      // Replace this later
      setTimeout(() => {
        addAllMapLayers();
      }, 1000)
    }
  }

  const addMapLayer = (map: MutableRefObject<mapboxgl.Map | null>, layerConfig: PrismaLayer) => {
    if(map?.current == null) return;

    let layerTypes: string[] = ["symbol", "fill", "line", "circle", "heatmap", "fill-extrusion", "raster", "raster-particle", "hillshade", "model", "background", "sky", "slot", "clip"]
    if(layerTypes.includes(layerConfig.type)) {
      let layerStuff =         {
        //ID: CHANGE THIS, 1 OF 3
        id: layerConfig.id,
        type: layerConfig.type as unknown as any,
        source: {
          type: 'vector',
          //URL: CHANGE THIS, 2 OF 3
          url: layerConfig.sourceUrl,
        },
        layout: {
          visibility: "visible"
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
        if(currDate) {
          map.current.addLayer(
            {
              ...layerStuff as any,
              filter: dateFilter
            }
          );
          // map.current.getLayer(layerConfig.id)!.filter = ["all", ["<=", "DayStart", parseInt(currDate.format("YYYYMMDD"))], [">=", "DayEnd", parseInt(currDate.format("YYYYMMDD"))]]
        } else {
          map.current.addLayer(layerStuff as any)
        }
      }
    }
  }

  const addAllMapLayers = () => {
    if(currLayers !== null) {
      currLayers.forEach((x: PrismaLayer) => {
        if(currBeforeMap.current?.getSource(x.sourceId) === null) {
          currBeforeMap.current.addSource(x.sourceId, {
            type: 'vector',
            url: 'mapbox://mapny.7q2vs9ar'
          });
          currAfterMap.current?.addSource(x.sourceId, {
            type: 'vector',
            url: 'mapbox://mapny.7q2vs9ar'
          })
        }

        addMapLayer(currBeforeMap, x)
        addMapLayer(currAfterMap, x)
      })
    }
  }

  const getLayers = () => {
    fetch('http://localhost:3000/api/layer', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    }).then(layers => {
        layers.json().then(parsed => {
          console.log('parsed response: ', parsed, parsed?.layer, parsed?.layer?.length);
          if(parsed !== null && parsed.layer !== null && parsed.layer.length > 0) {
            console.log('parsed layers: ', parsed.layer);
            setCurrLayers(parsed.layer);
            let mappedLayerItems: SectionLayerItem[] = parsed.layer.map((x: PrismaLayer) => {
              let sectionItem: SectionLayerItem = {
                id: 0,
                label: x.layerName,
                iconColor: IconColors.BLUE,
                iconType: FontAwesomeLayerIcons.PLUS_SQUARE,
                isSolid: false
              }
            })
          }
        }).catch(err => {
          console.error('failed to convert to json: ', err)
        })
    }).catch(err => {
      console.error(err);
    })
  }

  const getMaps = () => {
    fetch('http://localhost:3000/api/map', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    }).then(maps => {
      console.log(maps)
        maps.json()?.then(parsed => {
          console.log(parsed);
          if(!!parsed && !!parsed.groups && parsed.groups.length) {
            let groups: PrismaMapFilterGroup[] = parsed.groups;
            let mapFilterGroups: MapFiltersGroup[] = groups.map((grp, idx) => {
              
              let mappedGroup: MapFiltersGroup = {
                id: idx,
                name: grp.groupName,
                label: grp.label,
                maps: grp.maps.map((x: PrismaMap) => {
                  let newDBMap: MapItem = {
                    mapId: x.mapId,
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
                    label: x.label,
                    mapId: x.mapId,
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
    })
  }


  /**
   * When the page is loaded, get all maps / layers from the API, parse these to work with our frontend models.
   */
  useEffect(() => {
    getMaps();
    getLayers();
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
  }, [activeLayerIds])

  useEffect(() => {
    if(!currDate) return;

    var date = parseInt(currDate.format("YYYYMMDD"));
    var dateFilter: FilterSpecification = [
      "all", 
      ["<=", ["get", "DayStart"], date], 
      [">=", ["get", "DayEnd"], date]
    ];

    activeLayerIds.forEach(lid => {
      if(currBeforeMap.current?.getLayer(lid) !== null) {
        currBeforeMap.current?.setFilter(lid, dateFilter);
      }
    })
  }, [currDate, activeLayerIds])

  // Necessary for the Modal to know what to hide
  Modal.setAppElement('#app-body');

  return (
    <>
    <div id='app-body'>
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

          <LayerFormButton
          beforeOpen={() => {
            setLayerPanelVisible(false);
            setPopUpVisible(false);
            setModalOpen(true);
          }}
          afterClose={() => {
            setLayerPanelVisible(true);
            setPopUpVisible(true);
            setModalOpen(false);
            getLayers();
          }}
          ></LayerFormButton>

          <MapFormButton
          beforeOpen={() => {
            setLayerPanelVisible(false);
            setPopUpVisible(false);
            setModalOpen(true);
          }}
          afterClose={() => {
            setLayerPanelVisible(true);
            setPopUpVisible(true);
            setModalOpen(false);
            getMaps();
          }}
          ></MapFormButton>

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

      {layerPanelVisible && (<div id="studioMenu">
        <FontAwesomeIcon id="mobi-hide-sidebar" icon={faArrowCircleLeft} />
        <p className="title">LAYERS</p>
        <br />
        <SectionLayerComponent activeLayers={activeLayerIds} activeLayerCallback={(newActiveLayers: string[]) => {
          console.log(newActiveLayers)
          setActiveLayerIds(newActiveLayers)
        }} layersHeader={manhattaLayer.label} layer={{
          ...manhattaLayer,
          groups: [
            {
              id: 0,
              label: "1609 | Manhatta",
              iconColor: IconColors.YELLOW,
              iconType: FontAwesomeLayerIcons.PLUS_SQUARE,
              isSolid: true,
              items: currLayers.map((x, idx) => {
                let returnedLayer: SectionLayerItem =  {
                  id: idx,
                  label: x.layerName,
                  iconColor: IconColors.YELLOW, // Change this once we store Icon stats in DB
                  iconType: FontAwesomeLayerIcons.PLUS_SQUARE, // Change this once we store Icon stats in DB
                  isSolid: false, // Change this once we store Icon stats in DB
                  layerId: x.id
                }
                return returnedLayer;
              })
            }
          ]
          }} />

        <MapFilterWrapperComponent beforeMapCallback={(map) => {
          console.log('before hit', map?.styleId)
          // Set beforeMap to selected map by changing the mapId
          setMapStyle(currBeforeMap, map.styleId);
        }} afterMapCallback={(map) => {
          // Set afterMap to selected map by changing the mapId
          console.log('after hit', map?.styleId)

          setMapStyle(currAfterMap, map.styleId);
        }} defaultMap={beforeMapItem} mapGroups={mappedFilterItemGroups} />
      </div>)}

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
