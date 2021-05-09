import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from '../coffees/coffees.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    // This is just an example of a dynamic module, you don't need to access the database in this way.
    DatabaseModule.register({
      factory: (configService) => ({
        type: 'postgres', // type of our database
        host: configService.get('DATABASE_HOST'), // database host
        port: parseInt(configService.get('DATABASE_PORT')), // database host
        username: configService.get('DATABASE_USER'), // username
        password: configService.get('DATABASE_PASSWORD'), // user password
        database: configService.get('DATABASE_NAME'), // name of our database,
      }),
    }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
