import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserModel } from './models'
import { CreateUserDto, UpdateUserDto } from './dto'
import { HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessageResponse } from '@/responses'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}
	// 2:40

	@Query(() => UserModel, { nullable: true, name: 'user' })
	async getUserId(@Args('id') id: string) {
		return this.userService.getUserId(id)
	}

	@Query(() => UserModel, { nullable: true, name: 'profile' })
	async getProfile(@Args('id') id: string) {
		return this.userService.getProfile(id)
	}

	@Query(() => [UserModel], { name: 'users' })
	async getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Mutation(() => UserModel)
	@UsePipes(new ValidationPipe())
	async createUser(@Args('dto') dto: CreateUserDto) {
		return this.userService.createUser(dto)
	}

	@Mutation(() => UserModel)
	@UsePipes(new ValidationPipe())
	async updateUser(@Args('id') id: string, @Args('dto') dto: UpdateUserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@Mutation(() => MessageResponse)
	async deleteUser(@Args('id') id: string): Promise<MessageResponse> {
		return this.userService.deleteUser(id)
	}
}
