import { Schema } from '../config/mongoose.config'

export const ResourceSchema: Schema = new Schema({
	name: {
		type: String,
		required: 'A resource requires a name.'
	},
	availability: {
		type: Boolean,
		default: true
	}
})
