export interface ICityInfo{
  name?: string,
  country?: string,
  lat: number,
  lon: number,
  population?: number,
  timezone?: string,
  status: string,
  error?: string
} 

export interface IPlaceBase{
    type: string,
    id: string,
    geometry: {
        type?: string,
        coordinates?: [
            number,
            number
        ]
    },
    properties: {
        xid: string,
        name: string,
        dist?: number,
        rate?: number,
        osm?: string,
        kinds: string
},
}

export interface IPlacesCollection{
  type: string,
  features: Array<IPlaceBase>
}
