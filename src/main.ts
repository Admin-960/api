import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules'
import { ValidationPipe } from '@nestjs/common'
import { PrismaService } from './database/prisma.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	app.setGlobalPrefix('api')

	app.enableCors({
		origin: 'http://localhost:3000',
		credentials: true
	})

	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	await app.listen(process.env.PORT || 4200)
}
bootstrap()
