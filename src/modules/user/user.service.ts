import { Injectable } from '@nestjs/common'
import { UserModel } from './models'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
	constructor(private repository: UserRepository) {}

	async getUser(id: string) {
		const user = await this.repository.getById(id)
		return user
	}

	async getUsers() {
		const users = await this.repository.findMany()
		return users
	}

	async createUser(dto: { email: UserModel[`email`]; password: UserModel[`password`] }) {
		const user = await this.repository.create(dto)
		return user
	}
}
