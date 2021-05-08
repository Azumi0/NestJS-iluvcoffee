import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param, Patch,
  Post,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('')
  findAll() {
    return 'This action returns all coffees';
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
    return `This action returns #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Post('/deprecated')
  @HttpCode(HttpStatus.GONE)
  createDeprecated(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
