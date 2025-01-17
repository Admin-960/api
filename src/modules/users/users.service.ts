import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
	constructor() {}
	async getAll() {
		return [{ id: 1, name: 'user1' }]
	}
}
