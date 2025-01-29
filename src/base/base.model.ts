import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType()
export class BaseFields {
	@Field(() => ID)
	id: string

	@Field(() => GraphQLISODateTime)
	createdAt: Date

	@Field(() => GraphQLISODateTime)
	updatedAt: Date
}
