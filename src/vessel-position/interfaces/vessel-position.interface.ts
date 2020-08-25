import { VesselDataProvider } from "../enums/vessel-data-provider.enum"

export interface VesselPosition {
    mmsi: string
    lat: number
    lng: number
    timeStamp: string
    provider: VesselDataProvider
}

