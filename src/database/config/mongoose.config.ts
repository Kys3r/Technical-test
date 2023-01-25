import mongoose, { Schema, Types, model, Error } from 'mongoose'

export const connect = async () => {
	try {
		mongoose.set('strictQuery', true)
		await mongoose.connect(`${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`)
		console.log(`MongoDB is now connected to database: '${process.env.DATABASE_NAME}'`)
	} catch (error) {
		console.error(`Error connecting to database: '${process.env.DATABASE_NAME}'`, error)
		process.exit()
	}
}

export { mongoose, Schema, Types, model, Error }
