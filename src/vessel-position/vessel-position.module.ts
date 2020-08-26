import { Module, HttpModule, Logger } from '@nestjs/common';
import { VesselPositionService } from './vessel-position.service';
import { VesselPositionKystverketValidatorPipe } from './pipes/vessel-position-kystverket-validator.pipe';
import { VessselPositionMatrineTrafficValidatorPipe } from './pipes/vesssel-position-matrine-traffic-validator.pipe';

@Module({
  imports: [HttpModule],
  providers: [
    VesselPositionService,
    VesselPositionKystverketValidatorPipe,
    VessselPositionMatrineTrafficValidatorPipe,
    Logger,
  ],
  exports: [VesselPositionService],
})
export class VesselPositionModule {
  constructor(private vesselPositionService: VesselPositionService) {
    // this.vesselPositionService.getVesselPositions().subscribe(
    //   data => {},
    //   error => console.log('ERROR: ' + error),
    // );
  }
}
