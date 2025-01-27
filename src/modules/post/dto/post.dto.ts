import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class CreatePostDto {
	@Field()
	@IsString()
	content: string
}

@InputType()
export class UpdatePostDto {
	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	content?: string
}
