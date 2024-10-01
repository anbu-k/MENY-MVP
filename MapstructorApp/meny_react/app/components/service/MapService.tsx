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
  getMaps: async (): Promise<Map[]> => {
    const response = await api.get<Map[]>('/api/map');
    return response.data;
  },

  getMapById: async (id: number): Promise<Map> => {
    const response = await api.get<Map>(`/api/map/${id}`);
    return response.data;
  },

  createMap: async (Map: Omit<Map, 'id'>): Promise<Map> => {
    const response = await api.post<Map>('/api/map', Map);
    return response.data;
  },

  updateMap: async (Map: Map): Promise<Map> => {
    const response = await api.put<Map>(`/api/map/${Map.id}`, Map);
    return response.data;
  },

  deleteMap: async (id: number): Promise<void> => {
    await api.delete(`/api/map/${id}`);
  },
};

export default MapService;
