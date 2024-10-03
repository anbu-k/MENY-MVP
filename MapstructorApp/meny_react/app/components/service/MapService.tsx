import api from './service';

export interface Map {
  id:                 Number;
  name:               String;
  longitude:          Number;
  latitude:           Number;
  infoId:             String;
  zoom:               Number;
  bearing:            Number;
  attributionControl: Boolean;
}

const MapService = {
  getMaps: async (): Promise<Map[] | null> => {
    try{
      const response = await api.get<Map[]>('/api/map');
      return response.data;
    }
    catch(error){
      console.log("Error: getmaps request", error);
      return null;
    }

  },

  getMapById: async (id: number): Promise<Map | null> => {
  try{
    const response = await api.get<Map>(`/api/map/${id}`);
    return response.data;
  }
  catch(error){
    console.log("Error: getmapbyId request", error);
    return null;
  }
  },

  createMap: async (Map: Omit<Map, 'id'>): Promise<Map | null> => {
  try{
    const response = await api.post<Map>('/api/map', Map);
    return response.data;
  }
  catch(error){
    console.log("Error: create map request", error);
    return null;
  }
  },

  updateMap: async (Map: Map): Promise<Map | null> => {
    try{
    const response = await api.put<Map>(`/api/map/${Map.id}`, Map);
    return response.data;
  }
  catch(error){
    console.log("Error: update map request", error);
    return null;
  }
  },

  deleteMap: async (id: number): Promise<void> => {
  try{
    await api.delete(`/api/map/${id}`);
  }
  catch(error){
    console.log("Error: delete request", error);
  }
  },
};

export default MapService;
