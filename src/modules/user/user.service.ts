import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return `[{ id: 1, name: 'user1' }]`
	}

	async findMany() {
		return await this.prisma.user.findMany()
	}
}
