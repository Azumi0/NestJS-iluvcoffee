import { DynamicModule, Module } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseInterface } from './database.interface';

// This is just an example of a dynamic module, you don't need to access the database in this way.
@Module({})
export class DatabaseModule {
  static register(options: DatabaseInterface): DynamicModule {
    return {
      imports: [ConfigModule],
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION', // 👈
          useFactory: (configService: ConfigService) => {
            const preparedOptions = options.factory(configService);
            return createConnection(preparedOptions);
          },
          inject: [ConfigService],
        },
      ],
    };
  }
}
