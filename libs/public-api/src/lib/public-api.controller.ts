import { Controller } from '@nestjs/common';
import { PublicApiService } from './public-api.service';

@Controller('public-api')
export class PublicApiController {
  constructor(private publicApiService: PublicApiService) {}
}
