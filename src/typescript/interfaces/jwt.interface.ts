import { Types } from '../../database/config/mongoose.config'
export interface PayloadJwt {
	username: string
	email: string
	permissions: string
	id: Types.ObjectId
}
