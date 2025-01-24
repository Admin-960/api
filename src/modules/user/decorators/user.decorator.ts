import { ExecutionContext, createParamDecorator } from '@nestjs/common'

type TypeData = keyof IRequestUser

interface IRequestUser {
	id: string
	name: string
	email: string
	password: string
	verificationToken: string | null
	createdAt: Date
	updatedAt: Date
}

export const CurrentUser = createParamDecorator((data: TypeData, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	const user = request?.user as IRequestUser

	return data ? user?.[data] : user
})
