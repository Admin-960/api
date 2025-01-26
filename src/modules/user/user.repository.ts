import { CreateUserDto } from './dto'
import { Injectable } from '@nestjs/common'
import { UserModel } from './models'
import { PrismaService } from '@/database/prisma.service'

@Injectable()
export class UserRepository {
	constructor(private prisma: PrismaService) {}

	async getById(id: string): Promise<UserModel> {
		const user = this.prisma.user.findUnique({
			where: { id },
			include: {
				posts: true
			}
		})
		return user
	}

	async findMany(): Promise<UserModel[]> {
		const users = await this.prisma.user.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				posts: true
			}
		})
		return users
	}

	async create(dto: CreateUserDto): Promise<UserModel> {
		const createdUser = this.prisma.user.create({
			data: { email: dto.email, password: dto.password },
			include: {
				posts: true
			}
		})
		return createdUser
	}
}
