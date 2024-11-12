import { GenericPopUpProps } from "@/app/models/popups/pop-up.model";
import { useEffect, useState } from "react";
import { render } from "react-dom";

const SliderPopUp = (props: GenericPopUpProps) => {
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

  if (renderedEntity) {
    const html: string = renderedEntity;
    //   console.log("Redered Entity:")
    //   console.log(res[0].rendered_entity);
    // Define the prefix
    var prefix = "https://encyclopedia.nahc-mapping.org";

    // Define the regular expression pattern
    var pattern = /(<a\s+href=")([^"]+)(")/g;
    var modifiedHtmlString =
      "<h3 id='popupHeader'>" + props.layerName + "</h3><hr>";
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
