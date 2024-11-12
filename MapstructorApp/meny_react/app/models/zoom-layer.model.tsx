
export interface ZoomLabel {
    title: string,
    coordinates: [long: number, lat: number],
    minZoom?: number,
    zoom: number,
    bearing: number
}