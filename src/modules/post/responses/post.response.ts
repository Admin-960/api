import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class DeletePostResponse {
	@Field()
	message: string
}
