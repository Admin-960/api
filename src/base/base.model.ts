import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class BaseFields {
	@Field(type => ID)
	id: number

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}
