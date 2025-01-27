import { Injectable } from '@nestjs/common'
import { Prisma, Post } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { PostModel } from './models'

@Injectable()
export class PostRepository {
	constructor(private prisma: PrismaService) {}

	async getPosts(): Promise<Post[]> {
		return await this.prisma.post.findMany({
			orderBy: { createdAt: 'desc' }
		})
	}

	async findUnique(id: string): Promise<PostModel> {
		return this.prisma.post.findUnique({
			where: { id }
		})
	}

	async createPost(dto: { data: Prisma.PostCreateInput }): Promise<Post> {
		const { data } = dto
		if (data.content.length > 80) {
			throw new Error(`Post too long`)
		}
		return await this.prisma.post.create({ data })
	}

	async updatePost(dto: {
		where: Prisma.PostWhereUniqueInput
		data: Prisma.PostUpdateInput
	}): Promise<Post> {
		const { where, data } = dto
		if (data.content && String(data.content).length > 80) {
			throw new Error(`Post too long`)
		}
		return await this.prisma.post.update({ where, data })
	}

	async delete(params: { where: Prisma.PostWhereUniqueInput }) {
		const { where } = params
		await this.prisma.post.delete({ where })
	}
}
