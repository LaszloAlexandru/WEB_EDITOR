import { Module } from '@nestjs/common';
import { PublicApiService } from './public-api.service';
import { PublicApiController } from './public-api.controller';

@Module({
  controllers: [PublicApiController],
  providers: [PublicApiService],
  exports: [PublicApiService]
})
export class PublicApiModule {}
