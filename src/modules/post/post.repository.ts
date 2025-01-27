import { Injectable } from '@nestjs/common'
import { Prisma, Post } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class PostRepository {
	constructor(private prisma: PrismaService) {}

	async getPosts(params: {
		skip?: number
		take?: number
		cursor?: Prisma.PostWhereUniqueInput
		where?: Prisma.PostWhereInput
		orderBy?: Prisma.PostOrderByWithRelationInput
	}): Promise<Post[]> {
		const { skip, take, cursor, where, orderBy } = dto
		return await this.prisma.post.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy
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

	async deletePost(params: { where: Prisma.PostWhereUniqueInput }): Promise<void> {
		return await this.prisma.post.delete({ where })
	}
}
