import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { PrismaModule } from '@/database'
import { UserRepository } from './user.repository'

@Module({
	imports: [PrismaModule],
	providers: [UserService, UserResolver, UserRepository],
	exports: [UserService]
})
export class UserModule {}
