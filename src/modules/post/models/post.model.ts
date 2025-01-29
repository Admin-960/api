import { BaseFields } from '@/base'
import { Field, ObjectType } from '@nestjs/graphql'
import { Post as PostDB } from '@prisma/client'

@ObjectType()
export class PostModel extends BaseFields {
	@Field(() => String)
	content: PostDB[`content`]

	@Field(() => String)
	userId: PostDB[`userId`]
}
