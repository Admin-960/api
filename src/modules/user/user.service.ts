import { Injectable } from '@nestjs/common'
import { UserModel } from './models'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
	constructor(private repository: UserRepository) {}

	async getUser(id: string) {
		const doc = await this.repository.getById(id)
		return doc
	}

	async getAllUsers() {
		const docs = await this.repository.findMany()
		return docs
	}

	async createUser(dto: { email: UserModel[`email`]; password: UserModel[`password`] }) {
		const doc = await this.repository.create(dto)
		return doc
	}

	// async createUser(dto: { email: UserModel[`email`]; password: UserModel[`password`] }) {
	// 	const doc = await this.repository.create({
	// 		data: {
	// 			email,
	//      password
	// 		},
	// 		include: {
	// 			posts: true
	//    }
	// 	})
	// 	return doc
	// }
}
