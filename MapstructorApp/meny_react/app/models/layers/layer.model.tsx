
export type SectionLayer = {
    id: string, // Possibly done need id, name and label, consider combining their usages.
    name: string,
    label: string,
    checked: boolean,
    iconColor: string,
}

export type SectionLayerItem = {
    id: number,
    htmlId: string,
    iconColor: string,
    label: string,
    iconType: string,
    isSolid: boolean,
}

export type SectionLayerGroup = {
    id: number,
    htmlId: string,
    label: string,
    items: SectionLayerItem[]
}