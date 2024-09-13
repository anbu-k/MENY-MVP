import { InfoLayerGrantLotsProps } from "@/app/models/info-layer/info-layer-grant-lots.model";
import { useState } from "react";


const InfoLayerGrantLots = (props: InfoLayerGrantLotsProps) => {
    const aTagPrefix = "https://encyclopedia.nahc-mapping.org/lots/grantlot";
    return (
        <>
            <h3>Dutch Grant</h3>
            <hr></hr>
            {props.name}
            <br></br>
            Dutch Grant Lot: <a href={aTagPrefix + props.Lot} target='_blank'>{props.Lot}</a>
            <br></br>
            <b>Start:</b>
            <i>{props.day1} {props.year1}</i>
            <br></br>
            <b>End:</b>
            <i>{props.day2} {props.year2}</i>
            <br></br>
            <b>Description (partial):</b>
            <br></br>
            {props.description}
            <br></br>
        </>

        // `<h3>Dutch Grant</h3>
        // <hr>${props.name}<br><b>Dutch Grant Lot:</b> 
        // <a href='https://encyclopedia.nahc-mapping.org/grantlot/${props.Lot}' target='_blank'>${props.Lot}</a>
        // <br><br>
        // <b>Start:</b> 
        // <i>${props.day1} ${props.year1}</i>
        // <br>
        // <b>End:</b> 
        // <i>${props.day2} ${props.year2}</i>
        // <br><br>
        // <b>Description (partial):</b>
        // <br>${props.description}<br><br>`
    );
}
export default InfoLayerGrantLots;