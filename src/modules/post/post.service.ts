import { Injectable, NotFoundException } from '@nestjs/common'
import { PostRepository } from './post.repository'
import { PostModel } from './models'
import { CreatePostDto, UpdatePostDto } from './dto'

@Injectable()
export class PostService {
	constructor(private repository: PostRepository) {}

	async getPosts() {
		const docs = await this.repository.getPosts()
		return docs
	}

	async getPostById(id: PostModel[`id`]): Promise<PostModel> {
		const doc = await this.repository.findUnique(id)
		if (!doc) {
			throw new NotFoundException(`Post with id ${id} not found`)
		}
		return doc
	}

	async createPost(userId: PostModel[`userId`], dto: CreatePostDto) {
		const { content } = dto
		const doc = await this.repository.createPost({
			data: {
				content,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
		return doc
	}

	async updatePost(id: PostModel[`id`], userId: PostModel[`userId`], dto: UpdatePostDto) {
		const { content } = dto
		const doc = await this.repository.updatePost({
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
		return doc
	}

	async deletePost(id: PostModel[`id`]) {
		const docExist = await this.repository.findUnique(id)
		if (!docExist) {
			throw new NotFoundException(`Post with id ${id} not found`)
		}

		await this.repository.delete({
			where: {
				id
			}
		})
		return { message: 'Post deleted' }
	}
}
