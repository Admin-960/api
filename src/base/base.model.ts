import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType()
export class BaseFields {
	@Field(() => ID)
	id: number

	@Field(() => GraphQLISODateTime)
	createdAt: Date

	@Field(() => GraphQLISODateTime)
	updatedAt: Date
}
