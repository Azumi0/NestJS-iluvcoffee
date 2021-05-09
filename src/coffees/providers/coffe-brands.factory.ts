import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeBrandsFactory {
  create() {
    /* ... do something ... */
    return ['buddy brew', 'nescafe'];
  }
}
