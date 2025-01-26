import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserModel } from './models'
import { CreateUserDto } from './dto'
import { HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}
	// 2:40

	@Query(() => UserModel)
	async getUser(@Args('id', { type: () => String }) id: string) {
		return this.userService.getUser(id)
	}

	@Query(() => [UserModel])
	async getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Mutation(() => UserModel)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	async createUser(@Args('dto') dto: CreateUserDto) {
		return this.userService.createUser(dto)
	}
}
