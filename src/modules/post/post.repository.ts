import { Injectable } from '@nestjs/common'
import { Prisma, Post } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class PostRepository {
	constructor(private prisma: PrismaService) {}

	async createPost(params: { data: Prisma.PostCreateInput }): Promise<Post> {
		const { data } = params
		if (data.content.length > 80) {
			throw new Error(`Post too long`)
		}
		return this.prisma.post.create({ data })
	}

	async getPosts(params: {
		skip?: number
		take?: number
		cursor?: Prisma.PostWhereUniqueInput
		where?: Prisma.PostWhereInput
		orderBy?: Prisma.PostOrderByWithRelationInput
	}): Promise<Post[]> {
		const { skip, take, cursor, where, orderBy } = params
		return this.prisma.post.findMany({ skip, take, cursor, where, orderBy })
	}

	async updatePost(params: {
		where: Prisma.PostWhereUniqueInput
		data: Prisma.PostUpdateInput
	}): Promise<Post> {
		const { where, data } = params
		if (data.content && String(data.content).length > 80) {
			throw new Error(`Post too long`)
		}
		return this.prisma.post.update({ where, data })
	}

	async deletePost(params: { where: Prisma.PostWhereUniqueInput }): Promise<Post> {
		const { where } = params
		return this.prisma.post.delete({ where })
	}
}
