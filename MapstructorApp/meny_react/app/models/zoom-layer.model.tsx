
export interface ZoomLabel {
    title: string,
    center?: [long: number, lat: number],
    bounds?: [[long1: number, lat1: number], [long2: number, lat2: number]]
    minZoom?: number,
    zoom?: number,
    bearing?: number,
    zoomToBounds: boolean
}