import { MapItem } from "./map.model"

export type MapFiltersGroup = {
    id: number,
    name: string,
    label: string,
    maps: MapItem[]
}