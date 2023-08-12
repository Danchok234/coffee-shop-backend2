import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'

type Body = {
	productId: number
	rating: number,
	reviewText?:string
}

@Controller('review')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@Get(':id')
	findReviewsById(@Param('id') id: string) {
		return this.reviewsService.findReviewsById(+id)
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('create')
	createReview(
		@Req() req: Request,
		@Body() createReviewDto:CreateReviewDto
	) {
		const userId = req.user['sub']
		return this.reviewsService.createReview(
			userId,
			createReviewDto.productId,
			createReviewDto.rating,
			createReviewDto.reviewText
		)
	}
}
