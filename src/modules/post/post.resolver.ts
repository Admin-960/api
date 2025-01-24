import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PostModel } from '@/modules/post/models'
import { PostService } from '@/modules/post/post.service'

@Resolver()
export class PostResolver {
	constructor(private readonly postService: PostService) {}

	@Query(() => [PostModel])
	async getPosts() {
		return this.postService.getPosts()
	}

	@Mutation(() => PostModel)
	async createPost(
		@Args({ name: `content`, type: () => String }) content: string,
		@Args({ name: `userId`, type: () => String }) userId: string
	) {
		return this.postService.createPost({ content, userId })
	}
}
