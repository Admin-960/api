import { Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => String)
	async users() {
		// 2:40
		return this.userService.getAll()
	}

	@Query(() => [User])
	async users(): Promise<User[]> {
		const users = await userService.findMany()
		return users // Prisma вернет массив объектов User,  GraphQL преобразует их с помощью @ObjectType
	}
}
