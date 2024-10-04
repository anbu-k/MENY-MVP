import { Layer, Map } from "@prisma/client"
import { Moment } from "moment"

export type MapCompareFilters = {
    beforeMap: Map,
    afterMap: Map,
    selectedLayers: Layer[],
    date: Moment
}