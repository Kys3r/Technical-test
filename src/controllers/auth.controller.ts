import { checkRegisterData, generateJwtToken, sanitizeRegisterBody, sanitizeLoginBody, checkLoginData } from '../lib/auth.lib'
import { Request, Response } from 'express'
import { UserModel } from '../database/models'
import { ILoginBody, IRegisterBody } from '../typescript/interfaces/auth.interface'
import bcrypt from 'bcrypt'
const salt = bcrypt.genSalt(10)

export const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, email, password, passwordConf }: IRegisterBody = req.body
		const user: IRegisterBody = sanitizeRegisterBody(username, email, password, passwordConf)

		if (!checkRegisterData(user)) {
			res.status(400).send({ error: 'Bad Request' })
			return
		}

		const hashedPassword = await bcrypt.hash(password, await salt)
		const userData = await UserModel.create({ username: username, email: email, password: hashedPassword })
		const token: string = generateJwtToken(userData.username, userData.email, userData.permissions, userData._id)

		res.status(201).send({ message: 'Registered successfully', token: token })
	} catch (error) {
		if (error.name === 'MongoServerError' && error.code === 11000)
			res.status(409).send({ error: `${Object.keys(error['keyValue'])[0]} already exist` })
		else res.status(500).send({ error: 'Internal error' })
	}
}

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password }: ILoginBody = req.body
		const user: ILoginBody = sanitizeLoginBody(username, password)

		if (!checkLoginData(user)) {
			res.status(400).send({ error: 'Bad Request' })
			return
		}

		const userData = await UserModel.find({ username: username })

		if (userData.length === 0 || !(await bcrypt.compare(password, userData[0].password))) {
			res.status(401).send({ error: 'Unauthorized' })
			return
		}

		const token: string = generateJwtToken(userData[0].username, userData[0].email, userData[0].permissions, userData[0]._id)

		res.status(200).send({ message: 'Login successfully', token: token, id: userData[0]._id })
	} catch (error) {
		res.status(500).send({ error: 'Internal error' })
	}
}
