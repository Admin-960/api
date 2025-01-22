import { ObjectType, Field, Int, ID, Boolean } from '@nestjs/graphql'
import { Role } from './role.enum'

@ObjectType()
export class User {
	@Field(type => ID)
	id: number

	@Field()
	email: string

	@Field()
	password: string

	@Field({ nullable: true })
	username: string | null

	@Field({ nullable: true })
	description: string | null

	@Field({ nullable: true })
	avatarPath: string | null

	@Field(type => Role)
	role: Role

	@Field({ nullable: true })
	country: string | null

	@Field({ nullable: true })
	rememberToken: string | null

	@Field(type => Boolean)
	isVerified: boolean

	@Field({ nullable: true })
	socialLink: string | null

	@Field(type => Boolean)
	isRealTime: boolean

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}
