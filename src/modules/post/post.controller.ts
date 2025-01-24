import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { PostService } from 'src/modules/post/post.service'

@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	@HttpCode(200)
	async createPost(@Body() dto: { content: string; userId: string }) {
		const { content, userId } = dto
		return this.postService.createPost({
			content,
			userId: Number(userId)
		})
	}

	@Get()
	getPosts() {
		return this.postService.getPosts()
	}
}
