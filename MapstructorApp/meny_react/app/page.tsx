import Image from "next/image";
import SectionLayersComponent from "./components/layers/section-layers.component";

export default function Home() {
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
      <SectionLayersComponent layers={[]} />

      <div id="before" className="map"></div>
      <div id="after" className="map"></div>

      <div id="mobi-view-sidebar"><i className="fa fa-bars fa-2x"></i></div>

      <div id="datepanel">
        <b><span id="date"></span></b>
      </div>

      <div id="footer">
        <div id="slider">
          <div id="mobi-year">...</div>

          <div className="timeline">
            <div className="year">
              <span id="ruler-date1"> ... </span><span className="timeline-ruler"></span>
            </div>
            <div className="year">
              <span id="ruler-date2"> ... </span><span className="timeline-ruler"></span>
            </div>
            <div className="year">
              <span id="ruler-date3"> ... </span><span className="timeline-ruler"></span>
            </div>
            <div className="year">
              <span id="ruler-date4"> ... </span><span className="timeline-ruler"></span>
            </div>
            <div className="year">
              <span id="ruler-date5"> ... </span><span className="timeline-ruler"></span>
            </div>
          </div>
        </div>
      </div>

      <div id="loading">
        <i className="fa fa-sync fa-10x fa-spin" id="loading-icon"></i>
      </div>
    </>
  );
}
