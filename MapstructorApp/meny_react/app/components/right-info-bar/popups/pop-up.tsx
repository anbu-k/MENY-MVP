import { GenericPopUpProps } from "@/app/models/popups/generic-pop-up.model";
import { useEffect, useState } from "react";

type PopUpProps = {
    popUpProps: GenericPopUpProps,
}

const BuildPopUpInfo = (props: PopUpProps) => {
    const [renderedEntity, setRenderedEntity] = useState(null);
    const [nid, setNid] = useState<number | string | undefined>(props.popUpProps.nid);
    useEffect(() => {
        fetch(`https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`)
        .then((buffer) => buffer.json())
        .then((res) => {setRenderedEntity(res[0].rendered_entity)})
        .catch((error) => {
            setRenderedEntity(null);
            console.log(error);
        });
    }, [nid]);
  
    if (props.popUpProps.type === "castello-taxlot")
      return (
        <div id ='rightInfoBar' className= 'rightInfoBarBorder'>
            <div className="infoLayerElem" id="infoLayerCastello">
                <h3>Castello Taxlot (1660)</h3>
                <hr/><br/>
                <b>Taxlot: </b>{props.popUpProps.lot2}<br/>
                <b>Property Type: </b>{props.popUpProps.tax_lots_1}
                <br/><br/>
                <b>Encyclopedia Page: </b><br/><a href="https://encyclopedia.nahc-mapping.org/lots/taxlot{props.popUpProps.lot2}" target="_blank">https://encyclopedia.nahc-mapping.org/lots/taxlot{props.popUpProps.lot2}</a>
            </div>
        </div>
        
    );
    // if (props.popUpProps.type === "lot-event")
    //   return (
    //     <div className="infoLayerElem" id="infoLayerGrantLots">
    //         <div className="infoLayerCastelloPopUp"><b>Taxlot (1660):</b><br/>${props.popUpProps.lot2}</div>
    //     </div>
    // );
  
    if (renderedEntity) {
          const html: string = renderedEntity;
        //   console.log("Redered Entity:")
        //   console.log(res[0].rendered_entity);
          // Define the prefix
          var prefix = "https://encyclopedia.nahc-mapping.org";
  
          // Define the regular expression pattern
          var pattern = /(<a\s+href=")([^"]+)(")/g;
          var modifiedHtmlString = "";
          const addOnForLongIslandTribes = `
            <h3>Long Island Tribes</h3>
            <hr/>
            `
            // Uncomment this to see a styling for lots events
            // const addOnForLotEvents = `<h2>Lot:</h2>`
            if(props.popUpProps.type === "long-island-native-groups")
            {
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
            });
            
            if(props.popUpProps.type === "long-island-native-groups")
            {
                return (
                    <div id ='rightInfoBar' className= 'rightInfoBarBorder'>
                        <div className="infoLayerElem" id="infoLayerNativeGroups" dangerouslySetInnerHTML={{__html: modifiedHtmlString}}/>
                    </div>
                );
            }
            else if(props.popUpProps.type === "dutch-grant")
            {
                return (
                    <div id ='rightInfoBar' className= 'rightInfoBarBorder'>
                        <div className="infoLayerElem" id="infoLayerDutchGrants" dangerouslySetInnerHTML={{__html: modifiedHtmlString}}/>
                    </div>
                );
            }
            else if(props.popUpProps.type === "lot-event")
                {
                    return (
                        <div id ='rightInfoBar' className= 'rightInfoBarBorder'>
                            <div className="infoLayerElem" id="infoLayerGrantLots" dangerouslySetInnerHTML={{__html: modifiedHtmlString}}/>
                        </div>
                    );
                }
    // } else {
    //  //REMEMBER TO REPLACE props. WITH props.popUpProps.
    //   let popup_html = "";
    //   if (typeof lots_info[props.Lot] === "undefined") {
    //     popup_html = `<h3>Dutch Grant</h3><hr>${props.name}<br><b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/grantlot/${props.Lot}' target='_blank'>${props.Lot}</a><br><br><b>Start:</b> <i>${props.day1} ${props.year1}</i><br><b>End:</b> <i>${props.day2} ${props.year2}</i><br><br><b>Description (partial):</b><br>${props.descriptio}<br><br>`;
    //   } else {
    //     let builds_imgs = "";
    //     if (lots_info[props.Lot].builds.length > 0) {
    //       for (let i = 0; i < lots_info[props.Lot].builds.length; i++) {
    //         builds_imgs += `<img src='https://encyclopedia.nahc-mapping.org${
    //           lots_info[props.Lot].builds[i]
    //         }' width='258' ><br><br>`;
    //       }
    //     }
    //     popup_html = `<h3>Dutch Grant</h3><hr><br><b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/lots/grantlot${props.Lot}' target='_blank'>${props.Lot}</a><br><br>`;
    //     if (lots_info[props.Lot].to_party_linked.length > 0) {
    //       popup_html += `<b>To Party:</b> <i>${
    //         lots_info[props.Lot].to_party_linked
    //       }</i><br><br>`;
    //     } else if (lots_info[props.Lot].to_party.length > 0) {
    //       popup_html += `<b>To Party:</b> <i>${
    //         lots_info[props.Lot].to_party
    //       }</i><br><br>`;
    //     }
    //     if (lots_info[props.Lot].from_party_linked.length > 0) {
    //       popup_html += `<b>From Party:</b> <i>${
    //         lots_info[props.Lot].from_party_linked
    //       }</i><br><br>`;
    //     } else if (lots_info[props.Lot].from_party.length > 0) {
    //       popup_html += `<b>From Party:</b> <i>${
    //         lots_info[props.Lot].from_party
    //       }</i><br><br>`;
    //     }
    //     if (lots_info[props.Lot].date_start.length > 0) {
    //       popup_html += `<b>Start:</b> <i>${
    //         lots_info[props.Lot].date_start
    //       }</i><br>`;
    //     }
    //     if (lots_info[props.Lot].date_end.length > 0) {
    //       popup_html += `<b>End:</b> <i>${
    //         lots_info[props.Lot].date_end
    //       }</i><br><br>`;
    //     }
    //     if (lots_info[props.Lot].descr.length > 0) {
    //       popup_html += `<b>Description:</b><br><i>${
    //         lots_info[props.Lot].descr
    //       }</i>`;
    //     }
    //     popup_html += `<br><br>${builds_imgs}`;
    //   }
    //   return popup_html;
    }
    else
    {
        return (
            <div id ='rightInfoBar' className= 'rightInfoBarBorder'>
                <div className="infoLayerElem" id="infoLayerGrantLots">NO NID FOUND</div>
            </div>
        );
    }
  };
