import { Product } from '@prisma/client';

export interface IProductPart extends Pick<Product, 'name' | 'images'> {}

export const products: IProductPart[] = [
  {
    name: 'Midnight Mocha Frappuccino',
    images: [
      '/uploads/images/Mocha Cookie Crumble Frappuccino.png',
      '/uploads/images/Caramel Frappuccino Blended Beverage.png',
      '/uploads/images/Pistachio Frappuccino Blended Beverage.png',
    ],
  },
  {
    name: 'Oleato Iced Shaken Espresso',
    images: [
      '/uploads/images/Iced Chocolate Almondmilk Shaken Espresso.png',
      '/uploads/images/Oleat Iced Shaken Espresso with Oatmilk and Toffeenut.png',
    ],
  },
  {
    name: 'Hot Chocolate',
    images: [
      '/uploads/images/Hot Chocolate.png',
      '/uploads/images/White Hot Chocolate.png',
    ],
  },
  {
    name: 'Chai Tea',
    images: [
      '/uploads/images/Chai Tea Latte.png',
      '/uploads/images/Chai Tea.png',
    ],
  },
];
