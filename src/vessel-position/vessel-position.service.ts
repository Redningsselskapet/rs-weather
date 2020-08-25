import { Injectable, HttpService } from '@nestjs/common';
import {
  switchMap,
  map,
  mergeMap,
  skipUntil,
  skipWhile,
  take,
} from 'rxjs/operators';
import { VesselPositionKystverketValidatorPipe } from './pipes/vessel-position-kystverket-validator.pipe';
import { Observable, merge } from 'rxjs';
import { VesselPosition } from './interfaces/vessel-position.interface';
import { VessselPositionMatrineTrafficValidatorPipe } from './pipes/vesssel-position-matrine-traffic-validator.pipe';

@Injectable()
export class VesselPositionService {
  constructor(
    private http: HttpService,
    private vesselPositionKystverketValidator: VesselPositionKystverketValidatorPipe,
    private vesselPositionMarineTrafficValidator: VessselPositionMatrineTrafficValidatorPipe,
  ) {}

  getVesselPositionsKystverket(): Observable<VesselPosition> {
    return this.http
      .get(process.env.POSITIONS_URL)
      .pipe(switchMap(response => response.data))
      .pipe(
        map(vesselPosition =>
          this.vesselPositionKystverketValidator.transform(vesselPosition),
        ),
      );
  }

  getVesselPositionsMarineTraffic(): Observable<VesselPosition> {
    return this.http
      .get(
        'https://services.marinetraffic.com/api/exportvessels/v:8/c03c8a1570c13a6f3497d189adc9294c96e5b5fc/timespan:10/protocol:jsono',
      )
      .pipe(switchMap(response => response.data))
      .pipe(
        map(position =>
          this.vesselPositionMarineTrafficValidator.transform(position),
        ),
      );
  }

  getVesselPositions(): Observable<VesselPosition> {
    return merge(
      // this.getVesselPositionsMarineTraffic(),
      this.getVesselPositionsKystverket(),
    );
  }
}
