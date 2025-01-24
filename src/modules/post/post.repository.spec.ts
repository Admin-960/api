import { Test } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { PostRepository } from './post.repository'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

const posts = [
	{
		id: 1,
		createdAt: new Date(),
		updatedAt: new Date(),
		content: `Hello there`,
		userId: 1234
	}
]

describe(`PostRepository`, () => {
	let postRepository: PostRepository
	let prismaService: DeepMockProxy<PrismaClient>

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [PostRepository, PrismaService]
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaClient>())
			.compile()

		postRepository = moduleRef.get(PostRepository)
		prismaService = moduleRef.get(PrismaService)
	})

	describe(`createPost`, () => {
		it(`should create a new post`, async () => {
			// Arrange
			const mockedPost = {
				id: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
				content: `Hello there`,
				userId: 1234
			}
			prismaService.post.create.mockResolvedValue(mockedPost)

			// Act
			const createPost = () =>
				postRepository.createPost({
					data: {
						content: mockedPost.content,
						user: {
							connect: {
								id: mockedPost.userId
							}
						}
					}
				})

			// Assert
			await expect(createPost()).resolves.toBe(mockedPost)
		})

		it(`> 280 character posts should throw an error`, async () => {
			const payload = {
				content: `This is a super long post over 80 characters This is a super long post over 80 characters`,
				userId: 1234
			}

			const createPost = () =>
				postRepository.createPost({
					data: {
						content: payload.content,
						user: {
							connect: {
								id: payload.userId
							}
						}
					}
				})

			expect(createPost()).rejects.toBeInstanceOf(Error)
		})
	})

	describe(`getTweets`, () => {
		it(`should return array of posts`, async () => {
			prismaService.post.findMany.mockResolvedValue(posts)

			await expect(postRepository.getPosts({})).resolves.toBe(posts)
		})
	})
})
