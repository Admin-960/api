import { Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { Role, UserModel } from './models'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}
	// 2:40
	// 1:31

	@Query(() => UserModel, { name: 'profile' })
	// @Auth()
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.getBy(id)
	}

	@Query(() => [UserModel], { name: 'users' })
	// @Auth(Role.ADMIN)
	async users(): Promise<User[]> {
		const users = await this.userService.findMany()
		return users // Prisma вернет массив объектов User, GraphQL преобразует их с помощью @ObjectType
	}
}
