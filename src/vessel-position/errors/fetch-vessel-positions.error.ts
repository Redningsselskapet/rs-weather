export class FetchVesselPositionsError extends Error {
    constructor(message: string) {
        super(FetchVesselPositionsError.name + ':' + message)
    }
}