import { Schema, Types } from '../config/mongoose.config'

export const UserSchema: Schema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	projects: [
		{
			type: Types.ObjectId,
			ref: 'Project'
		}
	],
	permissions: {
		type: String,
		default: 'standard'
	}
})
