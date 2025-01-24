import { Injectable } from '@nestjs/common'
import { Post, User } from '@prisma/client'
import { PostRepository } from './post.repository'

@Injectable()
export class PostService {
	constructor(private repository: PostRepository) {}

	async createPost(params: { content: Post[`content`]; userId: User[`id`] }) {
		const { content, userId } = params
		const post = await this.repository.createPost({
			data: {
				content,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
		return post
	}

	async getPosts() {
		const posts = await this.repository.getPosts({})
		return posts
	}
}
