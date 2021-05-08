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
  // Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
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
  create(@Body() body) {
    return this.coffeesService.create(body);
  }

  @Post('/deprecated')
  @HttpCode(HttpStatus.GONE)
  createDeprecated(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
