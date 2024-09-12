import Image from "next/image";

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
      <div id="studioMenu">
        <i id="mobi-hide-sidebar" className="fa fa-arrow-circle-left fa-3x"></i>
        <p className="title">LAYERS</p>
        <br />
        <center>
          <b
            ><i
              className="fas fa-minus-square compress-expand-icon"
              id="manahatta-section-caret"
              onClick={sectionCompressExpand('#manahatta-section-layers','#manahatta-section-caret')}
            ></i>
            &nbsp; Manhattan</b>
        </center>
        <div id="manahatta-section-layers"></div>
        <br />
        <center>
          <b
            ><i
              className="fas fa-plus-square compress-expand-icon"
              id="long-island-section-caret"
              onClick={sectionCompressExpand('#long-island-section-layers','#long-island-section-caret')}
            ></i>
            &nbsp; Long Island</b>
        </center>
        <div id="long-island-section-layers"></div>

        <br />
        <div>
          <script src="js/generateLayers.js"></script>
          <hr />
          <p className="title">MAPS</p>

          <div className="layer-list-row">
            <input
              className="clm2yrx1y025401p93v26bhyl"
              type="radio"
              name="ltoggle"
              value="clm2yrx1y025401p93v26bhyl"
              checked
            />
            <input
              className="clm2yrx1y025401p93v26bhyl"
              type="radio"
              name="rtoggle"
              value="clm2yrx1y025401p93v26bhyl"
            />
            &nbsp;
            <label htmlFor="clm2yrx1y025401p93v26bhyl"
              >Current Satellite
              <div className="dummy-label-layer-space"></div></label>
            <div className="layer-buttons-block">
              <div className="layer-buttons-list">
                <i style={{width: "16px"}}></i>
                <i
                  className="fa fa-info-circle layer-info trigger-popup"
                  id="satellite-image"
                  title="Layer Info"
                ></i>
              </div>
            </div>
          </div>
          <br />
          <center>
            <b
              ><i
                className="fas fa-minus-square compress-expand-icon"
                id="castello-maps-section-caret"
                onClick={sectionCompressExpand('#castello-maps-section','#castello-maps-section-caret')}
              ></i>
              &nbsp; 1660 | Castello Plan</b
            >
          </center>
          <div id="castello-maps-section"></div>
          <center>
            <button onClick={zoomtobounds('World')} id="zoom-world">
              &nbsp; &nbsp; <i className="fa fa-globe"></i> &nbsp;
              <b>Zoom to World</b> &nbsp; &nbsp; &nbsp;
            </button>
          </center>
        </div>
      </div>

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
