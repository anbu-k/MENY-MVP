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
import {Map as PrismaMap, Layer as PrismaLayer} from '@prisma/client';
import { MapCompareFilters } from './models/all-filters/all-filters.model';
 
// Remove this when we have a way to get layers correctly
const manhattaLayerSections: SectionLayerItem[] = [
  {
    id: 0,
    iconColor: IconColors.YELLOW,
    label: "Information",
    iconType: FontAwesomeLayerIcons.SQUARE,
    isSolid: true,
    layerId: "dutch_grants-5ehfqe",
  },
  {
    id: 1,
    iconColor: IconColors.RED,
    label: "Lines",
    iconType: FontAwesomeLayerIcons.SQUARE,
    isSolid: false,
    layerId: "grant-lots-lines",
  },
  {
    id: 2,
    label: "1643-75 | Lot Events",
    iconColor: IconColors.GREEN,
    iconType: FontAwesomeLayerIcons.SQUARE,
    isSolid: true,
    layerId: "lot_events-bf43eb",
  },
  {
    id: 3,
    iconType: FontAwesomeLayerIcons.SQUARE,
    isSolid: true,
    label: "1660 | Castello Taxlots",
    iconColor: IconColors.RED,
    layerId: "places",
  },
];

const manhattaSectionGroups: SectionLayerGroup[] = [
  {
    id: 0,
    label: "1609 | Manhatta",
    iconColor: IconColors.YELLOW,
    iconType: FontAwesomeLayerIcons.PLUS_SQUARE,
    isSolid: true,
    items: manhattaLayerSections
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
const lotEventPopupTest: GenericPopUpProps = {
  DayEnd: 16750703,
  DayStart: 16621201,
  TAXLOT: "C7",
  color: "2",
  color_num: 2,
  end_date: "1675-07-03",
  nid: 1550,
  num: 6,
  start_date: "1662-12-01",
  title: "C7_12-1662",
  type: "lot-event"
}
const castelloTaxlotPopupTest: GenericPopUpProps = {
  block: "L",
  id: 173,
  lot: "5",
  lot2: "L5",
  new_link: "https://nahc-mapping.org/mappingNY/encyclopedia/taxlot/L5",
  nid: 18691,
  old_link_2: "http://thenittygritty.org/nahc/encyclopedia/taxlot/L5",
  tax_lots_1: "House",
  tax_lots_2: "----------",
  tax_lots_3: "http://nahc.simcenterdev.org/taxlot/l5",
  type: "castello-taxlot",
}
const longIslandNativeGroupsPopupTest: GenericPopUpProps = {  
  FID_1: 220,
  name: "Unkechaugs",
  nid: "10021",
  type: "long-island-native-groups",
}
const fortAmsterdamDutchGrantPopUpTest: GenericPopUpProps = {
  Aligned: "added",
  DayEnd: 17000102,
  DayEnd1: 17900101,
  DayStart: 16250101,
  Lot: "Fort Amsterdam",
  day1: "",
  day2: "",
  descriptio: "N/A",
  lot2: "",
  name: "Fort Amsterdam",
  notes: "Wooden fort built, then a much larger stone fort in same location built 1633-35. Demolished after the American Revolution.",
  styling1: "knownfull",
  year1: "1625",
  year2: "1790",
  type: "dutch-grant",
}
const noNidPopUpTest: GenericPopUpProps = {
Aligned: "added",
DayEnd: 17000102,
DayStart: 16540511,
Lot: "A14.2",
day1: "May 11",
day2: "",
descriptio: "See A14 desc.",
lot2: "",
name: "Paulus Leendersen Van Der Grift",
notes: "Using date on map which is of conf. Using end date of adjacent lot.",
styling1: "knownfull",
year1: "1654",
type: "dutch-grant",
}

const beforeMapItem: MapItem = {
  name: '1660 Original Castello Plan',
  mapId: 'cjooubzup2kx52sqdf9zmmv2j',
  center: [-74.01454, 40.70024],
  zoom: 15.09,
  bearing: -51.3,
  styleId: '',
}

const afterMapItem: MapItem = {
  name: 'Castello Plan',
  mapId: 'cjowjzrig5pje2rmmnjb5b0y2',
  center: [-74.01454, 40.70024],
  zoom: 15.09,
  bearing: -51.3,
  styleId: '',
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
  const [extraLayers, setExtraLayers] = useState<SectionLayerItem[]>([]);
  const [currMaps, setCurrMaps] = useState<PrismaMap[]>([]);
  const [currLayers, setCurrLayers] = useState<PrismaLayer[]>([]);
  const [currFilters, setCurrFilters] = useState<MapCompareFilters>();
  const [defaultBeforeMap, setDefaultBeforeMap] = useState<mapboxgl.Map>();
  const [defaultAfterMap, setDefaultAfterMap] = useState<mapboxgl.Map>();
  const currBeforeMap = useRef<mapboxgl.Map | null>(null);
  const currAfterMap = useRef<mapboxgl.Map | null>(null);

  const getMapFromMapItem = (mapItem: MapItem): mapboxgl.Map => {
    const returnMap = new mapboxgl.Map({
      container: beforeMapContainerRef.current as HTMLElement,
      style: `mapbox://styles/nittyjee/${mapItem.mapId.trim()}`,
      center: mapItem.center,
      zoom: mapItem.zoom,
      bearing: mapItem.bearing,
      attributionControl: true,
    });
    return returnMap;
  }

  const setMapStyle = (map: MutableRefObject<mapboxgl.Map | null>, mapId: string) => {
    if(map?.current) {
      map.current.setStyle(`mapbox://styles/nittyjee/${mapId.trim()}`)
    }
  }

  const addMapLayer = (map: MutableRefObject<mapboxgl.Map | null>, layerConfig: PrismaLayer, layerDate: Date) => {
    if(map?.current == null) return;

    let layerTypes: string[] = ["symbol", "fill", "line", "circle", "heatmap", "fill-extrusion", "raster", "raster-particle", "hillshade", "model", "background", "sky", "slot", "clip"]
    if(layerTypes.includes(layerConfig.type)) {
      if(map.current.getLayer(layerConfig.id) === null) {
        map.current.addLayer(
          {
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
            },
          }
        );
      }
    }
  }

  /**
   * Every time the Before Map, After Map, Selected Layers, or Date is selected, update the global variables.
   */
  useEffect(() => {
    let compareFilters: MapCompareFilters = {
      beforeMap: currBeforeMap.current ?? defaultBeforeMap ?? undefined,
      afterMap: currAfterMap.current ?? defaultAfterMap ?? undefined,
      selectedLayers: currLayers,
      date: currDate ?? moment()
    }
    setCurrFilters(compareFilters)
  }, [currDate, currLayers, currBeforeMap, currAfterMap])


  /**
   * When the page is loaded, get all maps / layers from the API, parse these to work with our frontend models.
   */
  useEffect(() => {
    fetch('http://localhost:3000/api/map', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    }).then(maps => {
        maps.json()?.then(parsed => {
          if(!!parsed && !!parsed.maps && parsed.maps.length) {
            setCurrMaps(parsed.maps);
            let mapFilterGroups: MapFiltersGroup[] = [
              {
                id: 0,
                name: '1660 | Castello Plans',
                label: '1660 | Castello Plans',
                maps: parsed.maps.map((x: PrismaMap) => {
                  let newDBMap: MapItem = {
                    mapId: x.mapId,
                    center: [x.longitude, x.latitude],
                    zoom: x.zoom,
                    bearing: x.bearing,
                    styleId: x.styleId,
                    name: x.name
                  }
                  return newDBMap
                })
              }
            ]
            setMappedFilterItemGroups(mapFilterGroups)
          }
        }).catch(err => {
          console.error('failed to convert to json: ', err)
        })
    }).catch(err => {
      console.error(err);
    })
  }, [])

  useEffect(() => {
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

    // if(currBeforeMap.current)
    // {
    //   currBeforeMap.current.on('load', () => {
    //       addBeforeLayers(currBeforeMap.current!, '2024-09-16');
    //   });
    // }

    // if(currAfterMap.current)
    // {
    //   currAfterMap.current!.on('load', () => {
    //       addBeforeLayers(currAfterMap.current!, '2024-09-16');
    //   });
    // }

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
    if(!mapLoaded) return; 

    const allLayerIds: string[] = ['dutch_grants-5ehfqe', 'grant-lots-lines', 'dutch_grants-5ehfqe-highlighted', 'lot_events-bf43eb', "places"];
    // for each layerId, check whether it is included in activeLayerIds,
    // show and hide accordingly by setting layer visibility
    allLayerIds.forEach((layerId) => {
      if (activeLayerIds.includes(layerId)) {
        currBeforeMap.current!.setLayoutProperty(layerId, 'visibility', 'visible');
        currAfterMap.current!.setLayoutProperty(layerId, 'visibility', 'visible');
      } else {
        currBeforeMap.current!.setLayoutProperty(layerId, 'visibility', 'none');
        currAfterMap.current!.setLayoutProperty(layerId, 'visibility', 'none');
      }
    });
  }, [activeLayerIds]);

  useEffect(() => {
    console.log('inside currLayers useEffect')
    if(currLayers !== null && currBeforeMap !== null && currAfterMap !== null) {
      currLayers.forEach((x: PrismaLayer) => {
        console.log('found layer: ', x);
        if(currBeforeMap.current?.getSource(x.sourceId) === null) {
          currBeforeMap.current.addSource(x.sourceId, {
            type: 'vector',
            url: 'mapbox://mapny.7q2vs9ar'
          })
        } 
        addMapLayer(currBeforeMap, x, new Date())
        addMapLayer(currAfterMap, x, new Date())
      })
    }
  }, [currLayers, currBeforeMap, currAfterMap]);

  useEffect(() => {
    if(!mapLoaded) return; 
    var date = parseInt(currDate!.format("YYYYMMDD"));
    const dateFilter: FilterSpecification = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];

  //LAYERS FOR FILTERING
  ["dutch_grants-5ehfqe", "dutch_grants-5ehfqe-highlighted", "grant-lots-lines"].forEach(id => {
    currBeforeMap.current!.setFilter(id, dateFilter)
    currAfterMap.current!.setFilter(id, dateFilter)
  })

  currBeforeMap.current!.setFilter("lot_events-bf43eb", dateFilter);
  currAfterMap.current!.setFilter("lot_events-bf43eb", dateFilter);
  }, [currDate]);

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
        <SectionLayerComponent activeLayers={activeLayerIds} activeLayerCallback={(newActiveLayers: string[]) => {setActiveLayerIds(newActiveLayers)}} layersHeader={manhattaLayer.label} layer={manhattaLayer} />

        <MapFilterWrapperComponent beforeMapCallback={(map) => {
          // Set beforeMap to selected map by changing the mapId
          setMapStyle(currBeforeMap, map.mapId);
        }} afterMapCallback={(map) => {
          // Set afterMap to selected map by changing the mapId
          setMapStyle(currAfterMap, map.mapId);
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
