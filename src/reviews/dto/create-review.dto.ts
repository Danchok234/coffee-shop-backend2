import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateReviewDto {
	@IsNumber()
	productId: number

	@IsNumber()
	rating: number

	@IsString()
	@IsOptional()
	@MaxLength(200)
	reviewText: string
}