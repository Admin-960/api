import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PostModel } from '@/modules/post/models'
import { PostService } from '@/modules/post/post.service'
import { CreatePostDto, UpdatePostDto } from './dto'
import { UsePipes, ValidationPipe } from '@nestjs/common'
import { DeletePostResponse } from './responses'

@Resolver()
export class PostResolver {
	constructor(private readonly postService: PostService) {}

	@Query(() => [PostModel])
	async getPosts(): Promise<PostModel[]> {
		return this.postService.getPosts()
	}

	@Query(() => PostModel, { nullable: true })
	async getPostById(@Args('id') id: string): Promise<PostModel> {
		return this.postService.getPostById(id)
	}

	@Mutation(() => PostModel)
	@UsePipes(new ValidationPipe())
	async createPost(@Args('userId') userId: string, @Args('dto') dto: CreatePostDto) {
		return this.postService.createPost(userId, dto)
	}

	@Mutation(() => PostModel)
	@UsePipes(new ValidationPipe())
	async updatePost(
		@Args('id') id: string,
		@Args('userId') userId: string,
		@Args('dto') dto: UpdatePostDto
	) {
		return this.postService.updatePost(id, userId, dto)
	}

	@Mutation(() => DeletePostResponse)
	async deletePost(@Args('id') id: string): Promise<DeletePostResponse> {
		return this.postService.deletePost(id)
	}
}
