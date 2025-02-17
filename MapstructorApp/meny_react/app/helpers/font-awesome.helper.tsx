import {
    faCommentDots,
    faMinusSquare,
    faPlayCircle,
    faPlusSquare,
    faSquare,
    faCheckSquare
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeLayerIcons } from "../models/font-awesome.model";
import {
    faCrosshairs as faCrosshairsSolid,
    faInfoCircle as faInfoCircleSolid,
    faSlash as faSlashSolid,
    faSquare as faSquareSolid,
    faPlusSquare as faPlusSquareSolid,
    faMinusSquare as faMinusSquareSolid,
    faPlayCircle as faPlayCircleSolid,
    faGlobe,
    faPenToSquare,
    faCheck as faCheckSolid,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";

export function parseFromString(str: string) {
    switch(str) {
        case 'dots':
            return FontAwesomeLayerIcons.COMMENT_DOTS;
        case 'info-circle':
            return FontAwesomeLayerIcons.INFO_CIRCLE;
        case 'line':
            return FontAwesomeLayerIcons.LINE;
        case 'square':
            return FontAwesomeLayerIcons.SQUARE;
        case 'plus-square':
            return FontAwesomeLayerIcons.PLUS_SQUARE;
        case 'minus-square':
            return FontAwesomeLayerIcons.MINUS_SQUARE;
        default:
            return FontAwesomeLayerIcons.LINE;
    }
}

export function getFontawesomeIcon(iconVal: FontAwesomeLayerIcons, solid: boolean = false) {
    switch(FontAwesomeLayerIcons[iconVal]) {
        case FontAwesomeLayerIcons[FontAwesomeLayerIcons.SQUARE]:
            if(solid) return faSquareSolid;
            return faSquare;
        case FontAwesomeLayerIcons[FontAwesomeLayerIcons.PLUS_SQUARE]:
            if(solid) return faPlusSquareSolid;
            return faPlusSquare;
        case FontAwesomeLayerIcons[FontAwesomeLayerIcons.MINUS_SQUARE]:
            if(solid) return faMinusSquareSolid;
            return faMinusSquare;
        case FontAwesomeLayerIcons[FontAwesomeLayerIcons.PLAY_CIRCLE]:
            if(solid) return faPlayCircleSolid;
            return faPlayCircle;
        case FontAwesomeLayerIcons[FontAwesomeLayerIcons.INFO_CIRCLE]:
            return faInfoCircleSolid;
        case FontAwesomeLayerIcons[FontAwesomeLayerIcons.CROSSHAIRS]:
            if(solid) return faMinusSquareSolid;
            return faCrosshairsSolid;
        case FontAwesomeLayerIcons[FontAwesomeLayerIcons.LINE]:
            if(solid) return faMinusSquareSolid;
            return faSlashSolid;
        case FontAwesomeLayerIcons[FontAwesomeLayerIcons.COMMENT_DOTS]:
            return faCommentDots;
        case FontAwesomeLayerIcons[FontAwesomeLayerIcons.GLOBE]:
            return faGlobe
        case FontAwesomeLayerIcons[FontAwesomeLayerIcons.PEN_TO_SQUARE]:
            return faPenToSquare
        case FontAwesomeLayerIcons[FontAwesomeLayerIcons.CHECKMARK]:
            if(solid) return faCheckSquare;
            return faCheckSolid;
    }
    return faSquare;
}