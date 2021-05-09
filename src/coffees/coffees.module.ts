import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import {
  COFFEE_BRANDS,
  COFFEE_GRAINS,
  COFFEE_PRODUCERS,
} from '../coffees.constants';
import {
  ConfigService,
  DevelopmentConfigService,
  ProductionConfigService,
} from './providers/config.service';
import { CoffeBrandsFactory } from './providers/coffe-brands.factory';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: (brandsFactory: CoffeBrandsFactory) => brandsFactory.create(),
      inject: [CoffeBrandsFactory],
    },
    {
      provide: COFFEE_PRODUCERS,
      // Note "async" here, and Promise/Async event inside the Factory function
      // Could be a database connection / API call / etc
      // In our case we're just "mocking" this type of event with a Promise
      // eslint-disable-next-line
      useFactory: async (connection: Connection): Promise<string[]> => {
        // const coffeeBrands = await connection.query('SELECT * ...');
        // noinspection UnnecessaryLocalVariableJS,ES6RedundantAwait
        const coffeeBrands = await Promise.resolve(['Nestle', 'JackSepticEye']);
        return coffeeBrands;
      },
      inject: [Connection],
    },
    {
      provide: COFFEE_GRAINS,
      useValue: ['whole', 'ground'],
    },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
