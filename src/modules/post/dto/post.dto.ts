import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsOptional } from 'class-validator'

@InputType()
export class CreatePostDto {
	@Field()
	@IsOptional()
	@IsString()
	id: string

	@Field()
	@IsString()
	content: string

	@Field()
	@IsString()
	userId: string
}

export type UpdatePostDto = Partial<CreatePostDto>
