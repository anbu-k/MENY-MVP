"use client";
import moment from "moment";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import SliderWithDatePanel from "./components/slider/slider-with-date-panel.component";
import { GenericPopUpProps } from "./models/popups/pop-up.model";
import SliderPopUp from "./components/right-info-bar/popups/pop-up";
import {
  SectionLayer,
  SectionLayerGroup,
  SectionLayerItem,
} from "./models/layers/layer.model";
import { IconColors } from "./models/colors.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import SectionLayerComponent from "./components/layers/section-layer.component";
import { FontAwesomeLayerIcons } from "./models/font-awesome.model";
import { CSSTransition } from "react-transition-group";
import MapComparisonComponent from "./components/map/map-compare-container.component";
import mapboxgl, { FilterSpecification, LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapFiltersGroup } from "./models/maps/map-filters.model";
import MapFilterWrapperComponent from "./components/map-filters/map-filter-wrapper.component";
import { MapItem, MapZoomProps } from "./models/maps/map.model";
import LayerFormButton from "./components/forms/buttons/layer-form-button.component";
import Modal from "react-modal";
import MapFormButton from "./components/forms/buttons/map-form-button.component";
import {
  Map as PrismaMap,
  ZoomLabel as PrismaZoomLabel,
  LayerSection as PrismaLayerSection,
  LayerData as PrismaLayer,
  LayerGroup as PrismaLayerGroup,
  MapFilterGroup as PrismaMapFilterGroup,
  MapFilterItem as PrismaMapFilterItem,
  MapFilterItem,
  LayerSection,
  hoverItem,
} from "@prisma/client";
import EditForm from "./components/forms/EditForm";
import "./popup.css";
import { PopupType } from "./models/popups/pop-up-type.model";
import {
  getFontawesomeIcon,
  parseFromString,
} from "./helpers/font-awesome.helper";
import NewLayerSectionForm from "./components/forms/NewLayerSectionForm";
import EditSectionData from "./components/forms/EditSectionData";
import { ZoomLabel } from "./models/zoom-layer.model";
import {
  addInteractivityToLabel,
  createLabel,
} from "./helpers/zoom-layer.helper";

const beforeMapItem: MapItem = {
  name: "1660 Original Castello Plan",
  mapId: "cjooubzup2kx52sqdf9zmmv2j",
  center: [-74.01454, 40.70024],
  zoom: 15.09,
  bearing: -51.3,
  styleId: "cjooubzup2kx52sqdf9zmmv2j",
  groupId: "",
};

