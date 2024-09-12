'use client'
import Image from "next/image";
import SectionLayersComponent from "./components/layers/section-layers.component";
import moment from 'moment';
import { useState } from "react";
import SliderWithDatePanel from "./components/slider/slider-with-date-panel.component";
import { SectionLayer } from "./models/layers/layer.model";

// Remove this when we have a way to get layers correctly
const manhattanLayerSections = [
  {
    id: "grants_layer_items",
    caretId: "dutch-grants-layer-caret",
    label: "1640-64 | Dutch Grants",
    itemSelector: ".dutch_grants_layer_item",
    zoomTo: "NA",
    infoId: "grants-info-layer",
    type: "group",
  },
  {
    id: "grants_layer",
    className: "grants_layer",
    name: "grants_layer",
    iconColor: "#e3ed58",
    label: "Information",
    topLayerClass: "dutch_grants_layer",
    iconType: "square",
    isSolid: true,
  },
  {
    id: "grants_layer_lines",
    className: "grants_layer",
    name: "grants_layer_lines",
    iconColor: "#ff0000",
    label: "Lines",
    topLayerClass: "dutch_grants_layer",
    iconType: "square",
    isSolid: false,
  },
  {
    id: "circle_point",
    name: "circle_point",
    checked: true,
    label: "1643-75 | Lot Events",
    iconColor: "#097911",
    zoomTo: "NA",
    infoId: "demo-taxlot-info-layer",
    type: "lots-events",
  },
  {
    id: "castello_points",
    name: "castello_points",
    label: "1660 | Castello Taxlots",
    iconColor: "#ff0000",
    zoomTo: "NA",
    infoId: "castello-info-layer",
    type: "castello-points",
  },
];

// Remove this when we have a way to get layers correctly
const longIslandLayerSections = [
  {
    id: "native_groups_layer_items",
    name: "native_groups_layer_items",
    caretId: "native-groups-layer-caret",
    label: "1600s | Long Island Tribes",
    zoomTo: "LongIsland",
    infoId: "native-groups-info-layer",
    type: "group",
    itemSelector: ".native_groups_layer_item",
  },
  {
    className: "native_groups_layer",
    id: "native_groups_labels",
    name: "native_groups_labels",
    iconColor: "#0b0ee5",
    label: "Labels",
    topLayerClass: "native_groups_layer",
    iconType: "comment-dots",
    isSolid: true,
  },
  {
    className: "native_groups_layer",
    id: "native_groups_area",
    name: "native_groups_area",
    iconColor: "#ff1493",
    label: "Area",
    iconType: "square",
    topLayerClass: "native_groups_layer",
    isSolid: true,
  },
  {
    className: "native_groups_layer",
    id: "native_groups_lines",
    name: "native_groups_lines",
    iconColor: "#ff0000",
    label: "Borders",
    iconType: "square",
    topLayerClass: "native_groups_layer",
  }
];

export default function Home() {
  const [currDate, setCurrDate] = useState<moment.Moment | null>(null)

  const currLayers: SectionLayer[] = [
    ...manhattanLayerSections.map(x => {
      let mappedVal: SectionLayer = {
        id: x.id,
        name: x.name ?? "",
        label: x.label,
        checked: x.checked ?? false,
        iconColor: x.iconColor ?? ""
      }

      return mappedVal
    }),
    ...longIslandLayerSections.map(x => {
      let mappedVal: SectionLayer = {
        id: x.id,
        name: x.name ?? "",
        label: x.label,
        checked: false,
        iconColor: x.iconColor ?? ""
      }

      return mappedVal;
    })
  ];

  return (
    <>
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

          <label htmlFor="o" id="open-popup" style={{display: "none"}}>Open PopUp</label>
          <label id="about" className="trigger-popup" title="Open">ABOUT</label>
          <i className="fa fa-2x fa-info-circle trigger-popup" id="info"></i>
        </div>
      </div>

      <button id="view-hide-layer-panel">
        <br />
        <span id="dir-txt">&#9204;</span> <br /><br />
      </button>
      <div id="rightInfoBar" className="rightInfoBarBorder">
        <div className="infoLayerElem" id="infoLayerGrantLots"></div>
        <div className="infoLayerElem" id="infoLayerDutchGrants"></div>
        <div className="infoLayerElem" id="infoLayerNativeGroups"></div>
        <div className="infoLayerElem" id="infoLayerCastello"></div>
        <div className="infoLayerElem" id="demoLayerInfo"></div>
      </div>

      {/* Add Layers in here when structured somewhere */}
      <SectionLayersComponent layers={currLayers} />

      <div id="before" className="map"></div>
      <div id="after" className="map"></div>

      <div id="mobi-view-sidebar"><i className="fa fa-bars fa-2x"></i></div>

      <SliderWithDatePanel callback={(date: moment.Moment | null) => setCurrDate(date)}></SliderWithDatePanel>

      <div id="loading">
        <i className="fa fa-sync fa-10x fa-spin" id="loading-icon"></i>
      </div>
    </>
  );
}
