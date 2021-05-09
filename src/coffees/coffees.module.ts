import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS, COFFEE_GRAINS } from '../coffees.constants';
import {
  ConfigService,
  DevelopmentConfigService,
  ProductionConfigService,
} from './providers/config.service';
import { CoffeBrandsFactory } from './providers/coffe-brands.factory';

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