const afterMapItem: MapItem = {
  name: "Castello Plan",
  mapId: "cjowjzrig5pje2rmmnjb5b0y2",
  center: [-74.01454, 40.70024],
  zoom: 15.09,
  bearing: -51.3,
  styleId: "cjowjzrig5pje2rmmnjb5b0y2",
  groupId: "",
};

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ";
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
  const [mappedFilterItemGroups, setMappedFilterItemGroups] = useState<
    MapFiltersGroup[]
  >([]);
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
  const [currZoomLayers, setCurrZoomLayers] = useState<ZoomLabel[]>([]);

  const setMapStyle = (
    map: MutableRefObject<mapboxgl.Map | null>,
    mapId: string
  ) => {
    if (map?.current) {
      map.current.setStyle(`mapbox://styles/mapny/${mapId.trim()}`);

      // Replace this later
      setTimeout(() => {
        addAllMapLayers();
        addZoomLayers(currZoomLayers);
      }, 1000);
    }
  };

  const addZoomLayers = (layerData: ZoomLabel[]) => {
    if (currAfterMap != null && currBeforeMap != null) {
      layerData.forEach((label) => {
        addInteractivityToLabel(currAfterMap, label);
        addInteractivityToLabel(currBeforeMap, label);
      });
    }
  };

  const addMapLayer = (
    map: MutableRefObject<mapboxgl.Map | null>,
    layerConfig: PrismaLayer
  ) => {
    if (map?.current == null) return;
    let hoveredId: string | number | null = null;

    let layerTypes: string[] = [
      "symbol",
      "fill",
      "line",
      "circle",
      "heatmap",
      "fill-extrusion",
      "raster",
      "raster-particle",
      "hillshade",
      "model",
      "background",
      "sky",
      "slot",
      "clip",
    ];

    // Parses the paint string into a JSON object
    const parsedPaint = layerConfig.paint ? JSON.parse(layerConfig.paint) : {};
    const parsedLayout = layerConfig.layout
      ? JSON.parse(layerConfig.layout)
      : {};

    if (layerTypes.includes(layerConfig.type)) {
      let paint = {};
      let layout = { ...parsedLayout };

      // Sets paint properties based on layer type
      if (layerConfig.type === "fill") {
        paint = {
          "fill-color": parsedPaint["fill-color"] ?? "#e3ed58",
          "fill-opacity": parsedPaint["fill-opacity"] ?? [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.8,
            0.45,
          ],
          "fill-outline-color": parsedPaint["fill-outline-color"] ?? "#FF0000",
        };
      } else if (layerConfig.type === "symbol") {
        paint = {
          "text-color": parsedPaint["text-color"] ?? "#000080",
          "text-halo-color": parsedPaint["text-halo-color"] ?? "#ffffff",
          "text-halo-width": parsedPaint["text-halo-width"] ?? 2,
        };
        layout = {
          ...layout,
          "text-field": parsedLayout["text-field"] ?? "{name}", // Default text
          "text-size": parsedLayout["text-size"] ?? 12,
          "text-anchor": parsedLayout["text-anchor"] ?? "top",
          "icon-image": parsedLayout["icon-image"] ?? "marker-icon",
          "icon-size": parsedLayout["icon-size"] ?? 0.5,
        };
      } else if (layerConfig.type === "circle") {
        paint = {
          "circle-color": parsedPaint["circle-color"] ?? "#FF0000",
          "circle-opacity": parsedPaint["circle-opacity"] ?? 0.5,
          "circle-radius": parsedPaint["circle-radius"] ?? 5,
          "circle-stroke-color":
            parsedPaint["circle-stroke-color"] ?? "#000000",
          "circle-stroke-width": parsedPaint["circle-stroke-width"] ?? 1,
        };
      } else if (layerConfig.type === "line") {
        paint = {
          "line-color": parsedPaint["line-color"] ?? "#ff9900",
          "line-width": parsedPaint["line-width"] ?? 5,
          "line-blur": parsedPaint["line-blur"] ?? 0,
          "line-opacity": parsedPaint["line-opacity"] ?? 1.0,
        };
      }
      const layerStuff = {
        id: layerConfig.id,
        type: layerConfig.type as unknown as mapboxgl.LayerSpecification["type"],
        source: {
          type: "vector",
          url: layerConfig.sourceUrl,
        },
        layout: {
          visibility: "visible",
          ...layout,
        },
        "source-layer": layerConfig.sourceLayer,
        paint,
      };

      var date = parseInt(currDate!.format("YYYYMMDD"));
      var dateFilter: FilterSpecification = [
        "all",
        ["<=", ["get", "DayStart"], date],
        [">=", ["get", "DayEnd"], date],
      ];

      if (!map.current?.getLayer(layerConfig.id)) {
        if (layerConfig.time) {
          map.current.addLayer({
            ...(layerStuff as any),
            filter: dateFilter,
          });
        } else {
          map.current.addLayer(layerStuff as any);
        }
        const handleEvent = createHandleEvent(map, layerConfig);
        map.current.on("mousemove", layerConfig.id, handleEvent);
        map.current.on("mouseleave", layerConfig.id, handleEvent);
        map.current.on("click", layerConfig.id, handleEvent);
        // Store the reference to the handler in a way you can access it later if needed
        (map.current as any)._eventHandlers =
          (map.current as any)._eventHandlers || {};
        (map.current as any)._eventHandlers[layerConfig.id] = handleEvent;
      }
    }
  };

  function createHandleEvent(
    map: MutableRefObject<mapboxgl.Map | null>,
    layerConfig: PrismaLayer
  ) {
    let hoveredId: string | number | null = null;
    let hoverStyleString: string;
    var popUpType: PopupType;
    var clickVisible: boolean = popUpVisible;
    var previousNid: number | string | undefined;
    var previousName: string | undefined;
    let hoverPopup = new mapboxgl.Popup({
      closeOnClick: false,
      closeButton: false,
    });
    let clickHoverPopUp = new mapboxgl.Popup({
      closeOnClick: false,
      closeButton: false,
    });
    //Determine clickPopup styling vs hoverPopup styling
    //They're the same right now
    popUpType = layerConfig.clickStyle as PopupType;
    return (e: any) => {
      if (e.type === "click" && layerConfig.click) {
        console.log("e features");
        console.log(e.features![0].properties);
        if (clickHoverPopUp.isOpen()) {
          clickHoverPopUp.remove();
        }
        clickHoverPopUp
          .setHTML(hoverStyleString)
          .setLngLat(e.lngLat)
          .addTo(map.current!);
        if (
          clickVisible &&
          previousNid &&
          previousNid === e.features![0].properties!.nid
        ) {
          clickVisible = false;
          setPopUpVisible(clickVisible);
          clickHoverPopUp.remove();
        } else if (
          clickVisible &&
          previousName &&
          previousName === e.features![0].properties!.name
        ) {
          clickVisible = false;
          setPopUpVisible(clickVisible);
          clickHoverPopUp.remove();
        } else {
          previousName = e.features![0].properties!.name ?? undefined;
          previousNid = e.features![0].properties!.nid ?? undefined;
          setPopUp({
            layerName: layerConfig.clickHeader,
            nid: e.features![0].properties!.nid ?? undefined,
            type: popUpType,
          });
          clickVisible = true;
          setPopUpVisible(clickVisible);
        }
      } else if (e.type === "mousemove" && layerConfig.hover) {
        hoverStyleString =
          "<div class='" + layerConfig.hoverStyle + "HoverPopup'>";
        //Setup some sort of check on LayerConfig
        //Sample data maybe? [{label: "", type: "LOT"}, {label: "Name", type: "NAME"}, {label: "", type: "DATE-START"}, {label: "", type: "DATE-END"}]
        layerConfig.hoverContent.map((item: hoverItem) => {
          if (item.label.length !== 0) {
            hoverStyleString += "<b>" + item.label + ":</b> ";
          }
          if (item.type === "NAME") {
            /**
             * NAME INFORMATION IMPORTED FROM MENY
             * e.features[0].properties.name
             * e.features[0].properties.Name
             * e.features[0].properties.NAME
             * e.features[0].properties.To
             */
            if (e.features[0].properties.name !== undefined) {
              hoverStyleString += e.features[0].properties.name + "<br>";
            } else if (e.features[0].properties.Name !== undefined) {
              hoverStyleString += e.features[0].properties.Name + "<br>";
            } else if (e.features[0].properties.NAME !== undefined) {
              hoverStyleString += e.features[0].properties.NAME + "<br>";
            } else if (e.features[0].properties.To !== undefined) {
              hoverStyleString += e.features[0].properties.To + "<br>";
            }
          } else if (item.type === "LOT") {
            /**
             * LOT INFORMATION IMPORTED FROM MENY
             * e.features[0].properties.LOT2
             * e.features[0].properties.TAXLOT
             * e.features[0].properties.Lot
             * e.features[0].properties.dutchlot
             * e.features[0].properties.lot2
             */
            if (e.features[0].properties.LOT2 !== undefined) {
              hoverStyleString += e.features[0].properties.LOT2 + "<br>";
            } else if (e.features[0].properties.TAXLOT !== undefined) {
              hoverStyleString += e.features[0].properties.TAXLOT + "<br>";
            } else if (e.features[0].properties.Lot !== undefined) {
              hoverStyleString += e.features[0].properties.Lot + "<br>";
            } else if (e.features[0].properties.dutchlot !== undefined) {
              hoverStyleString += e.features[0].properties.dutchlot + "<br>";
            } else if (e.features[0].properties.lot2 !== undefined) {
              hoverStyleString += e.features[0].properties.lot2 + "<br>";
            }
          } else if (item.type === "DATE-START") {
            /**
             * DATE START INFORMATION IMPORTED FROM MENY
             * e.features[0].properties.day1
             * e.features[0].properties.year1
             */
            if (
              e.features[0].properties.day1 !== undefined &&
              e.features[0].properties.year1 !== undefined
            ) {
              hoverStyleString +=
                e.features[0].properties.day1 +
                ", " +
                e.features[0].properties.year1 +
                "<br>";
            }
          } else if (item.type === "DATE-END") {
            /**
             * DATE END INFORMATION IMPORTED FROM MENY
             * e.features[0].properties.day2
             * e.features[0].properties.year2
             */
            if (
              e.features[0].properties.day2 !== undefined &&
              e.features[0].properties.year2 !== undefined
            ) {
              hoverStyleString +=
                e.features[0].properties.day2 +
                ", " +
                e.features[0].properties.year2 +
                "<br>";
            }
          } else if (item.type === "ADDRESS") {
            /**
             * ADDRESS INFORMATION IMPORTED FROM MENY
             * e.features[0].properties.Address
             */
            if (e.features[0].properties.Address !== undefined) {
              hoverStyleString += e.features[0].properties.Address + "<br>";
            }
          }
        });
        hoverStyleString += "</div>";
        if (e.features?.length) {
          if (hoveredId !== null) {
            map.current!.setFeatureState(
              {
                source: layerConfig.id,
                sourceLayer: layerConfig.sourceLayer,
                id: hoveredId,
              },
              { hover: false }
            );
          }

          if (e.features[0].id !== undefined) {
            hoveredId = e.features[0].id;
            map.current!.setFeatureState(
              {
                source: layerConfig.id,
                sourceLayer: layerConfig.sourceLayer,
                id: hoveredId,
              },
              { hover: true }
            );
            map.current!.getCanvas().style.cursor = "pointer";
          }
          hoverPopup
            .setHTML(hoverStyleString)
            .setLngLat(e.lngLat)
            .addTo(map.current!);
        }
      } else if (e.type === "mouseleave" && layerConfig.hover) {
        map.current!.getCanvas().style.cursor = "";
        if (hoveredId) {
          map.current!.setFeatureState(
            {
              source: layerConfig.id,
              sourceLayer: layerConfig.sourceLayer,
              id: hoveredId,
            },
            { hover: false }
          );
          hoveredId = null;
        }
        hoverPopup.remove();
      }
    };
  }

  const removeMapLayer = (
    map: MutableRefObject<mapboxgl.Map | null>,
    id: string
  ) => {
    if (map === null) return;
    //Remove the layer
    if (map.current!.getLayer(id)) {
      //Retrieve the stored event handlers
      const handler = (map.current as any)._eventHandlers?.[id];

      //Remove event listeners if the handler exists
      if (handler) {
        map.current!.off("mousemove", id, handler);
        map.current!.off("mouseleave", id, handler);
        map.current!.off("click", id, handler);
      }
      //Remove layer and source from map
      map.current!.removeLayer(id);
      map.current!.removeSource(id);
      //Clean up the stored handler
      delete (map.current as any)._eventHandlers[id];
    }
  };

  const addAllMapLayers = () => {
    if (currLayers !== null) {
      currLayers.forEach((x: PrismaLayer) => {
        addMapLayer(currBeforeMap, x);
        addMapLayer(currAfterMap, x);
      });
    }
  };

  const getZoomLayers = () => {
    fetch("http://localhost:3000/api/ZoomLabel", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((layers) => {
      layers.json()?.then((parsed) => {
        console.log("GOT LAYERS: ", parsed);
        if (!!parsed && !!parsed.zoomLabel) {
          let labels: PrismaZoomLabel[] = parsed.zoomLabel;

          let parsedZoomLabels: ZoomLabel[] =
            labels?.map((lbl) => {
              let currLbl: ZoomLabel = {
                title: lbl.title,
                center:
                  lbl.centerLongitude && lbl.centerLatitude
                    ? [lbl.centerLongitude, lbl.centerLatitude]
                    : undefined,
                bounds:
                  lbl.topLeftBoundLongitude &&
                  lbl.topLeftBoundLatitude &&
                  lbl.bottomRightBoundLongitude &&
                  lbl.bottomRightBoundLatitude
                    ? [
                        [lbl.topLeftBoundLongitude, lbl.topLeftBoundLatitude],
                        [
                          lbl.bottomRightBoundLongitude,
                          lbl.bottomRightBoundLatitude,
                        ],
                      ]
                    : undefined,
                zoom: lbl.zoom ?? undefined,
                bearing: lbl.bearing ?? undefined,
                zoomToBounds: false,
              };
              return currLbl;
            }) ?? [];
          let testLayers: ZoomLabel[] = [
            ...parsedZoomLabels,
            {
              title: "Long Island",
              center: [-72.94912, 40.85225],
              bounds: [
                [-74.0419692, 40.5419011],
                [-71.8562705, 41.161155],
              ],
              minZoom: undefined,
              zoom: 8,
              bearing: 0,
              zoomToBounds: true,
            },
            {
              title: "Brooklyn",
              center: [-73.93772792292754, 40.65432897355928],
              bounds: [
                [-74.04189660705046, 40.56952999398417],
                [-73.8335592388046, 40.73912795313439],
              ],
              minZoom: undefined,
              zoom: 7,
              bearing: 0,
              zoomToBounds: true,
            },
            {
              title: "New Amsterdam",
              center: [-74.01255, 40.704882],
              minZoom: undefined,
              zoom: 7,
              bearing: 0,
              zoomToBounds: true,
            },
            {
              title: "Manhattan",
              center: [-73.97719031118277, 40.78097749612493],
              bounds: [
                [-74.04772962697074, 40.682916945445164],
                [-73.90665099539478, 40.879038046804695],
              ],
              minZoom: undefined,
              zoom: 8,
              bearing: 0,
              zoomToBounds: true,
            },
            {
              title: "New Netherland",
              center: [-73.60361111111109, 41.09659166666665],
              minZoom: undefined,
              zoom: 7,
              bearing: 0,
              zoomToBounds: true,
            },
            {
              title: "New England",
              center: [-71.67755127, 42.4971076267],
              minZoom: 5.2,
              zoom: 7,
              bearing: 0,
              zoomToBounds: true,
            },
          ];
          addZoomLayers(testLayers);
          setCurrZoomLayers(testLayers);
        }
      });
    });
  };

  const getLayerSections = () => {
    fetch("http://localhost:3000/api/LayerSection", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((sections) => {
      sections.json()?.then((parsed) => {
        if (
          !!parsed &&
          !!parsed.LayerSections &&
          parsed.LayerSections.length > 0
        ) {
          let sections: PrismaLayerSection[] = parsed.LayerSections;

          let returnSectionLayers: SectionLayer[] = sections.map(
            (x: PrismaLayerSection, idx_x) => {
              let layer: SectionLayer = {
                id: x.id,
                label: x.name,
                groups: x.layerGroups.map(
                  (y: PrismaLayerGroup, idx_y: number) => {
                    let mappedGroup: SectionLayerGroup = {
                      id: y.id,
                      label: y.name,
                      iconColor: y.iconColor ?? IconColors.YELLOW,
                      iconType: FontAwesomeLayerIcons.PLUS_SQUARE,
                      isSolid: true,
                      items:
                        y.layers?.map((z: PrismaLayer, z_idx: number) => {
                          setCurrLayers((currLayers) => [...currLayers, z]);
                          let newDBMap: SectionLayerItem = {
                            id: z.id,
                            layerId: z.id,
                            label: z.label,
                            center: [z.longitude ?? 0, z.latitude ?? 0],
                            zoom: z.zoom ?? 0,
                            bearing: z.bearing ?? 0,
                            iconColor: z.iconColor ?? IconColors.YELLOW,
                            iconType: z.iconType
                              ? parseFromString(z.iconType)
                              : FontAwesomeLayerIcons.LINE,
                            isSolid: false,
                          };
                          return newDBMap;
                        }) ?? [],
                    };
                    return mappedGroup;
                  }
                ),
              };
              return layer;
            }
          );
          setSectionLayers(returnSectionLayers);
        }
      });
    });
  };

  const getMaps = () => {
    fetch("http://localhost:3000/api/map", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((maps) => {
        maps
          .json()
          ?.then((parsed) => {
            if (!!parsed && !!parsed.groups && parsed.groups.length) {
              let groups: PrismaMapFilterGroup[] = parsed.groups;
              let mapFilterGroups: MapFiltersGroup[] = groups.map(
                (grp, idx) => {
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
                        name: x.mapName,
                      };
                      return newDBMap;
                    }),
                    mapfilteritems: grp.mapfilteritems.map(
                      (x: PrismaMapFilterItem) => {
                        let filterItem: MapFilterItem = {
                          id: x.id,
                          groupId: grp.groupId,
                          label: x.label,
                          itemId: x.itemId,
                          itemName: x.itemName,
                          defaultCheckedForBeforeMap:
                            x.defaultCheckedForBeforeMap,
                          defaultCheckedForAfterMap:
                            x.defaultCheckedForAfterMap,
                          showInfoButton: x.showInfoButton,
                          showZoomButton: x.showZoomButton,
                        };
                        return filterItem;
                      }
                    ),
                  };

                  return mappedGroup;
                }
              );
              setMappedFilterItemGroups(mapFilterGroups);
            }
          })
          .catch((err) => {
            console.error("failed to convert to json: ", err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const beforeLayerFormModalOpen = () => {
    setLayerPanelVisible(false);
    setLayerPopupBefore(popUpVisible); //Store popupVisibile before value to call after modal closes
    setPopUpVisible(false); //Then set popupVisible to false
  };
  const afterLayerFormModalCloseLayers = () => {
    setLayerPanelVisible(true);
    setPopUpVisible(layerPopupBefore); //After modal close set popupVisible to whatever it was before modal call
    setCurrLayers([]);
    getLayerSections();
    getZoomLayers();
  };

  const beforeModalOpen = () => {
    setLayerPanelVisible(false);
    setLayerPopupBefore(popUpVisible); //Store popupVisibile before value to call after modal closes
    setPopUpVisible(false); //Then set popupVisible to false
    setModalOpen(true);
  };

  const afterModalClose = () => {
    setLayerPanelVisible(true);
    setPopUpVisible(layerPopupBefore); //After modal close set popupVisible to whatever it was before modal call
    setModalOpen(false);
  };

  const afterModalCloseLayers = () => {
    afterModalClose();
    setCurrLayers([]);
    getLayerSections();
    getZoomLayers();
  };

  const afterModalCloseMaps = () => {
    afterModalClose();
    getMaps();
  };

  /**
   * When the page is loaded, get all maps / layers from the API, parse these to work with our frontend models.
   */
  useEffect(() => {
    getMaps();
    getLayerSections();
    getZoomLayers();
  }, []);

  /**
   * Dynamic import for mapbox-gl-compare package to allow it to be imported. Once they release a TS package, that can be added to NPM and this can be removed.
   */
  useEffect(() => {
    import("mapbox-gl-compare").then((mod) => {
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
      style: "mapbox://styles/nittyjee/cjooubzup2kx52sqdf9zmmv2j",
      center: [-74.01454, 40.70024],
      zoom: 15.09,
      bearing: -51.3,
      attributionControl: false,
    });

    const defAfterMap = new mapboxgl.Map({
      container: afterMapContainerRef.current as HTMLElement,
      style: "mapbox://styles/nittyjee/cjowjzrig5pje2rmmnjb5b0y2",
      center: [-74.01454, 40.70024],
      zoom: 15.09,
      bearing: -51.3,
      attributionControl: false,
    });

    setDefaultBeforeMap(defBeforeMap);
    setDefaultAfterMap(defAfterMap);

    currBeforeMap.current = defBeforeMap;
    currAfterMap.current = defAfterMap;

    const mapboxCompare = new MapboxCompare(
      currBeforeMap.current,
      currAfterMap.current,
      comparisonContainerRef.current as HTMLElement
    );

    const compareSwiper = document.querySelector(
      ".compare-swiper"
    ) as HTMLElement;
    if (compareSwiper && !modalOpen) {
      compareSwiper.innerHTML = "";

      const circleHandle = document.createElement("div");
      circleHandle.classList.add("compare-circle");
      circleHandle.innerHTML = "<span>⏴⏵</span>";

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
    const mapboxCompare = new MapboxCompare(
      currBeforeMap.current,
      currAfterMap.current,
      comparisonContainerRef.current as HTMLElement
    );

    const compareSwiper = document.querySelector(
      ".compare-swiper"
    ) as HTMLElement;
    if (compareSwiper && !modalOpen) {
      compareSwiper.innerHTML = "";

      const circleHandle = document.createElement("div");
      circleHandle.classList.add("compare-circle");
      circleHandle.innerHTML = "<span>⏴⏵</span>";

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
  }, [currBeforeMap, currAfterMap]);

  useEffect(() => {
    if (currBeforeMap !== null && currAfterMap !== null) {
      addAllMapLayers();
      addZoomLayers(currZoomLayers);
    }
  }, [currLayers, currBeforeMap, currAfterMap, currZoomLayers]);

  useEffect(() => {
    if (!mapLoaded) return;
    if (currBeforeMap === null || currAfterMap === null) return;

    currLayers.forEach((layer) => {
      if (
        activeLayerIds.includes(layer.id) &&
        currBeforeMap.current?.getLayer(layer.id)
      ) {
        currBeforeMap.current!.setLayoutProperty(
          layer.id,
          "visibility",
          "visible"
        );
        currAfterMap.current!.setLayoutProperty(
          layer.id,
          "visibility",
          "visible"
        );
      } else {
        currBeforeMap.current!.setLayoutProperty(
          layer.id,
          "visibility",
          "none"
        );
        currAfterMap.current!.setLayoutProperty(layer.id, "visibility", "none");
      }
    });
  }, [activeLayerIds]);

  useEffect(() => {
    if (!currDate) return;

    var date = parseInt(currDate.format("YYYYMMDD"));
    var dateFilter: FilterSpecification = [
      "all",
      ["<=", ["get", "DayStart"], date],
      [">=", ["get", "DayEnd"], date],
    ];

    activeLayerIds.forEach((lid) => {
      if (
        currBeforeMap.current?.getLayer(lid) !== null &&
        currBeforeMap.current?.getLayer(lid)?.filter !== undefined
      ) {
        currBeforeMap.current?.setFilter(lid, dateFilter);
      }
    });
  }, [currDate, activeLayerIds]);

  // Necessary for the Modal to know what to hide
  // Modal.setAppElement('#app-body-main');

  return (
    <>
      <div id="app-body-main">
        <input className="checker" type="checkbox" id="o" hidden />
        <div className="modal">
          <div className="modal-body">
            <div className="modal-header">
              <h1>ABOUT</h1>
              <label htmlFor="o" id="close" title="Close">
                &times;
              </label>
            </div>
            <div className="modal-content">
              New York City was founded by the Dutch in 1624 as
              <i>New Amsterdam</i>, the capital of New Netherland. The New
              Amsterdam History Center is devoted to documenting and mapping New
              Amsterdam, its diverse people, landscapes, institutions and global
              legacy today.
              <p>
                We’ve presented several versions of the <i>Castello Plan</i> and
                the
                <i>Dutch Grants Map</i> here. You can see the settlement of
                houses, farms, taverns and workshops, surrounded by walls. Over
                the three centuries that followed, the area became the Financial
                District. The east wall was torn down and named Wall Street. The
                canals were paved over and turned into streets and in between
                developed skysrapers, and the island was expanded with infill.
                Above ground, almost nothing remains of New Amsterdam except the
                original street pattern. Underground, archeologists have found
                evidence of the plots of houses and gardens, Amsterdam yellow
                brick, and pollen samples of plants.
              </p>
              You can swipe the map to compare the Castello Plan in 1660 to the
              present, and explore each lot, where it shows what was there and
              who lived there. Our next steps are to expand through the full
              history of New Amsterdam with a timeline from 1624 to 1664, when
              it was taken over by the English.
              <p>
                We need your help to make this work happen. Donate now to
                develop the map and expand the research.
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
            >
              3D Map
              <img
                className="img2"
                height="18"
                src="https://encyclopedia.nahc-mapping.org/sites/default/files/inline-images/external_link_icon.png"
                width="18"
              />
            </a>
            <a
              className="encyclopedia"
              href="https://encyclopedia.nahc-mapping.org/"
              target="_blank"
            >
              Encyclopedia
              <img
                className="img2"
                height="18"
                src="https://encyclopedia.nahc-mapping.org/sites/default/files/inline-images/external_link_icon.png"
                width="18"
              />
            </a>

            <MapFormButton
              beforeOpen={beforeModalOpen}
              afterClose={afterModalCloseMaps}
            ></MapFormButton>

            <Modal
              style={{
                content: {
                  width: "30%",
                  right: "5px",
                },
              }}
              isOpen={editFormOpen}
              onRequestClose={() => {
                setEditFormOpen(false);
                setEditFormId("");
                afterModalCloseLayers();
              }}
              contentLabel="New Layer"
            >
              <EditForm
                id={editFormId}
                afterSubmit={(closeForm: boolean) => {
                  setEditFormOpen(closeForm);
                  removeMapLayer(currBeforeMap, editFormId);
                  removeMapLayer(currAfterMap, editFormId);
                  setEditFormId("");
                  afterModalCloseLayers();
                }}
              />
            </Modal>

            <label htmlFor="o" id="open-popup" style={{ display: "none" }}>
              Open PopUp
            </label>
            <label id="about" className="trigger-popup" title="Open">
              ABOUT
            </label>
            <i className="fa fa-2x fa-info-circle trigger-popup" id="info"></i>
          </div>
        </div>

        {!modalOpen && (
          <button
            id={modalOpen ? "" : "view-hide-layer-panel"}
            onClick={() => {
              setLayerPanelVisible(!layerPanelVisible);
              setPopUpVisible(!popUpVisible);
            }}
          >
            <br />
            <span id="dir-txt">&#9204;</span> <br />
            <br />
          </button>
        )}

        {popUp && (
          <CSSTransition
            in={popUpVisible}
            timeout={500}
            classNames="popup"
            unmountOnExit
          >
            <SliderPopUp
              layerName={popUp.layerName}
              nid={popUp.nid}
              type={popUp.type}
            />
          </CSSTransition>
        )}

        <div
          id="studioMenu"
          style={{ visibility: layerPanelVisible ? "visible" : "hidden" }}
        >
          <FontAwesomeIcon id="mobi-hide-sidebar" icon={faArrowCircleLeft} />
          <p className="title">LAYERS</p>
          <br />

          <>
            {(currSectionLayers ?? []).map((secLayer) => {
              return (
                <SectionLayerComponent
                  activeLayers={activeLayerIds}
                  activeLayerCallback={(newActiveLayers: string[]) => {
                    console.log("layers selected: ", newActiveLayers);
                    setActiveLayerIds(newActiveLayers);
                  }}
                  layersHeader={secLayer.label}
                  layer={secLayer}
                  beforeOpen={beforeLayerFormModalOpen}
                  afterClose={afterLayerFormModalCloseLayers}
                  openWindow={beforeModalOpen}
                  editFormVisibleCallback={(isOpen: boolean) => {
                    setEditFormOpen(isOpen);
                  }}
                  editFormIdCallback={(id: string) => {
                    setEditFormId(id);
                  }}
                  mapZoomCallback={(zoomProps: MapZoomProps) => {
                    currBeforeMap.current?.easeTo({
                      center: zoomProps.center,
                      zoom: zoomProps.zoom,
                      speed: zoomProps.speed,
                      curve: zoomProps.curve,
                      duration: zoomProps.duration,
                      easing(t) {
                        return t;
                      },
                    });
                  }}
                />
              );
            })}
            {!groupFormOpen && (
              <div
                style={{
                  paddingLeft: "15px",
                  paddingRight: "10px",
                  textAlign: "center",
                }}
              >
                <a
                  style={{
                    width: "100%",
                    backgroundColor: "grey",
                    color: "white",
                    margin: "auto",
                    padding: "2px 7px 2px 7px",
                  }}
                  onClick={() => setGroupFormOpen(true)}
                >
                  <FontAwesomeIcon
                    icon={getFontawesomeIcon(
                      FontAwesomeLayerIcons.PLUS_SQUARE,
                      true
                    )}
                  ></FontAwesomeIcon>{" "}
                  New Group Folder
                </a>
              </div>
            )}
            {groupFormOpen && (
              <NewLayerSectionForm
                afterSubmit={() => setGroupFormOpen(false)}
              ></NewLayerSectionForm>
            )}
          </>

          <MapFilterWrapperComponent
            beforeMapCallback={(map) => {
              // Set beforeMap to selected map by changing the mapId
              setMapStyle(currBeforeMap, map.styleId);
            }}
            afterMapCallback={(map) => {
              // Set afterMap to selected map by changing the mapId
              setMapStyle(currAfterMap, map.styleId);
            }}
            defaultMap={beforeMapItem}
            mapGroups={mappedFilterItemGroups}
            mapZoomCallback={(zoomProps: MapZoomProps) => {
              currBeforeMap.current?.easeTo({
                center: zoomProps.center,
                zoom: zoomProps.zoom,
                speed: zoomProps.speed,
                curve: zoomProps.curve,
                duration: zoomProps.duration,
                easing(t) {
                  return t;
                },
              });
            }}
            beforeOpen={beforeModalOpen}
            afterClose={afterModalClose}
          />
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

        <div id="mobi-view-sidebar">
          <i className="fa fa-bars fa-2x"></i>
        </div>

        <SliderWithDatePanel
          callback={(date: moment.Moment | null) => setCurrDate(date)}
        ></SliderWithDatePanel>

        <div id="loading">
          <i className="fa fa-sync fa-10x fa-spin" id="loading-icon"></i>
        </div>
      </div>
    </>
  );
}
