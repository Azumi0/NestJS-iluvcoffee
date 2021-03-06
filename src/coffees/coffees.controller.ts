import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  // Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

// @UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {
    console.log('CoffeesController instantiated');
  }

  // @UsePipes(new ValidationPipe())
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll(paginationQuery);
  }

  /*This works but makes the code express-frameworks depepndent, so we lose the nest abstraction layer.
  Try to avoid this, if possible. Use as a last resort.
  @Get('')
  findAll(@Res() response) {
    response.status(HttpStatus.OK).send('This action returns all coffees');
  }*/

  @Get('flavors')
  findAllFlavors() {
    return 'This action returns all flavors of coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Post('/deprecated')
  @HttpCode(HttpStatus.GONE)
  createDeprecated(@Body() body) {
    return body;
  }

  @Patch(':id/recommend')
  async recommend(@Param('id') id: string) {
    const coffee = await this.coffeesService.findOne(id);
    return this.coffeesService.recommendCoffee(coffee);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
