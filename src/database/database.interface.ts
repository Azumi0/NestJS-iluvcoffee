import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export interface DatabaseInterface {
  factory: (configService: ConfigService) => ConnectionOptions;
}
