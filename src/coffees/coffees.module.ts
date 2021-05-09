import { Module, Scope } from '@nestjs/common';
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
  CustomConfigService,
  DevelopmentCustomConfigService,
  ProductionCustomConfigService,
} from './providers/customConfigService';
import { CoffeeBrandsFactory } from './providers/coffee-brands-factory.service';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './coffees.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create(),
      inject: [CoffeeBrandsFactory],
      scope: Scope.TRANSIENT, // once per consumer (classes are consumers, so if you use this factory in two modules it will spawn 2 instances of the factory)
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
      provide: CustomConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentCustomConfigService
          : ProductionCustomConfigService,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
