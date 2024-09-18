/**
 * This array is a list of maps to be generated for the Castello Taxlors
 */
const castelloMaps = [
  {
    id: "clm2yu5fg022801phfh479c8x",  // unique identifier for the map
    name: "Castello Redrawn (Default)", // display name for the map
    checked: true,     // indicates that this map is selected by defualt
    infoId: "castello-redrawn-plan", // ID for the info button related to this map
    zoomFunction: "zoomtocenter('NA')", // function to be called when zooming to this map
  },
  {
    id: "clm9xh68b031301qx6k446vtt",
    name: "1660 Original Castello Plan",
    infoId: "original-castello-plan",
    zoomFunction: "zoomtocenter('NA')",
  },
  {
    id: "clm2yu70i025501p9fzblgnct",
    name: "Stokes Key to Castello Plan",
    infoId: "stokes-key-castello",
    zoomFunction: "zoomtocenter('NA')",
  },
  {
    id: "clm2yu8oz026k01qxacnq84jb",
    name: "Legend of New Amsterdam",
    infoId: "new-amsterdam-legend",
    zoomFunction: "zoomtocenter('NA')",
  },
];

// Map data array for Manahatta maps
const manahattaMapsData = [
  {
    id: "clm2yu8w6025m01qb8p2khqxd",
    name: "1609 | Manahatta",   // name and year of the map
    zoomFunction: "zoomtobounds('Manhattan')", // function to zoom to the map's bounds
    infoId: "manahatta-map", // info ID for additional details on this map
  },
  {
    id: "clm2yucmy022j01mahf7qggow",
    name: "1639 | Manatus Map",
    zoomFunction: "zoomtocenter('Manatus Map')", // zoom to the center of the map
    infoId: "manatus-map",
  },
  {
    id: "clm2yuef7026401qr35ikben6",
    name: "1638-83 Original Grants & Farms",
    zoomFunction: "zoomtocenter('Original Grants')",
    infoId: "original-grants-map",
  },
  {
    id: "clm2yuhe9023501nshfr78fna",
    name: "1640-64 | Dutch Grants",
    zoomFunction: "zoomtocenter('NA')",
    infoId: "dutch-grants-stokes",
  },
  {
    id: "clm2yugcw025n01qbapsc2nkc",
    name: "1730 | Plan of City of New York",
    zoomFunction: "zoomtocenter('NYC plan')",
    infoId: "nyc-map-plan",
  },
  {
    id: "clm2yuguw01zy01p7dulscxyb",
    name: "1766 | Ratzer Map",
    zoomFunction: "zoomtocenter('Ratzer Map')",
    infoId: "ratzer-map",
  },
];


// array containing map data for Long Island maps
const longIslandMapsData = [
  {
    id: "clm2yuk8t023601nsgs112fvn",
    name: "1600-64 | Indian Paths & Places",  // map showing Indian paths and places during the 1600s
    zoomFunction: "zoomtobounds('Brooklyn')", // zoom to Brooklyn bounds
    infoId: "indian-paths-places",
  },
  {
    id: "clm2yukk3026301qibumt9t0a",
    name: "1600-1700s | Indian Tribes L.I.",
    zoomFunction: "zoomtobounds('LongIsland')",
    infoId: "indians-long-island",
  },
  {
    id: "clrzcx4vf01at01o86a0r79qi",
    name: "1640-1700 | L.I. Families",
    zoomFunction: "zoomtobounds('LongIsland')",
    infoId: "long-island-families",
  },
  {
    id: "clrzd1mx601ex01pbhuxp0rfe",
    name: "1706 | Long Island",
    zoomFunction: "zoomtobounds('LongIsland')",
    infoId: "long-island-1706",
  },
  {
    id: "clm2yukk901zz01p7953m4i53",
    name: "1734 | Long Island",
    zoomFunction: "zoomtocenter('Long Island')",
    infoId: "long-island-1734",
  },
  {
    id: "clrzd8axh01ay01o890wh6fvt",
    name: "1777 | Long Island & CT",
    zoomFunction: "zoomtocenter('Long Island')",
    infoId: "long-island-1777",
  },
  {
    id: "clrzd4yxc01e901qq5k85efld",
    name: "1842 | Long Island",
    zoomFunction: "zoomtocenter('Long Island')",
    infoId: "long-island-1842",
  },
  {
    id: "clm2yumma022k01ma52i8c5b5",
    name: "1844 | NY Bay and Harbor",
    zoomFunction: "zoomtocenter('NY Bay')",
    infoId: "ny-bay-and-harbor",
  },
  {
    id: "clm2yunpm026501qrejxb4k0r",
    name: "1873 | Gravesend Map",
    zoomFunction: "zoomtocenter('Gravesend Map')",
    infoId: "gravesend-map",
  },
  {
    id: "clm2yupsh026401qi2lpwhhx9",
    name: "1873 | Long Island",
    zoomFunction: "zoomtocenter('Long Island 1873')",
    infoId: "beers-long-island-map",
  },
];

// array containing map data for new Netherland maps
const newNetherlandMapsData = [
  {
    id: "clm2yuqr1022l01ma0s5z4m59",
    name: "1651 | Belgii Novi",
    zoomFunction: "zoomtocenter('Belgii Novi')",
    infoId: "novi-belgii-map",
  },
];

// array containing map data for New England maps
const newEnglandMapsData = [
  {
    id: "clm2yus81025601p99sd68y0v",
    name: "1670 | New England",
    zoomFunction: "zoomtocenter('New England')",
    infoId: "new-england-1670",
  },
];