export default BuildPopUpInfo;
//Zak comment get info methods below that fill lots_info
//This will leave at some point but I want them here to figure
//out how to deal with this lots_info
    
// for test local host REST_API/places-list-export.json
// REST API https://encyclopedia.nahc-mapping.org/places-list-export
    
//   function getSettlementsInfo() {
//     var data_info_index: string = "";
//     var settlements_info_length: number = 0;
    
//     fetch(
//         `https://encyclopedia.nahc-mapping.org/places-list-export`, 
//         {method: 'GET',
//         headers: {"Content-Type": "application/x-www-form-urlencoded"},
//         },
//       )
//         .then((buffer) => buffer.json())
//         .then((res) => {
//           const html = res[0].rendered_entity;
//           // Define the prefix
//           var prefix = "https://encyclopedia.nahc-mapping.org";
//         if (res.length > 0) {
//           for (let i = 0; i < res.length; i++) {
//             if (typeof res[i].nid[0].value != "undefined") {
//               data_info_index = "" + res[i].nid[0].value + "";
    
//               settlements_info[data_info_index] = {
//                 name:
//                   res[i].title.length > 0
//                     ? (res[i].path.length > 0
//                         ? "<a href='https://encyclopedia.nahc-mapping.org" +
//                           res[i].path[0].alias +
//                           "' target='_blank'>"
//                         : "") +
//                       res[i].title[0].value +
//                       (res[i].path.length > 0 ? "</a>" : "")
//                     : "",
//                 curr_loc:
//                   res[i].field_current_location_text_.length > 0
//                     ? (res[i].field_current_location_linked_.length > 0
//                         ? "<a href='https://nahc-mapping.org" +
//                           res[i].field_current_location_linked_[0].url +
//                           "' target='_blank'>"
//                         : "") +
//                       res[i].field_current_location_text_[0].value +
//                       (res[i].field_current_location_linked_.length > 0
//                         ? "</a>"
//                         : "")
//                     : "",
//                 curr_loc_name:
//                   res[i].field_current_location_text_.length > 0
//                     ? res[i].field_current_location_text_[0].value
//                     : "",
//                 curr_loc_url:
//                   res[i].field_current_location_linked_.length > 0
//                     ? res[i].field_current_location_linked_[0].url
//                     : "",
//                 curr_loc_target:
//                   res[i].field_current_location_linked_.length > 0
//                     ? res[i].field_current_location_linked_[0].target_id
//                     : "",
//                 date:
//                   res[i].field_date_text_.length > 0
//                     ? res[i].field_date_text_[0].value
//                     : "",
//                 descr:
//                   res[i].field_description10.length > 0
//                     ? res[i].field_description10[0].value
//                     : "",
//                 curr_loc_txt:
//                   res[i].field_current_location_text_.length > 0
//                     ? res[i].field_current_location_text_[0].value
//                     : "",
//                 curr_loc_link:
//                   res[i].field_current_location_linked_.length > 0
//                     ? res[i].field_current_location_linked_[0].url
//                     : "",
//                 img1:
//                   res[i].field_image1_1.length > 0
//                     ? res[i].field_image1_1[0].url
//                     : "",
//                 img2:
//                   res[i].field_image_2.length > 0
//                     ? res[i].field_image_2[0].url
//                     : "",
//                 img3:
//                   res[i].field_image_3.length > 0
//                     ? res[i].field_image_3[0].url
//                     : "",
//               };
    
