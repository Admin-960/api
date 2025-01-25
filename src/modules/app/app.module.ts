import { Module } from '@nestjs/common'
import { UserModule } from '../user'

import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AuthModule } from '../auth'
import { PrismaModule } from '@/database'
import { PostModule } from '../post'

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			debug: true,
			playground: true,
			autoSchemaFile: 'scheme.gql'
		}),
		AuthModule,
		UserModule,
		PostModule,
		PrismaModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
