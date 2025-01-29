import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator'

@InputType()
export class CreateUserDto {
	@Field()
	@IsEmail({}, { message: 'Invalid email format' })
	email: string

	@Field()
	@IsString()
	@IsNotEmpty()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password: string

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	username?: string
}

@InputType()
export class UpdateUserDto {
	@Field({ nullable: true })
	@IsEmail({}, { message: 'Invalid email format' })
	@IsOptional()
	email?: string

	@Field({ nullable: true })
	@IsString()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	@IsOptional()
	password?: string

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	username?: string
}
