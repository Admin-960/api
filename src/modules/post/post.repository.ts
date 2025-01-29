import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { PostModel } from './models'
import { CreatePostDto, UpdatePostDto } from './dto'

@Injectable()
export class PostRepository {
	constructor(private prisma: PrismaService) {}

	async getPosts(): Promise<PostModel[]> {
		return await this.prisma.post.findMany({
			orderBy: { createdAt: 'desc' }
		})
	}

	async findUnique(id: string): Promise<PostModel> {
		return this.prisma.post.findUnique({
			where: { id }
		})
	}

	async createPost(userId: string, dto: CreatePostDto): Promise<PostModel> {
		const { content } = dto
		if (content.length > 80) {
			throw new NotFoundException(`Post too long`)
		}
		return await this.prisma.post.create({
			data: {
				content,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async updatePost(id: string, userId: string, dto: UpdatePostDto): Promise<PostModel> {
		const { content } = dto
		if (content && String(content).length > 80) {
			throw new NotFoundException(`Post too long`)
		}
		return await this.prisma.post.update({
			where: {
				id
			},
			data: {
				content,
				user: {
					connect: {
						id: userId
					}
				}
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