//               settlements_linked_location[res[i].nid[0].value] =
//                 res[i].title[0].value;
    
//               settlements_info_length += 1;
//             }
//           }
//         }
//       })
//       .catch((error) => {
//         console.log("getSettlementsInfo error: " + error);
//       });
//   }
    
    // for test local host REST_API/taxlot-entities-export.json
    // REST API https://encyclopedia.nahc-mapping.org/taxlot-entities-export
    
//   function getTaxlotEventEntitiesDescrInfo() {
//     var data_info_index = "";
//     taxlot_entities_info_length = 0;
    
//     $.ajax({
//       url: "https://encyclopedia.nahc-mapping.org/taxlot-entities-export",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       type: "get",
//       dataType: "json",
//       data: {},
//     })
//       .done(function (data) {
//         if (data.length > 0) {
//           for (let i = 0; i < data.length; i++) {
//             // old api
//             if (typeof data[i].nid[0].value != "undefined") {
//               data_info_index = "" + data[i].nid[0].value + "";
//               taxlot_event_entities_info[data_info_index] = {
//                 name: data[i].title.length > 0 ? data[i].title[0].value : "",
//                 name_html:
//                   data[i].title.length > 0
//                     ? (data[i].path.length > 0
//                         ? "<a href='https://encyclopedia.nahc-mapping.org/node/" +
//                           data_info_index +
//                           "' target='_blank'>"
//                         : "") +
//                       data[i].title[0].value +
//                       (data[i].path.length > 0 ? "</a>" : "")
//                     : "",
//                 descr:
//                   data[i].field_description14.length > 0
//                     ? data[i].field_description14[0].value
//                     : "",
//               };
    
//               taxlot_entities_info_length += 1;
//             }
//           }
//         }
//       })
//       .fail(handleAjaxError);
//   }
    
//   // for test local host REST_API/taxlot-events-export.json
//   // REST API https://encyclopedia.nahc-mapping.org/taxlot-events-export
    
//   function getTaxlotEventsInfo() {
//     var data_info_index = "";
//     taxlot_events_info_length = 0;
    
//     $.ajax({
//       url: "https://encyclopedia.nahc-mapping.org/taxlot-events-export",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       type: "get",
//       dataType: "json",
//       data: {},
//     })
//       .done(function (data) {
//         if (data.length > 0) {
//           for (let i = 0; i < data.length; i++) {
//             if (typeof data[i].title != "undefined") {
//               data_info_index = data[i].title.match(/\/node\/(.*?)\"/)[1];
    
