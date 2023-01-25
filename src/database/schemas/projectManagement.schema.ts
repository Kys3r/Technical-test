import { Schema, Types } from '../config/mongoose.config'

export const ProjectManagementSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	creator: {
		type: Types.ObjectId,
		ref: 'User'
	},
	startDate: {
		type: Date
	},
	endDate: {
		type: Date
	},
	contributors: [
		{
			type: Types.ObjectId,
			ref: 'User'
		}
	],
	resources: [
		{
			type: Types.ObjectId,
			ref: 'Resource'
		}
	],
	location: {
		type: String,
		required: 'Please enter a location for this project.'
	},
	totalSteps: {
		type: Number,
		min: 1,
		max: 50
	},
	progressStep: {
		type: Number,
		default: 1
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	deletionFlag: {
		type: Boolean,
		default: false
	}
})
