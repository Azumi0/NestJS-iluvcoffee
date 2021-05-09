import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    /* ... do something ... */
    return ['buddy brew', 'nescafe'];
  }
}