//               if (data_info_index !== null) {
//                 taxlot_events_info[data_info_index] = {
//                   //title: data[i].title,
//                   title: data[i].title.replaceAll(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   start: data[i].field_daystart,
//                   end: "",
//                   taxlot: data[i].field_taxlot.replaceAll(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   taxlotevent: data[i].field_taxlotevent.replaceAll(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   to_party: data[i].field_to.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   to_party2: data[i].field_to_party_1.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   from_party: data[i].field_from.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   from_party2: data[i].field_from_party_1.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
    
//                   property_type: data[i].field_pro.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   to_party_1_text: data[i].field_events_to_party_1_text_.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   to_party_1_role: data[
//                     i
//                   ].field_party_role_in_transaction_.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   to_party_1_entity: data[i].field_entity_description_to_.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   to_party_2_text: data[i].field_asdf_to_party_2_text_.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   to_party_2_role: data[i].field_party_role3.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   to_party_2_entity: data[
//                     i
//                   ].field_entity_description_to_part.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   from_party_1_text: data[i].field_from_party_1_text_.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   from_party_1_role: data[i].field_partyrole.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   from_party_1_entity: data[i].field_entity_desc.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   from_party_2_text: data[i].field_from_party_2_text_.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   from_party_2_role: data[i].field_party_role2.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   from_party_2_entity: data[
//                     i
//                   ].field_entity_description_from_pa.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                 };
    
//                 taxlot_events_info_length += 1;
//               }
//             }
//           }
//         }
//       })
//       .fail(handleAjaxError);
//   }
    
//   // for test local host REST_API/info-entities-export.json
//   // REST API https://encyclopedia.nahc-mapping.org/info-entities-export
    
//   function getInfosEntity() {
//     var data_info_index = "";
//     infos_entity_length = 0;
    
//     $.ajax({
//       url: "https://encyclopedia.nahc-mapping.org/info-entities-export",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       type: "get",
//       dataType: "json",
//       data: {},
//     })
//       .done(function (data) {
//         if (data.length > 0) {
//           for (let i = 0; i < data.length; i++) {
//             // old api
//             if (typeof data[i].nid[0].value != "undefined") {
//               data_info_index = "" + data[i].nid[0].value + "";
    
//               infos_entity[data_info_index] = {
//                 name: data[i].title.length > 0 ? data[i].title[0].value : "",
//                 name_html:
//                   data[i].title.length > 0
//                     ? (data[i].path.length > 0
//                         ? "<a href='https://encyclopedia.nahc-mapping.org/node/" +
//                           data_info_index +
//                           "' target='_blank'>"
//                         : "") +
//                       data[i].title[0].value +
//                       (data[i].path.length > 0 ? "</a>" : "")
//                     : "",
//                 descr: data[i].body.length > 0 ? data[i].body[0].value : "",
//               };
    
//               infos_entity_length += 1;
//             }
//           }
//         }
//       })
//       .fail(handleAjaxError);
//   }
    
//   // for test local host REST_API/brooklyn-grant-ids-export.json
//   // REST API https://encyclopedia.nahc-mapping.org/brooklyn-grant-ids-export
    
//   function getBrooklynGrantsInfo() {
//     var data_info_index = "";
//     brooklyn_grants_length = 0;
    
//     $.ajax({
//       url: "https://encyclopedia.nahc-mapping.org/brooklyn-grant-ids-export",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       type: "get",
//       dataType: "json",
//       data: {},
//     })
//       .done(function (data) {
//         if (data.length > 0) {
//           for (let i = 0; i < data.length; i++) {
//             if (typeof data[i].nid[0].value != "undefined") {
//               data_info_index = "" + data[i].nid[0].value + "";
    
//               brooklyn_grants_info[data_info_index] = {
//                 name: data[i].title.length > 0 ? data[i].title[0].value : "",
//                 date_start:
//                   data[i].field_start_date_.length > 0
//                     ? data[i].field_start_date_[0].value
//                     : "",
    
//                 to_party:
//                   data[i].field_to_party_1_text_.length > 0
//                     ? data[i].field_to_party_1_text_[0].value.split("\n")[0]
//                     : "",
//                 to_party_linked:
//                   data[i].field_to_party_1222.length > 0
//                     ? "https://nahc-mapping.org/mappingNY/encyclopedia" +
//                       data[i].field_to_party_1222[0].url
//                     : "",
    
