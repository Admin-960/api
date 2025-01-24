import { Module } from '@nestjs/common'
import { PrismaModule } from '@/database'
import { PostRepository } from './post.repository'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'

@Module({
	imports: [PrismaModule],
	providers: [PostRepository, PostService, PostResolver],
	exports: [PostService]
})
export class PostModule {}
