import { Test } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../../../database/prisma.service'
import { UserRepository } from '../user.repository'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

const users = [
	{
		id: 'cm6b8z79p0000uvcg1uz9px4n',
		createdAt: new Date(),
		updatedAt: new Date(),
		email: 'user1991@gmail.com',
		username: `user1991`,
		password: `gfeyyf83i`,
		description: 'My profile',
		avatarPath: '/upload/avatars/3284iru3i.png',
		role: 'USER',
		country: 'USA',
		rememberToken: '',
		isVerified: false,
		socialLink: 'https://fb.com/fh934fj093f',
		isRealTime: false,
		posts: []
	}
]

describe(`UserRepository`, () => {
	let userRepository: UserRepository
	let prismaService: DeepMockProxy<PrismaClient>

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [UserRepository, PrismaService]
		})
			.overrideProvider(PrismaService)
			.useValue(mockDeep<PrismaClient>())
			.compile()

		userRepository = moduleRef.get(UserRepository)
		prismaService = moduleRef.get(PrismaService)
	})

	describe(`createPost`, () => {
		it(`should create a new user`, async () => {
			// Arrange
			const mockedUserDto = {
				email: `user1991@gmail.com`,
				password: 'gfeyyf83i'
			}

			const mockedUser = {
				id: 'cm6b8z79p0000uvcg1uz9px4n',
				createdAt: new Date(),
				updatedAt: new Date(),
				email: 'user1991@gmail.com',
				username: `user1991`,
				password: `gfeyyf83i`,
				description: 'My profile',
				avatarPath: '/upload/avatars/3284iru3i.png',
				role: 'USER',
				country: 'USA',
				rememberToken: '',
				isVerified: false,
				socialLink: 'https://fb.com/fh934fj093f',
				isRealTime: false,
				posts: []
			}

			prismaService.user.create.mockResolvedValue(mockedUser)

			// Act
			const createUser = () =>
				userRepository.create({
					email: mockedUserDto.email,
					password: mockedUserDto.password
				})

			// Assert
			await expect(createUser()).resolves.toBe(mockedUser)
		})
	})

	describe(`getTweets`, () => {
		it(`should return array of users`, async () => {
			prismaService.user.findMany.mockResolvedValue(users)

			await expect(userRepository.findMany()).resolves.toBe(users)
		})
	})
})
