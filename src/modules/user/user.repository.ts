import { CreateUserDto, UpdateUserDto } from './dto'
import { Injectable } from '@nestjs/common'
import { Role, UserModel } from './models'
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

	async getByEmail(email: string): Promise<UserModel> {
		const user = await this.prisma.user.findUnique({
			where: { email },
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
		const defaultData = { ...dto, email: dto.email, password: dto.password, role: Role.USER }
		const createdUser = this.prisma.user.create({
			data: defaultData,
			include: {
				posts: true
			}
		})
		return createdUser
	}

	async update(id: string, data: Partial<UpdateUserDto>) {
		return await this.prisma.user.update({
			where: { id },
			data: {
				...data
			}
		})
	}

	async delete(id: string) {
		await this.prisma.post.delete({
			where: {
				id
			}
		})
	}
}