//                 to_party2:
//                   data[i].field_to_party_2_text222.length > 0
//                     ? data[i].field_to_party_2_text222[0].value
//                     : "",
//                 to_party2_linked:
//                   data[i].field_to_party_2_text_.length > 0
//                     ? "https://nahc-mapping.org/mappingNY/encyclopedia" +
//                       data[i].field_to_party_2_text_[0].url
//                     : "",
    
//                 from_party:
//                   data[i].field_from_party_1222.length > 0
//                     ? data[i].field_from_party_1222[0].value
//                     : "",
//                 from_party_linked:
//                   data[i].field_from_party_12222.length > 0
//                     ? "https://nahc-mapping.org/mappingNY/encyclopedia" +
//                       data[i].field_from_party_12222[0].url
//                     : "",
    
//                 indigenous_signatories:
//                   data[i].field_history_notes222.length > 0
//                     ? data[i].field_history_notes222[0].value
//                     : "",
//               };
    
//               brooklyn_grants_length += 1;
//             }
//           }
//         }
//       })
//       .fail(handleAjaxError);
//   }
    
//   // for test local host REST_API/lots-export2.json
//   // REST API https://encyclopedia.nahc-mapping.org/lots-export2
    
//   function getLotsInfo() {
//     var data_info_index = "";
//     lots_info_length = 0;
    
//     $.ajax({
//       url: "https://encyclopedia.nahc-mapping.org/lots-export2",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       type: "get",
//       dataType: "json",
//       data: {},
//     })
//       .done(function (data) {
//         if (data.length > 0) {
//           for (let i = 0; i < data.length; i++) {
//             if (typeof data[i].field_old_nid != "undefined") {
//               if (data[i].field_old_nid != "") {
//                 if (data[i].field_content_type == "Grant Lots") {
//                   data_info_index = data[i].field_old_title;
//                   data_info_index = data_info_index.replace(/\s+/g, "");
//                   if (/FortAmsterdam/.test(data_info_index)) {
//                     data_info_index = "Fort Amsterdam";
//                   }
//                 } else {
//                   data_info_index = "" + data[i].field_old_nid + "";
//                 }
    
//                 lots_info[data_info_index] = {
//                   name: data[i].field_content_type,
//                   title: data[i].field_old_title,
//                   title_linked: data[i].title
//                     .replace(
//                       />[^<]+<\/a>/,
//                       ">" + data[i].field_old_title + "</a>"
//                     )
//                     .replace(
//                       "href=\u0022",
//                       "target=\u0022_blank\u0022 href=\u0022https://encyclopedia.nahc-mapping.org/"
//                     ),
//                   brooklyn_title: data[i].field_original_title_temp,
//                   to_party_linked: data[i].field_to_party_1222.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   from_party_linked: data[i].field_from_party.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                   to_party: data[i].field_to_party_1_text_,
//                   from_party: data[i].field_from_party_text_,
//                   to_party2: data[i].field_to_party_2_text222,
//                   to_party2_linked: data[i].field_to_party_2_text_.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
    
//                   //ADDED FIELDS
//                   to_party_linked2: data[i].field_name456
//                   ? data[i].field_name456.replace(
//                       "href=\"",
//                       "target=\"_blank\" href=\"https://your-link-prefix/"
//                     )
//                   : "",
//                   to_party_text2: data[i].field_name || "",
            
//                   from_party_linked2: data[i].field_from_party_12222
//                     ? data[i].field_from_party_12222.replace(
//                         "href=\"",
//                         "target=\"_blank\" href=\"https://your-link-prefix/"
//                       )
//                     : "",
//                   from_party_text2: data[i].field_from_party_1222 || "",
//                   //END ADDED FIELDS
    
//                   date_start: data[i].field_date_start_text_,
//                   date_end: data[i].field_date_end_text_,
//                   indigenous_signatories: data[i].field_history_notes222,
//                   notes: "", // ???
//                   descr: data[i].field_grant_description,
//                   builds:
//                     data[i].field_current_buildings_and_land.length > 0
//                       ? data[i].field_current_buildings_and_land.split(", ")
//                       : [],
//                   type: data[i].field_proptype.replace(
//                     "href=\u0022",
//                     "target=\u0022_blank\u0022 href=\u0022https://nahc-mapping.org/mappingNY/encyclopedia"
//                   ),
//                 };
//                 lots_info_length += 1;
//               }
//             }
//           }
//         }
//       })
//       .fail(handleAjaxError);
//   }