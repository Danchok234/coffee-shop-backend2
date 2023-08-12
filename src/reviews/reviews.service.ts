import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
@Injectable()
export class ReviewsService {
	constructor(private PrismaService: PrismaService) {}

	findReviewsById(id: number) {
		return this.PrismaService.product.findUnique({
			where: {
				id: id,
			},
			select: {
				reviews: {
					select: {
						rating: true,
						reviewText: true,
						productId:true,
						user: {
							select: {
								id:true,
								username: true,
								email:true
							}
						},
					}
				}
			}
		})
	}

	async createReview(
		userId: number,
		productId: number,
		rating: number,
		reviewText?: string
	){
		return this.PrismaService.review.create({
			data: {
				userId,
				reviewText,
				productId,
				rating
			},
		})
	}
}
