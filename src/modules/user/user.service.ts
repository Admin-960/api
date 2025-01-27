import { Injectable, NotFoundException } from '@nestjs/common'
import { UserModel } from './models'
import { UserRepository } from './user.repository'
import { hash } from 'argon2'
import { CreateUserDto, UpdateUserDto } from './dto'
import { omit } from 'lodash'

@Injectable()
export class UserService {
	constructor(private repository: UserRepository) {}

	async getUserId(id: string) {
		const doc = await this.repository.getById(id)
		return doc
	}

	async getProfile(id: string) {
		const doc = await this.getUserId(id)
		return {
			...omit(doc, ['password'])
		}
	}

	async getAllUsers() {
		const docs = await this.repository.findMany()
		return docs
	}

	async createUser(dto: CreateUserDto) {
		const doc = await this.repository.create({ ...dto, password: await hash(dto.password) })
		return doc
	}

	async updateProfile(id: string, { password, ...dto }: UpdateUserDto) {
		const user = await this.getUserId(id)
		const isSameUser = await this.repository.getByEmail(dto.email)

		if (isSameUser && String(id) !== String(isSameUser.id))
			throw new NotFoundException('Email busy')

		if (password) {
			const hashPassword = await hash(password)
			user.password = hashPassword
		}

		const updateData = {
			password: user.password,
			...dto
		}

		return this.repository.update(id, updateData)
	}
}
