import { GenericPopUpProps } from "@/app/models/popups/pop-up.model";
import { useEffect, useState } from "react";
import { render } from "react-dom";

type PopUpProps = {
  popUpProps: GenericPopUpProps;
};

const SliderPopUp = (props: PopUpProps) => {
  const [renderedEntity, setRenderedEntity] = useState(null);
  const nid: number | string | null = props.nid ?? null;
  fetch(
    `https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`
  )
    .then((buffer) => buffer.json())
    .then((res) => {
      setRenderedEntity(res[0].rendered_entity);
    })
    .catch((error) => {
      setRenderedEntity(null);
      console.log(error);
    });

  if (props.popUpProps.type === "castello-taxlot") {
    const hrefUrl: string =
      "https://encyclopedia.nahc-mapping.org/lots/taxlot" +
      props.popUpProps.lot2;
    return (
      <div id="rightInfoBar" className="rightInfoBarBorder">
        <div className="infoLayerElem" id="infoLayerCastello">
          <h3>Castello Taxlot (1660)</h3>
          <hr />
          <br />
          <b>Taxlot: </b>
          {props.popUpProps.lot2}
          <br />
          <b>Property Type: </b>
          {props.popUpProps.tax_lots_1}
          <br />
          <br />
          <b>Encyclopedia Page: </b>
          <br />
          <a href={hrefUrl} target="_blank">
            https://encyclopedia.nahc-mapping.org/lots/taxlot
            {props.popUpProps.lot2}
          </a>
        </div>
      </div>
    );
  }

  if (renderedEntity) {
    const html: string = renderedEntity;
    //   console.log("Redered Entity:")
    //   console.log(res[0].rendered_entity);
    // Define the prefix
    var prefix = "https://encyclopedia.nahc-mapping.org";

    // Define the regular expression pattern
    var pattern = /(<a\s+href=")([^"]+)(")/g;
    var modifiedHtmlString = "<h3 id='popupHeader'>"+ props.popUpProps.layerName + "</h3><hr>";
    const addOnForLongIslandTribes = `
            <h3>Long Island Tribes</h3>
            <hr/>
            `;
    // Uncomment this to see a styling for lots events
    // const addOnForLotEvents = `<h2>Lot:</h2>`
    if (props.popUpProps.type === "long-island-native-groups") {
      modifiedHtmlString += addOnForLongIslandTribes;
    }
    // Uncomment this to see a styling for lots events
    /* if(sliderPopupName === "#demoLayerInfo"){
              modifiedHtmlString += addOnForLotEvents;
            } */
    // Replace href attributes with the prefixed version
    modifiedHtmlString += html
      .replace(pattern, (_: any, p1: any, p2: any, p3: any) => {
        if (p2.slice(0, 4) === "http") {
          return p1 + p2 + p3;
        }
        return p1 + prefix + p2 + p3;
      })
      .replace(/(<a\s+[^>]*)(>)/g, (_: any, p1: any, p2: any) => {
        return p1 + ' target="_blank"' + p2;
      })
      .replace(
        /(<img.*src=")([^"]+)(")/g,
        (_: any, p1: any, p2: any, p3: any) => {
          if (p2.slice(0, 4) === "http") {
            return p1 + p2 + p3;
          }
          return p1 + prefix + p2 + p3;
        }
      );

    return (
      <div id="rightInfoBar" className="rightInfoBarBorder">
        <div
          id={props.type + "SliderPopup"}
          dangerouslySetInnerHTML={{ __html: modifiedHtmlString }}
        />
      </div>
    );
  } else {
    return (
      <div id="rightInfoBar" className="rightInfoBarBorder">
        <div id={props.type + "SliderPopup"}></div>
      </div>
    );
  }
};
export default SliderPopUp;
