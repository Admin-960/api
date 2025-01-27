import { Injectable } from '@nestjs/common'
import { Post, User } from '@prisma/client'
import { PostRepository } from './post.repository'

@Injectable()
export class PostService {
  constructor(private repository: PostRepository) {}
  
  async getPosts() {
    const docs = await this.repository.getPosts({
      orderBy: { createdAt: 'desc' }
    })
    return docs
  }
  
  async createPost(dto: { content: PostModel[`content`]; userId: PostModel[`userId`] }) {
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
  
  async updatePost(dto: {
    id: PostModel[`id`]
    content: PostModel[`content`]
    userId: PostModel[`userId`]
  }) {
    const doc = await this.repository.createPost({
      where: {
        id
      }
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
  
  async deletePost(id: string) {
    const doc = await this.repository.delete({ 
      where: {
        id
      }
    })
    return doc
  }
}
