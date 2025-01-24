import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma.module'
import { PostRepository } from './post.repository'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { PostResolver } from './post.resolver'

@Module({
	controllers: [PostController],
	imports: [PrismaModule],
	providers: [PostRepository, PostService, PostResolver],
	exports: [PostService]
})
export class PostModule {}
