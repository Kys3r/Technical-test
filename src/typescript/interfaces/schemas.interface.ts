import { Types } from '../../database/config/mongoose.config'

export interface IUser extends Document {
	username: string
	email: string
	password: string
	projects?: Array<Types.ObjectId>
	permissions?: string
}

export interface IProjectManagement extends Document {
	name: string
	creator: Types.ObjectId
	startDate: Date
	endDate: Date
	contributors: Array<Types.ObjectId>
	resources: Array<Types.ObjectId>
	location: Location
	totalSteps: number
	progressStep: number
	createdDate: Date
	deletionFlag: boolean
}

export interface IResource extends Document {
	name: string
	availability: boolean
}
