export class InvalidVesselPositionError extends Error {
    constructor(message: string) {
        super('Invalid Vessel Position Error: ' + message)
    }
}