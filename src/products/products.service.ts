import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export type SortType = 'newest' | 'oldest' | 'high-to-low' | 'low-to-high';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // async findBySearchTerm(searchTerm?: string) {
  //   return this.prisma.product.findMany(
  //     searchTerm
  //       ? {
  //           where: {
  //             OR: [
  //               {
  //                 name: {
  //                   contains: searchTerm,
  //                 },
  //               },
  //               {
  //                 description: {
  //                   contains: searchTerm,
  //                 },
  //               },
  //             ],
  //           },
  //         }
  //       : undefined,
  //   );
  // }

  async findAll(sortType?: SortType, searchTerm?: string) {
    const sortCategory =
      sortType === 'newest' || sortType === 'oldest' ? 'createdAt' : 'price';

    const sortVariation =
      sortType === 'newest' || sortType === 'low-to-high' ? 'desc' : 'asc';
    
    return this.prisma.product.findMany(
      searchTerm
        ? {
            // @ts-ignore
            where: {
              OR: [
                {
                  slug: {
                    contains:
                      searchTerm.toLowerCase() ||
                      searchTerm ||
                      searchTerm.toUpperCase(),
                  },
                },
                {
                  description: {
                    contains:
                      searchTerm.toLowerCase() ||
                      searchTerm ||
                      searchTerm.toUpperCase(),
                  },
                },
              ],
            },
            orderBy: {
              [sortCategory]: sortVariation,
            },
          }
        : {
            orderBy: {
              [sortCategory]: sortVariation,
            },
          },
    );
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug: slug,
      },
      include: {
        reviews: true,
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    else return product;
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        reviews: true,
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    else return product;
  }

  async findRelatives(id: number) {
    return this.prisma.product.findMany({
      where: {
        id: {
          not: id,
        },
      },
    });
  }
}
