import { Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => String)
	async users() {
		// 2:16
		return this.userService.getAll()
	}
}
