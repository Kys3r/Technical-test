require('dotenv').config()
import express from 'express'
import logger from 'morgan'
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { connect } from './database/config/mongoose.config.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		basePath: '/',
		info: {
			title: 'API Documentation',
			version: '1.0.0',
			description: "API documentation for Owen's tests"
		},
		host: 'localhost:3000'
	},
	apis: ['docs/api/**/*.swagger.yml']
}
const specs = swaggerJSDoc(options)

connect()

import { users } from './routes/users.route'
import { auth } from './routes/auth.route'

export const app = express()

app.set('port', process.env.PORT || 3000)

app.use(logger('dev'))
app.use(helmet())
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods: PUT, DELETE, PATCH, POST, GET, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb', parameterLimit: 10000 }))
app.use(bodyParser.json({ limit: '10mb' }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/users', users)
app.use('/auth', auth)

app.use(errorNotFoundHandler)
app.use(errorHandler)
