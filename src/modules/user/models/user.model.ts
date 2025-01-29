import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql'
import { User as UserDB } from '@prisma/client'
import { PostModel } from '@/modules/post/models'
import { BaseFields } from '@/base'

@ObjectType()
export class UserModel extends BaseFields {
	@Field(() => String)
	email: UserDB[`email`]

	@Field(() => String)
	password: UserDB[`password`]

	@Field(() => String, { nullable: true })
	username?: UserDB[`username`]

	@Field(() => String, { nullable: true })
	description?: UserDB[`description`]

	@Field(() => String, { nullable: true })
	avatarPath?: UserDB[`avatarPath`]

	@Field(() => String)
	role: UserDB[`role`]

	@Field(() => String, { nullable: true })
	country?: UserDB[`country`]

	@Field(() => String, { nullable: true })
	rememberToken?: UserDB[`rememberToken`]

	@Field(() => Boolean)
	isVerified: UserDB[`isVerified`]

	@Field(() => String, { nullable: true })
	socialLink?: UserDB[`socialLink`]

	@Field(() => Boolean)
	isRealTime: UserDB[`isRealTime`]

	@Field(() => [PostModel])
	posts: PostModel[]
}
