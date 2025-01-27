import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PostModel } from '@/modules/post/models'
import { PostService } from '@/modules/post/post.service'
import { CreatePostDto, UpdatePostDto } from './dto'

@Resolver()
export class PostResolver {
	constructor(private readonly postService: PostService) {}

	@Query(() => [PostModel])
	async getPosts(): Promise<PostModel[]> {
		return this.postService.getPosts()
	}

	@Mutation(() => PostModel)
	@UsePipes(new ValidationPipe())
	async createPost(@Args('dto') dto: CreatePostDto) {
		return this.postService.createPost(dto)
	}

	@Mutation(() => PostModel)
	@UsePipes(new ValidationPipe())
	async updatePost(@Args('dto') dto: UpdatePostDto) {
		return this.postService.createPost(dto)
	}

	@Mutation(() => PostModel)
	@UsePipes(new ValidationPipe())
	async deletePost(@Args('id', { type: () => String }) id: string): Promise<boolean> {
		return this.postService.deletePost(id)
	}
}
