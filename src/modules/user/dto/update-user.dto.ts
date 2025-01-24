import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class CreateUserDto {
	@Field()
	@IsEmail()
	email: string

	@Field()
	@IsString()
	@IsNotEmpty()
	password: string
}

export type UpdateUserDto = Partial<CreateUserDto>
