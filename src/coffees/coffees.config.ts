import { registerAs } from '@nestjs/config';

interface CoffeesConfigurationInterface {
  foo: string;
}
export type CoffeesConfigInterface = () => CoffeesConfigurationInterface;
export default registerAs(
  'coffees',
  (): CoffeesConfigurationInterface => ({
    foo: 'bar',
  }),
);
