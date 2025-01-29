import { Test } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../../../database/prisma.service'
import { PostRepository } from '../post.repository'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

const posts = [
	{
		id: 'ke2p8z79p0000uvcg1uz9tao2',
		createdAt: new Date(),
		updatedAt: new Date(),
		content: `Hello there`,
		userId: 'cm6b8z79p0000uvcg1uz9px4n'
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
			const mockedPostDto = {
				content: `Hello there`,
				userId: 'cm6b8z79p0000uvcg1uz9px4n'
			}

			const mockedPost = {
				id: 'ke2p8z79p0000uvcg1uz9tao2',
				createdAt: new Date(),
				updatedAt: new Date(),
				content: `Hello there`,
				userId: 'cm6b8z79p0000uvcg1uz9px4n'
			}

			prismaService.post.create.mockResolvedValue(mockedPost)

			// Act
			const createPost = () =>
				postRepository.createPost(mockedPostDto.userId, { content: mockedPostDto.content })

			// Assert
			await expect(createPost()).resolves.toBe(mockedPost)
		})

		it(`> 280 character posts should throw an error`, async () => {
			const mockedPostDto = {
				content: `This is a super long post over 80 characters This is a super long post over 80 characters`,
				userId: 'cm6b8z79p0000uvcg1uz9px4n'
			}

			const createPost = () =>
				postRepository.createPost(mockedPostDto.userId, { content: mockedPostDto.content })

			expect(createPost()).rejects.toBeInstanceOf(Error)
		})
	})

	describe(`getTweets`, () => {
		it(`should return array of posts`, async () => {
			prismaService.post.findMany.mockResolvedValue(posts)

			await expect(postRepository.getPosts()).resolves.toBe(posts)
		})
	})
})
