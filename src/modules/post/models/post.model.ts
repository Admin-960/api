import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'
import { Post as PostDB } from '@prisma/client'

@ObjectType()
export class PostModel {
	@Field(() => Int)
	id: PostDB[`id`]

	@Field(() => GraphQLISODateTime)
	createdAt: PostDB[`createdAt`]

	@Field(() => GraphQLISODateTime)
	updatedAt: PostDB[`updatedAt`]

	@Field(() => String)
	content: PostDB[`content`]

	@Field(() => Int)
	userId: PostDB[`userId`]
}
