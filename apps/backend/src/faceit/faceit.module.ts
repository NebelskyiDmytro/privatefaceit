import { Module } from '@nestjs/common';
import { FaceitService } from './faceit.service';

@Module({
  providers: [FaceitService],
  exports: [FaceitService],
})
export class FaceitModule {}
